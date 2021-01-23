import React from 'react';

import { useConversation } from '@contexts/conversation';
import { Conversation } from '@mytypes/conversation';

import UserIcon from '../assets/user.svg';
import { Divider } from '../styles';
import { Chat, ChatRow, ChatsContainer, LastMessage, UserInfo, Username } from './styles';

interface Props {
  getConversationUsername: (conversation: Conversation) => string;
  handleConversationClick: (conversation: Conversation) => void;
}

const ChatList: React.FC<Props> = ({ getConversationUsername, handleConversationClick }) => {
  const { conversations } = useConversation();

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
