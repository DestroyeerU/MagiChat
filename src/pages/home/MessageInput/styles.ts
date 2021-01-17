import styled, { css } from 'styled-components';

const BreakLineCSS = css`
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

export const Container = styled.div`
  display: flex;
  margin: 0 20px;

  width: auto;
  max-height: 300px;
`;

export const StyledMessageInput = styled.span`
  width: 100%;

  padding: 14px 20px;
  border-radius: 8px;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;

  border: 2px solid ${(props) => props.theme.colors.stroke};

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.home.chat.messageInput};

  overflow-y: auto;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &::placeholder {
    /* color: ${(props) => props.theme.colors.textSecondary}; */
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  ${BreakLineCSS};
`;
