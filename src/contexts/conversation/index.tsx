import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Conversation } from '@mytypes/conversation';

import { useAuth } from '../auth';

interface ConversationContextData {
  conversations: Conversation[];
  handleLoadConversations: (data: Conversation[]) => void;
  handleAddConversation: (data: Conversation) => void;
}

const ConversationContext = createContext<ConversationContextData>({} as ConversationContextData);

export const ConversationProvider: React.FC = ({ children }) => {
  const authContext = useAuth();
  const [conversations, setConversations] = useState([] as Conversation[]);

  const handleLoadConversations = useCallback((data: Conversation[]) => {
    setConversations(data);
  }, []);

  const handleAddConversation = useCallback((data: Conversation) => {
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
      // createConversation,
      handleAddConversation,
      handleLoadConversations,
    };
  }, [conversations, handleAddConversation, handleLoadConversations]);

  useEffect(() => {
    authContext.addSignOutListener(handleSignOut);

    return () => {
      authContext.removeSignOutListener(handleSignOut);
    };
  }, [authContext, handleSignOut]);

  return <ConversationContext.Provider value={contextValue}>{children}</ConversationContext.Provider>;
};

export function useConversation() {
  const context = useContext(ConversationContext);

  return context;
}
