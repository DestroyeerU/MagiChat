/* eslint-disable no-underscore-dangle */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Chat, Message } from '@mytypes/message';

interface LoadChatMessageData extends Message {
  conversationId: string;
}

interface ChatContextData {
  chats: Chat[];

  handleLoadChat: (data: Chat) => void;
  handleLoadChatMessage: (message: LoadChatMessageData) => void;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState([] as Chat[]);

  // cant use chats directly cause the function will not update on soket.on
  const handleLoadChat = useCallback((data: Chat) => {
    const { conversation, messages } = data;

    function getUpdatedChats(oldChats: Chat[]) {
      const chatExists = oldChats.find((chat) => chat.conversation._id === conversation._id);

      if (chatExists) {
        return oldChats;
      }

      const chat = {
        conversation,
        messages: messages.reverse(),
      };

      return [...oldChats, chat];
    }

    setChats(getUpdatedChats);
  }, []);

  const handleLoadChatMessage = useCallback((message: LoadChatMessageData) => {
    function getUpdatedChats(oldChats: Chat[]) {
      const chatConversation = oldChats.find((chat) => chat.conversation._id === message.conversationId);
      if (!chatConversation) {
        console.log('No chat conversation on load message');
        return oldChats;
      }

      const chatConversationUpdated = {
        ...chatConversation,
        messages: [...chatConversation.messages, message],
      };

      const chatsWithoutTargetConversation = oldChats.filter(
        (chat) => chat.conversation._id !== message.conversationId
      );
      const chatsUpdated = [...chatsWithoutTargetConversation, chatConversationUpdated];

      console.log('chatsUpdated', chatsUpdated);

      return chatsUpdated;
    }

    setChats(getUpdatedChats);
  }, []);

  const contextValue = useMemo<ChatContextData>(() => {
    return {
      chats,

      handleLoadChat,
      handleLoadChatMessage,
    };
  }, [chats, handleLoadChat, handleLoadChatMessage]);

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export function useChat() {
  const context = useContext(ChatContext);

  return context;
}
