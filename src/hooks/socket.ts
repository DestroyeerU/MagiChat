import { useMemo } from 'react';

import socketClient from 'socket.io-client';

const endPoint = 'http://localhost:3333';

let token = '';

export function setSocketToken(tokenToSet: string) {
  token = tokenToSet;
}

export function useSocket() {
  const query = `token=Bearer ${token}`;

  const socket = useMemo(() => {
    const clientSocket = socketClient(endPoint, {
      transports: ['wensocket'],
      query,
    });

    return clientSocket;
  }, [query]);

  return socket;
}
