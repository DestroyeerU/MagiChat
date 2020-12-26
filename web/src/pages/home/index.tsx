import React from 'react';

import Image from 'next/image';

import LogOutIcon from './assets/log-out.svg';
import UserIcon from './assets/user.svg';
import {
  Chat,
  Chats,
  Container,
  Divider,
  Header,
  LastMessage,
  LeftSide,
  RightSide,
  Row,
  SearchInput,
  UserInfo,
  Username,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <LeftSide>
        <Header>
          <UserIcon />
          <LogOutIcon />
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
      <RightSide />
    </Container>
  );
};

export default Home;
