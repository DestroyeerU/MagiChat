import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Conversation } from '@mytypes/conversation';

import { postRequest } from '@utils/request';

interface CreateConversationParams {
  toUserEmail: string;
}

interface ConversationContextData {
  conversations: Conversation[];
  handleLoadConversations: (data: Conversation[]) => void;
  createConversation: (data: CreateConversationParams) => Promise<string | undefined>;
}

const ConversationContext = createContext<ConversationContextData>({} as ConversationContextData);

export const ConversationProvider: React.FC = ({ children }) => {
  const [conversations, setConversations] = useState([] as Conversation[]);

  const handleLoadConversations = useCallback((data: Conversation[]) => {
    setConversations(data);
  }, []);

  const createConversation = useCallback(
    async (data: CreateConversationParams) => {
      const { toUserEmail } = data;

      const { data: requestData, error: requestError } = await postRequest<Conversation>('/conversations', {
        toUserEmail,
      });

      if (requestError) {
        return requestError.message;
      }

      setConversations([...conversations, requestData]);

      return undefined;
    },
    [conversations]
  );

  const contextValue = useMemo<ConversationContextData>(() => {
    return {
      conversations,
      createConversation,
      handleLoadConversations,
    };
  }, [conversations, createConversation, handleLoadConversations]);

  return <ConversationContext.Provider value={contextValue}>{children}</ConversationContext.Provider>;
};

export function useConversation() {
  const context = useContext(ConversationContext);

  return context;
}
