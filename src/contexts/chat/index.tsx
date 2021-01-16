import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Message } from '@mytypes/message';

interface Chat {
  conversationId: string;
  messages: Message[];
}

interface ChatContextData {
  chats: Chat[];
  handleLoadChat: (data: Chat) => void;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState([] as Chat[]);

  const handleLoadChat = useCallback((data: Chat) => {
    //
  }, []);

  const contextValue = useMemo<ChatContextData>(() => {
    return {
      chats,
      handleLoadChat,
    };
  }, [chats, handleLoadChat]);

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export function useChat() {
  const context = useContext(ChatContext);

  return context;
}
