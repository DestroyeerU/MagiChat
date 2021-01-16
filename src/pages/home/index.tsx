/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useRef } from 'react';

import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'src/contexts/auth';
import { useConversation } from 'src/contexts/conversation';

import { ModalHandles } from '@components/Modal';

import { useSocket } from '@hooks/socket';

import CreateChatIcon from './assets/chat.svg';
import LogOutIcon from './assets/log-out.svg';
import UserIcon from './assets/user.svg';
import CreateConversationModal from './CreateConversationModal';
import {
  Chat,
  Chats,
  Container,
  Divider,
  Header,
  LastMessage,
  LeftSide,
  Message,
  MessageInfo,
  MessageInput,
  MessagesContainer,
  MessageText,
  MessageUsername,
  RightSide,
  Row,
  SearchInput,
  UserInfo,
  Username,
} from './styles';

const Home: React.FC = () => {
  const router = useRouter();
  const authContext = useAuth();
  const { conversations, handleLoadConversations } = useConversation();

  const socketConnection = useSocket();

  const modalRef = useRef<ModalHandles>(null);
  const text = 'this is a text\nand this is other text';

  const handleCreateChat = useCallback(() => {
    modalRef.current.handleOpen();
  }, []);

  const handleLogOutClick = useCallback(() => {
    authContext.signOut();
    router.push('/login');
  }, [authContext, router]);

  useEffect(() => {
    async function startSocketConnection() {
      socketConnection.socket.on('load-conversations', handleLoadConversations);

      // const connected = await socketConnection.checkConnection();
      // console.log('connected', connected);

      // if (!connected) {
      //   // [to-do] if is not connected, try to reconnect
      // }
    }

    startSocketConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CreateConversationModal ref={modalRef} />

      <Container onClick={() => modalRef.current.handleClose()}>
        <LeftSide>
          <Header>
            <UserIcon />
            <CreateChatIcon onClick={handleCreateChat} />
            <LogOutIcon onClick={handleLogOutClick} />
          </Header>

          <SearchInput placeholder="Pesquise por uma conversa" />
          <Divider />

          <Chats>
            {conversations.map((conversation) => (
              <Chat key={conversation._id}>
                <Row>
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
        </LeftSide>

        <RightSide>
          <MessagesContainer>
            <Message>
              <UserIcon />
              <MessageInfo>
                <MessageUsername>Destroyeer</MessageUsername>
                <MessageText value={text} />
              </MessageInfo>
            </Message>
          </MessagesContainer>

          <MessageInput placeholder="Escreva sua mensagem" />
        </RightSide>
      </Container>
    </>
  );
};

export default Home;
