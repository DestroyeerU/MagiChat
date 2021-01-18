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
import CreateConversationModal from './CreateConversationModal';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import {
  Chat,
  Chats,
  Container,
  Divider,
  LastMessage,
  LeftSide,
  LeftSideContent,
  LeftSideHeader,
  RightSide,
  RightSideHeader,
  RightSideHeaderDivider,
  RightSideHeaderUsername,
  Row,
  SearchInput,
  UserInfo,
  Username,
} from './styles';

const Home: React.FC = () => {
  const router = useRouter();
  const socketConnection = useSocket();

  const authContext = useAuth();
  const { conversations, handleLoadConversations } = useConversation();
  const { chats, handleLoadChat, handleLoadChatMessage } = useChat();

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
        console.error('No conversation selected');

        return;
      }

      socketConnection.socket.emit('create-chat-message', {
        text,
        userId: authContext.user.id,
        conversationId: selectedConversation._id,
      });
    },
    [authContext.user.id, selectedConversation, socketConnection.socket]
  );

  const handleConversationCreatedWithYou = useCallback((conversation: Conversation) => {
    console.log('conversation11', conversation);
  }, []);

  useEffect(() => {
    const chat = chats.find((currentChat) => currentChat.conversation._id === selectedConversation?._id);

    setSelectedChat(chat);
  }, [chats, selectedConversation]);

  useEffect(() => {
    // console.log('aaa');

    // [to-do] when someone send a message to you, must appear on conversations
    // [to-do] when someone send a message to you, must appear in the same time
    // [to-do] error-channels

    // async function startSocketConnection() {
    // const connected = await socketConnection.checkConnection();
    // console.log('connected', connected);
    // if (!connected) {
    //   // [to-do] if is not connected, try to reconnect
    // }
    // }
    // startSocketConnection();

    socketConnection.connect();

    if (!socketConnection.connectionStarted) {
      return () => {
        //
      };
    }

    console.log('connected');

    socketConnection.socket.on('create-conversation-response', handleConversationCreatedWithYou);

    socketConnection.socket.on('load-conversations', handleLoadConversations);
    socketConnection.socket.on('load-chat', handleLoadChat);
    socketConnection.socket.on('load-chat-message', handleLoadChatMessage);

    return () => {
      socketConnection.socket.off('create-conversation-response', handleConversationCreatedWithYou);

      socketConnection.socket.off('load-conversations', handleLoadConversations);
      socketConnection.socket.off('load-chat', handleLoadChat);
      socketConnection.socket.off('load-chat-message', handleLoadChatMessage);
    };
  }, [
    handleConversationCreatedWithYou,
    handleLoadChat,
    handleLoadChatMessage,
    handleLoadConversations,
    socketConnection,
  ]);

  return (
    <>
      <CreateConversationModal ref={modalRef} />

      <Container onClick={() => modalRef.current.handleClose()}>
        <LeftSide>
          <LeftSideHeader>
            <UserIcon />
            <CreateChatIcon onClick={handleCreateChatIconClick} />
            <LogOutIcon onClick={handleLogOutClick} />
          </LeftSideHeader>

          <LeftSideContent>
            <SearchInput placeholder="Pesquise por uma conversa" />
            <Divider />

            <Chats>
              {conversations.map((conversation) => (
                <Chat key={conversation._id}>
                  <Row onClick={() => handleConversationClick(conversation)}>
                    <UserIcon />
                    <UserInfo>
                      <Username>{conversation.user.name}</Username>
                      {conversation.lastMessage && <LastMessage>{conversation.lastMessage?.text}</LastMessage>}
                    </UserInfo>
                  </Row>

                  <Divider />
                </Chat>
              ))}
            </Chats>
          </LeftSideContent>
        </LeftSide>

        <RightSide visible={selectedConversation !== undefined}>
          <RightSideHeader>
            <RightSideHeaderDivider />
            <RightSideHeaderUsername>{selectedConversation?.user?.name}</RightSideHeaderUsername>
          </RightSideHeader>

          <MessagesList chat={selectedChat} />

          <MessageInput placeholder="Escreva sua mensagem" handleSubmit={handleMessageInputSubmit} />
        </RightSide>
      </Container>
    </>
  );
};

export default Home;
