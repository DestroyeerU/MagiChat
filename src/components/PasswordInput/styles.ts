import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding-right: 15px;

  border-radius: 4px;

  border: 2px solid ${(props) => props.theme.colors.stroke};
  background-color: ${(props) => props.theme.colors.background};

  &.focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  svg {
    cursor: pointer;
  }
`;

export const StyledInput = styled.input`
  width: 100%;

  padding: 17px 20px;

  font-size: 1.6rem;
  font-weight: 400;

  color: ${(props) => props.theme.colors.text};

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

// border: 2px solid ${(props) => props.theme.colors.primary};

// ${InputContainer}:hover & {
//   border: 2px solid ${(props) => props.theme.colors.primary};
// }

// ${StyledInput}:hover & {
//   border: 2px solid ${(props) => props.theme.colors.primary};
// }
