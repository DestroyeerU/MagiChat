import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import socketClient from 'socket.io-client';

import { authStorageHelper } from '../auth/utils';

interface SocketContextData {
  socket: SocketIOClient.Socket;
  connectionStarted: boolean;
  connect: () => boolean;
  disconnect: () => void;
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

  const disconnect = useCallback(() => {
    socket.disconnect();
    connectionStarted.current = false;
  }, [socket]);

  const contextValue = useMemo<SocketContextData>(() => {
    return {
      socket,
      connectionStarted: connectionStarted.current,
      connect,
      disconnect,
    };
  }, [connect, disconnect, socket]);

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export function useSocket() {
  const context = useContext(SocketContext);

  return context;
}
