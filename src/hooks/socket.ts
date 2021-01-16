import { useCallback, useMemo, useRef } from 'react';

import socketClient from 'socket.io-client';
import { authStorageHelper } from 'src/contexts/auth/utils';

const endPoint = 'http://localhost:3333';

// const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export function useSocket() {
  const connectionStarted = useRef(false);

  const socket = useMemo(() => {
    if (!process.browser) {
      return undefined;
    }

    const { token } = authStorageHelper.loadUserAndToken();
    // const query = `token=Bearer ${token}a`;
    const query = `token=Bearer ${token}`;

    const clientSocket = socketClient(endPoint, {
      transports: ['websocket'],
      query,
    });

    return clientSocket;
  }, []);

  const startConnection = useCallback(async () => {
    if (!socket?.connected) {
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (!socket?.connected) {
        return false;
      }
    }

    if (!connectionStarted.current) {
      connectionStarted.current = true;
      return true;
    }
  }, [socket?.connected]);

  const closeConnection = useCallback(() => {
    //
  }, []);

  const sendMessage = useCallback(
    (channel: string, data: any) => {
      if (!socket?.connected) {
        return 'No connetction';
      }

      socket.emit(channel, data);
    },
    [socket]
  );

  return { startConnection, connectionStarted: connectionStarted.current };
}
