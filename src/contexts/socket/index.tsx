/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import socketClient from 'socket.io-client';

import { useAuth } from '../auth';
import { authStorageHelper } from '../auth/utils';

interface SocketContextData {
  socket: SocketIOClient.Socket;
  connectionStarted: boolean;
  connect: () => boolean;
  disconnect: () => void;

  on: (event: string, fn: Function) => SocketIOClient.Emitter;
  off: (event: string, fn?: Function) => SocketIOClient.Emitter;
}

const endPoint = 'http://localhost:3333';

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

export const SocketProvider: React.FC = ({ children }) => {
  const authContext = useAuth();
  const connectionStarted = useRef(false);

  const [socket, setSocket] = useState<SocketIOClient.Socket>();

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
    console.log('connected');

    return true;
  }, []);

  const disconnect = useCallback(() => {
    if (!connectionStarted.current) {
      return;
    }

    socket.disconnect();
    connectionStarted.current = false;
  }, [socket]);

  const on = useCallback(
    (event: string, fn: Function) => {
      if (!connectionStarted.current || !socket) {
        return undefined;
      }

      return socket.on(event, fn);
    },
    [socket]
  );

  const off = useCallback(
    (event: string, fn?: Function) => {
      if (!socket) {
        return undefined;
      }

      return socket.off(event, fn);
    },
    [socket]
  );

  const handleSignOut = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const contextValue = useMemo<SocketContextData>(() => {
    return {
      socket,
      connectionStarted: connectionStarted.current,
      on,
      off,
      connect,
      disconnect,
    };
  }, [connect, disconnect, off, on, socket]);

  useEffect(() => {
    authContext.addSignOutListener(handleSignOut);

    return () => {
      authContext.removeSignOutListener(handleSignOut);
    };
  }, [authContext, handleSignOut]);

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export function useSocket() {
  const context = useContext(SocketContext);

  return context;
}
