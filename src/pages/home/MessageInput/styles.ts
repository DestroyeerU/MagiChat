import styled from 'styled-components';

export const StyledMessageInput = styled.input`
  width: auto;

  margin: 0 20px;
  padding: 14px 20px;

  border-radius: 8px;

  font-size: 1.6rem;
  font-weight: 400;

  border: 2px solid ${(props) => props.theme.colors.stroke};

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.home.chat.messageInput};

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;
