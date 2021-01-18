import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import socketClient from 'socket.io-client';

import { authStorageHelper } from '../auth/utils';

interface SocketContextData {
  socket: SocketIOClient.Socket;
  connectionStarted: boolean;
  connect: () => boolean;
}

const endPoint = 'http://localhost:3333';

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const connectionStarted = useRef(false);

  const connect = useCallback(() => {
    if (!process.browser) {
      return false;
    }

    if (connectionStarted.current) {
      return true;
    }

    const { token } = authStorageHelper.loadUserAndToken();
    // const query = `token=Bearer ${token}a`;
    const query = `token=Bearer ${token}`;

    const clientSocket = socketClient(endPoint, {
      transports: ['websocket'],
      query,
    });

    setSocket(clientSocket);
    connectionStarted.current = true;

    return true;
  }, []);

  // const socket = useMemo(() => {
  //   if (!process.browser) {
  //     return undefined;
  //   }

  //   console.log('vai');

  //   const { token } = authStorageHelper.loadUserAndToken();
  //   // const query = `token=Bearer ${token}a`;
  //   const query = `token=Bearer ${token}`;

  //   const clientSocket = socketClient(endPoint, {
  //     transports: ['websocket'],
  //     query,
  //   });

  //   return clientSocket;
  // }, []);

  // const checkConnection = useCallback(async () => {
  //   if (!socket?.connected) {
  //     await new Promise((resolve) => setTimeout(resolve, 200));

  //     if (!socket?.connected) {
  //       return false;
  //     }
  //   }

  //   if (!connectionStarted.current) {
  //     connectionStarted.current = true;
  //   }

  //   return true;
  // }, [socket?.connected]);

  const contextValue = useMemo<SocketContextData>(() => {
    return {
      socket,
      connectionStarted: connectionStarted.current,
      connect,
    };
  }, [connect, socket]);

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export function useSocket() {
  const context = useContext(SocketContext);

  return context;
}
