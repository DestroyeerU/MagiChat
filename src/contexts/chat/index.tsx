/* eslint-disable no-underscore-dangle */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Chat } from '@mytypes/message';

interface ChatContextData {
  chats: Chat[];

  handleLoadChat: (data: Chat) => void;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState([] as Chat[]);

  const handleLoadChat = useCallback(
    (data: Chat) => {
      const { conversation, messages } = data;
      const chatExists = chats.find((chat) => chat.conversation._id === conversation._id);

      if (chatExists) {
        return;
      }

      const chat = {
        conversation,
        messages: messages.reverse(),
      };

      setChats([...chats, chat]);
    },
    [chats]
  );

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
