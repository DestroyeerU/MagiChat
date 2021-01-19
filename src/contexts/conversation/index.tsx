import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Conversation } from '@mytypes/conversation';

import { useAuth } from '../auth';
import { useSocket } from '../socket';

interface CreateConversationRequestParams {
  toUserEmail: string;
}

interface ConversationContextData {
  conversations: Conversation[];

  createConversationRequest: (params: CreateConversationRequestParams) => void;
  addConversation: (data: Conversation) => void;

  handleLoadConversations: (data: Conversation[]) => void;
}

const ConversationContext = createContext<ConversationContextData>({} as ConversationContextData);

export const ConversationProvider: React.FC = ({ children }) => {
  const authContext = useAuth();
  const socketConnection = useSocket();

  const [conversations, setConversations] = useState([] as Conversation[]);

  const handleLoadConversations = useCallback((data: Conversation[]) => {
    setConversations(data);
  }, []);

  const createConversationRequest = useCallback(
    (params: CreateConversationRequestParams) => {
      const { toUserEmail } = params;

      socketConnection.emit('create-conversation-request', {
        toUserEmail,
      });
    },
    [socketConnection]
  );

  const addConversation = useCallback((data: Conversation) => {
    function updateConversations(oldConversations: Conversation[]) {
      const conversationExists = oldConversations.find((conversation) => conversation._id === data._id);

      if (conversationExists) {
        return oldConversations;
      }

      return [...oldConversations, data];
    }

    setConversations(updateConversations);
  }, []);

  const handleSignOut = useCallback(() => {
    setConversations([] as Conversation[]);
  }, []);

  const contextValue = useMemo<ConversationContextData>(() => {
    return {
      conversations,
      createConversationRequest,
      addConversation,
      handleLoadConversations,
    };
  }, [conversations, createConversationRequest, addConversation, handleLoadConversations]);

  useEffect(() => {
    authContext.addSignOutListener(handleSignOut);

    socketConnection.on('load-conversations', handleLoadConversations);
    socketConnection.on('create-conversation-response', addConversation);
    socketConnection.on('receive-conversation-response', addConversation);

    return () => {
      authContext.removeSignOutListener(handleSignOut);

      socketConnection.off('load-conversations', handleLoadConversations);
      socketConnection.on('create-conversation-response', addConversation);
      socketConnection.off('receive-conversation-response', addConversation);
    };
  }, [authContext, addConversation, handleLoadConversations, handleSignOut, socketConnection]);

  return <ConversationContext.Provider value={contextValue}>{children}</ConversationContext.Provider>;
};

export function useConversation() {
  const context = useContext(ConversationContext);

  return context;
}
