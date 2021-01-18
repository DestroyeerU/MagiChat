import React from 'react';

import { AppProps } from 'next/app';
import { AuthProvider } from 'src/contexts/auth';
import { ChatProvider } from 'src/contexts/chat';
import { ConversationProvider } from 'src/contexts/conversation';
import { SocketProvider } from 'src/contexts/socket';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const Contexts: React.FC = ({ children }) => {
  return (
    <SocketProvider>
      <AuthProvider>
        <ConversationProvider>
          <ChatProvider>{children}</ChatProvider>
        </ConversationProvider>
      </AuthProvider>
    </SocketProvider>
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
