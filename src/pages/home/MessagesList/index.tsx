/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';

import { Chat, Message as MessageInterface } from '@mytypes/message';

import UserIcon from '../assets/user.svg';
import { MessagesContainer, MessageContainer, MessageInfo, MessageUsername, MessageText } from './styles';

interface OwnProps {
  chat?: Chat;
}

type Props = OwnProps;

const MessagesList: React.FC<Props> = ({ chat }) => {
  const getSenderUserMessage = useCallback(
    (message: MessageInterface) => {
      if (message.senderUserId === chat.conversation.user.id) {
        return chat.conversation.user;
      }

      if (message.senderUserId === chat.conversation.toUser.id) {
        return chat.conversation.toUser;
      }

      console.log('User is not on conversation');
      return undefined;
    },
    [chat?.conversation]
  );

  return (
    <MessagesContainer visible={chat !== undefined}>
      {chat?.messages.map((message) => (
        <MessageContainer key={message._id}>
          <UserIcon />
          <MessageInfo>
            <MessageUsername>{getSenderUserMessage(message).name}</MessageUsername>

            <MessageText>{message.text}</MessageText>
          </MessageInfo>
        </MessageContainer>
      ))}
    </MessagesContainer>
  );
};

export default MessagesList;
