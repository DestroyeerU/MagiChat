// [to-do] put the below code on eslintrc
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Chat, Message } from '@mytypes/message';

interface ChatMessageData extends Message {
  conversationId: string;
}

interface ChatContextData {
  chats: Chat[];

  handleLoadChat: (data: Chat) => void;
  addMessage: (data: ChatMessageData) => void;
  handleLoadChatMessage: (message: ChatMessageData) => void;
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

  const handleLoadChatMessage = useCallback((message: ChatMessageData) => {
    function getUpdatedChats(oldChats: Chat[]) {
      const chatConversation = oldChats.find((chat) => chat.conversation._id === message.conversationId);
      if (!chatConversation) {
        console.log('No chat conversation on load message');
        return oldChats;
      }

      const chatsWithoutTargetConversation = oldChats.filter(
        (chat) => chat.conversation._id !== message.conversationId
      );

      const chatConversationUpdated = {
        ...chatConversation,
        messages: [message, ...chatConversation.messages],
      };

      return [...chatsWithoutTargetConversation, chatConversationUpdated];
    }

    setChats(getUpdatedChats);
  }, []);

  const addMessage = useCallback((data: ChatMessageData) => {
    function updateChats(oldChats: Chat[]) {
      const { conversationId, _id, text, date, senderUserId } = data;

      const chat = oldChats.find((currentChat) => currentChat.conversation._id === conversationId);

      if (!chat) {
        // [to-do] need to create the chat? Or is a bug
        // eslint-disable-next-line no-console
        console.error('Chat not exists on addMessage');

        return oldChats;
      }

      const message = {
        _id,
        text,
        date,
        senderUserId,
      };

      const chatUpdated = {
        conversation: chat.conversation,
        messages: [message, ...chat.messages],
      };

      const chatsUpdated = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const currentChat of oldChats) {
        if (currentChat.conversation._id === chatUpdated.conversation._id) {
          chatsUpdated.push(chatUpdated);
        }

        chatsUpdated.push(currentChat);
      }

      return chatsUpdated;
    }

    setChats(updateChats);
  }, []);

  const contextValue = useMemo<ChatContextData>(() => {
    return {
      chats,

      addMessage,
      handleLoadChat,
      handleLoadChatMessage,
    };
  }, [addMessage, chats, handleLoadChat, handleLoadChatMessage]);

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export function useChat() {
  const context = useContext(ChatContext);

  return context;
}
