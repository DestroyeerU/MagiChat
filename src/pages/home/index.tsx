/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Conversation } from '@mytypes/conversation';
import { Chat as ChatInterface } from '@mytypes/message';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'src/contexts/auth';
import { useChat } from 'src/contexts/chat';
import { useConversation } from 'src/contexts/conversation';
import { useSocket } from 'src/contexts/socket';

import { ModalHandles } from '@components/Modal';

import CreateChatIcon from './assets/chat.svg';
import LogOutIcon from './assets/log-out.svg';
import UserIcon from './assets/user.svg';
import ChatList from './ChatList';
import CreateConversationModal from './CreateConversationModal';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import {
  Container,
  Divider,
  LeftSide,
  LeftSideContent,
  LeftSideHeader,
  LeftSideHeaderUsername,
  RightSide,
  RightSideHeader,
  RightSideHeaderDivider,
  RightSideHeaderUsername,
  SearchInput,
} from './styles';

const Home: React.FC = () => {
  const router = useRouter();
  const socketConnection = useSocket();

  const authContext = useAuth();
  const { handleLoadConversations, handleAddConversation } = useConversation();
  const { chats, handleLoadChat, handleLoadChatMessage, addMessage } = useChat();

  const modalRef = useRef<ModalHandles>(null);

  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const [selectedChat, setSelectedChat] = useState<ChatInterface>();

  const handleCreateChatIconClick = useCallback(() => {
    modalRef.current.handleOpen();
  }, []);

  const handleLogOutClick = useCallback(() => {
    authContext.signOut();
    router.push('/login');
  }, [authContext, router]);

  const handleConversationClick = useCallback(
    (conversation: Conversation) => {
      setSelectedConversation(conversation);
      const chatExists = chats.find((chat) => chat.conversation._id === conversation._id);

      if (chatExists) {
        return;
      }

      socketConnection.socket.emit('load-chat-request', {
        conversationId: conversation._id,
      });
    },
    [chats, socketConnection.socket]
  );

  const handleMessageInputSubmit = useCallback(
    (text: string) => {
      if (!selectedConversation) {
        // eslint-disable-next-line no-console
        console.error('No conversation selected');

        return;
      }

      socketConnection.socket.emit('create-chat-message', {
        text,
        userId: authContext.user.id,
        conversationId: selectedConversation._id,
      });
    },
    [authContext.user?.id, selectedConversation, socketConnection.socket]
  );

  const handleConversationCreatedWithYou = useCallback(
    (conversation: Conversation) => {
      handleAddConversation(conversation);
    },
    [handleAddConversation]
  );

  const handleMessageSentToYou = useCallback(
    (message: any) => {
      console.log('message to me', message);
      addMessage(message);
    },
    [addMessage]
  );

  useEffect(() => {
    const chat = chats.find((currentChat) => currentChat.conversation._id === selectedConversation?._id);

    setSelectedChat(chat);
  }, [chats, selectedConversation]);

  useEffect(() => {
    // [to-do] when someone send a message to you, must appear in the same time
    // [to-do] how last message should work when you are on that conversation?

    // [to-do] move listeners to context
    // [to-do] create logout listener to clean contexts data
    // [to-do] error-channels

    socketConnection.connect();

    if (!socketConnection.connectionStarted) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    socketConnection.socket.on('receive-conversation-response', handleConversationCreatedWithYou);
    socketConnection.socket.on('receive-chat-message-response', handleMessageSentToYou);

    socketConnection.socket.on('load-conversations', handleLoadConversations);
    socketConnection.socket.on('load-chat', handleLoadChat);
    socketConnection.socket.on('create-chat-message-response', handleLoadChatMessage);

    return () => {
      socketConnection.socket.off('receive-conversation-response', handleConversationCreatedWithYou);
      socketConnection.socket.off('receive-chat-message-response', handleMessageSentToYou);

      socketConnection.socket.off('load-conversations', handleLoadConversations);
      socketConnection.socket.off('load-chat', handleLoadChat);
      socketConnection.socket.off('create-chat-message-response', handleLoadChatMessage);
    };
  }, [
    handleConversationCreatedWithYou,
    handleLoadChat,
    handleLoadChatMessage,
    handleLoadConversations,
    handleMessageSentToYou,
    socketConnection,
  ]);

  return (
    <>
      <CreateConversationModal ref={modalRef} />

      <Container onClick={() => modalRef.current.handleClose()}>
        <LeftSide>
          <LeftSideHeader>
            <UserIcon />
            <LeftSideHeaderUsername>{authContext.user.name}</LeftSideHeaderUsername>

            <CreateChatIcon onClick={handleCreateChatIconClick} />
            <LogOutIcon onClick={handleLogOutClick} />
          </LeftSideHeader>

          <LeftSideContent>
            <SearchInput placeholder="Pesquise por uma conversa" />
            <Divider />

            <ChatList handleConversationClick={handleConversationClick} />
          </LeftSideContent>
        </LeftSide>

        <RightSide visible={selectedConversation !== undefined}>
          <RightSideHeader>
            <RightSideHeaderDivider />
            <RightSideHeaderUsername>{selectedConversation?.toUser?.name}</RightSideHeaderUsername>
          </RightSideHeader>

          <MessageList chat={selectedChat} />

          <MessageInput placeholder="Escreva sua mensagem" handleSubmit={handleMessageInputSubmit} />
        </RightSide>
      </Container>
    </>
  );
};

export default Home;
