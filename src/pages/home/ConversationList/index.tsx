import React from 'react';

import { useConversation } from '@contexts/conversation';
import { Conversation as ConversationInterface } from '@mytypes/conversation';

import UserIcon from '../assets/user.svg';
import { Divider } from '../styles';
import { Conversation, ConversationRow, ConversationsContainer, LastMessage, UserInfo, Username } from './styles';

interface Props {
  selectedConversation?: ConversationInterface;
  getConversationUsername: (conversation: ConversationInterface) => string;
  handleConversationClick: (conversation: ConversationInterface) => void;
}

const ConversationList: React.FC<Props> = ({
  selectedConversation,
  getConversationUsername,
  handleConversationClick,
}) => {
  const { conversations } = useConversation();

  return (
    <ConversationsContainer>
      {conversations.map((conversation) => (
        <Conversation key={conversation._id}>
          <ConversationRow
            selected={selectedConversation?._id === conversation._id}
            onClick={() => handleConversationClick(conversation)}
          >
            <UserIcon />
            <UserInfo>
              <Username>{getConversationUsername(conversation)}</Username>
              {conversation.lastMessage && <LastMessage>{conversation.lastMessage?.text}</LastMessage>}
            </UserInfo>
          </ConversationRow>

          <Divider />
        </Conversation>
      ))}
    </ConversationsContainer>
  );
};

export default ConversationList;
