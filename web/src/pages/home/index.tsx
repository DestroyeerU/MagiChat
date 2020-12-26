import React from 'react';

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
  const text = 'asdsad\nasdasd';

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
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
          <Message>
            <UserIcon />
            <MessageInfo>
              <MessageUsername>Destroyeer</MessageUsername>
              <MessageText>{text}</MessageText>
            </MessageInfo>
          </Message>
        </MessagesContainer>

        <MessageInput placeholder="Escreva sua mensagem" />
      </RightSide>
    </Container>
  );
};

export default Home;
