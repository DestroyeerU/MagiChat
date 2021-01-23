import React from 'react';

import { AuthProvider } from '@contexts/auth';
import { ChatProvider } from '@contexts/chat';
import { ConversationProvider } from '@contexts/conversation';
import { SocketProvider } from '@contexts/socket';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const Contexts: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <ConversationProvider>
          <ChatProvider>{children}</ChatProvider>
        </ConversationProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Contexts>
        <Component {...pageProps} />
      </Contexts>
    </ThemeProvider>
  );
};

export default MyApp;
