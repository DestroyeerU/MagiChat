import { useMemo } from 'react';

import socketClient from 'socket.io-client';
import { authStorageHelper } from 'src/contexts/auth/utils';

const endPoint = 'http://localhost:3333';

export function useSocket() {
  const socket = useMemo(() => {
    if (!process.browser) {
      return undefined;
    }

    const { token } = authStorageHelper.loadUserAndToken();
    const query = `token=Bearer ${token}a`;
    // const query = `token=Bearer ${token}`;

    const clientSocket = socketClient(endPoint, {
      transports: ['websocket'],
      query,
    });

    return clientSocket;
  }, []);

  return socket;
}
