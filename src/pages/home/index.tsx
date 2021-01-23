/* eslint-disable no-alert */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Conversation } from '@mytypes/conversation';
import { Chat as ChatInterface } from '@mytypes/message';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'src/contexts/auth';
import { useChat } from 'src/contexts/chat';
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
  const { chats, createChatMessage, loadChatRequest } = useChat();

  const modalRef = useRef<ModalHandles>(null);

  const [selectedConversation, setSelectedConversation] = useState<Conversation>();
  const [selectedChat, setSelectedChat] = useState<ChatInterface>();

  const getConversationUsername = useCallback(
    (conversation?: Conversation) => {
      if (!authContext.signed) {
        return '';
      }

      if (authContext.user.id === conversation?.user?.id) {
        return conversation.toUser.name;
      }

      if (authContext.user.id === conversation?.toUser?.id) {
        return conversation.user.name;
      }

      return '';
    },
    [authContext.signed, authContext.user.id]
  );

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
      loadChatRequest({ conversationId: conversation._id });
    },
    [loadChatRequest]
  );

  const handleMessageInputSubmit = useCallback(
    (text: string) => {
      if (!selectedConversation) {
        // eslint-disable-next-line no-console
        console.error('No conversation selected');

        return;
      }

      createChatMessage({
        text,
        userId: authContext.user.id,
        conversationId: selectedConversation._id,
      });
    },
    [authContext.user.id, createChatMessage, selectedConversation]
  );

  useEffect(() => {
    const chat = chats.find((currentChat) => currentChat.conversation._id === selectedConversation?._id);

    setSelectedChat(chat);
  }, [chats, selectedConversation]);

  useEffect(() => {
    socketConnection.connect();
  }, [socketConnection]);

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

            <ChatList
              getConversationUsername={getConversationUsername}
              handleConversationClick={handleConversationClick}
            />
          </LeftSideContent>
        </LeftSide>

        <RightSide visible={selectedConversation !== undefined}>
          <RightSideHeader>
            <RightSideHeaderDivider />
            <RightSideHeaderUsername>{getConversationUsername(selectedConversation)}</RightSideHeaderUsername>
          </RightSideHeader>

          <MessageList chat={selectedChat} />

          <MessageInput placeholder="Escreva sua mensagem" handleSubmit={handleMessageInputSubmit} />
        </RightSide>
      </Container>
    </>
  );
};

export default Home;
