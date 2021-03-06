import styled from 'styled-components';

import { ScrollCSS } from '@styles/global';

export const ConversationsContainer = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 3px;
  padding-left: 10px;
  padding-bottom: 15px;

  overflow-y: auto;
  ${ScrollCSS};
`;

export const Conversation = styled.li`
  display: flex;
  flex-direction: column;

  width: calc(100% - 10px);
  padding-top: 5px;

  hr {
    margin-top: 5px;
  }

  svg,
  img {
    width: 50px;
  }

  &:last-child {
    hr {
      display: none;
    }
  }
`;

interface ConversationRowProps {
  selected: boolean;
}

export const ConversationRow = styled.div<ConversationRowProps>`
  display: flex;
  align-items: center;

  padding: 6px 0 6px 6px;
  border-radius: 4px;

  cursor: pointer;

  background-color: ${(props) => props.selected && props.theme.colors.home.backgroundLighten};

  &:hover {
    background-color: ${(props) => props.theme.colors.home.backgroundLighten};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-left: 15px;
`;

export const Username = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const LastMessage = styled.p`
  width: 250px;
  margin-top: 5px;

  font-size: 1.4rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
