import styled from 'styled-components';

import { ScrollCSS } from '@styles/global';

interface RightSideProps {
  visible?: boolean;
}

export const MessagesContainer = styled.ul<RightSideProps>`
  display: flex;
  flex-direction: column-reverse;

  height: 100%;
  padding-bottom: 30px;

  overflow-y: auto;
  ${ScrollCSS};

  visibility: ${(props) => !props?.visible && 'hidden'};
`;

export const MessageContainer = styled.li`
  display: flex;

  width: 90%;

  margin: 25px 20px 0;

  &:last-child {
    margin-top: 0;
  }
`;

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-left: 15px;
`;

export const MessageUsername = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const MessageText = styled.span`
  width: 100%;

  margin-top: 7px;
  padding: 4px 12px;

  border: 1px solid ${(props) => props.theme.colors.stroke};
  border-radius: 4px;

  font-size: 1.6rem;
  line-height: 2.2rem;

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.home.chat.message};

  /* break line: \n */
  white-space: pre-wrap;

  /* BREAK LINE */
  -ms-word-break: break-all;
  word-break: break-all;

  word-break: break-word; /* Non standard for webkit */

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
`;
