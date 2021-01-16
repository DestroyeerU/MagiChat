/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ConversationIndex } from '@mytypes/conversation';
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

  const [conversations, setConversations] = useState([] as ConversationIndex[]);

  const handleCreateChat = useCallback(() => {
    modalRef.current.handleOpen();
  }, []);

  const handleLogOutClick = useCallback(() => {
    authContext.signOut();
    router.push('/login');
  }, [authContext, router]);

  const handleLoadConversations = useCallback((data: ConversationIndex[]) => {
    setConversations(data);
  }, []);

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
                    {conversation.lastMessage && <LastMessage>{conversation.lastMessage}</LastMessage>}
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
