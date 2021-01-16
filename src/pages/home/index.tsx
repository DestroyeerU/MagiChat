/* eslint-disable no-alert */
import React, { useCallback, useEffect, useRef } from 'react';

import { DefaultRequestError } from '@mytypes/request';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'src/contexts/auth';

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

// const Test: React.FC = () => <CreateChatIcon />;
function handleOrAlertError(func: any, ...arr: any[]) {
  try {
    func(...arr);
  } catch (e) {
    console.log(e.message);
  }
}

const Home: React.FC = () => {
  const router = useRouter();
  const authContext = useAuth();

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
      const connected = await socketConnection.startConnection();
      console.log('connected', connected);
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
            <Chat>
              <Row>
                <UserIcon />
                <UserInfo>
                  <Username>Destroyeer</Username>
                  <LastMessage>Ae se liga passar a visão</LastMessage>
                </UserInfo>
              </Row>

              <Divider />
            </Chat>
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
