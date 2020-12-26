import styled from 'styled-components';

import { ScrollCSS } from '@styles/global';

export const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 350px;

  background-color: #171a1b;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 14px;

  background-color: #141617;

  border-bottom: 2px solid ${(props) => props.theme.colors.stroke};
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 330px;

  margin: 8px auto;
  padding: 14px 20px;

  border-radius: 8px;

  font-size: 1.6rem;
  font-weight: 400;

  border: 1px solid ${(props) => props.theme.colors.stroke};

  color: ${(props) => props.theme.colors.text};
  background-color: #1f2324;

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
  /*
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  } */
`;

export const Divider = styled.hr`
  width: 100%;
  max-width: 320px;

  height: 1px;
  margin: 0 auto;

  background-color: #333;
`;

export const Chats = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 15px;
  padding-left: 13px;

  overflow-y: auto;
  ${ScrollCSS};
`;

export const Chat = styled.li`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 12px;

  hr {
    margin: 0;
  }

  svg,
  img {
    width: 50px;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    hr {
      display: none;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;

  padding-bottom: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-left: 15px;
`;

export const Username = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const LastMessage = styled.p`
  margin-top: 5px;

  font-size: 1.4rem;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: ${(props) => props.theme.colors.backgroundContrast};
`;
