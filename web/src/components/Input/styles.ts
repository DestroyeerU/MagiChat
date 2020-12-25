import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 17px 20px;

  border-radius: 4px;

  font-size: 1.6rem;
  font-weight: 400;

  border: 2px solid ${(props) => props.theme.colors.stroke};

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;
