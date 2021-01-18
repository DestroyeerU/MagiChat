/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';

import { Conversation } from '@mytypes/conversation';
import { useAuth } from 'src/contexts/auth';
import { useConversation } from 'src/contexts/conversation';

import UserIcon from '../assets/user.svg';
import { Divider } from '../styles';
import { Chat, ChatRow, ChatsContainer, LastMessage, UserInfo, Username } from './styles';

interface Props {
  handleConversationClick: (conversation: Conversation) => void;
}

const ChatList: React.FC<Props> = ({ handleConversationClick }) => {
  const authContext = useAuth();
  const { conversations } = useConversation();

  const getConversationUsername = useCallback(
    (conversation: Conversation) => {
      if (!authContext.signed) {
        return '';
      }

      if (authContext.user.id === conversation.user.id) {
        return conversation.toUser.name;
      }

      if (authContext.user.id === conversation.toUser.id) {
        return conversation.user.name;
      }

      // eslint-disable-next-line no-console
      console.error('Error getting conversation username');
      return '';
    },
    [authContext.signed, authContext.user.id]
  );

  return (
    <ChatsContainer>
      {conversations.map((conversation) => (
        <Chat key={conversation._id}>
          <ChatRow onClick={() => handleConversationClick(conversation)}>
            <UserIcon />
            <UserInfo>
              <Username>{getConversationUsername(conversation)}</Username>
              {conversation.lastMessage && <LastMessage>{conversation.lastMessage?.text}</LastMessage>}
            </UserInfo>
          </ChatRow>

          <Divider />
        </Chat>
      ))}
    </ChatsContainer>
  );
};

export default ChatList;
