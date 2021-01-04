import styled from 'styled-components';

export const DefaultButton = styled.button`
  height: 50px;

  border-radius: 4px;

  font-size: 1.8rem;
  font-weight: 500;

  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary};

  transition: filter 0.1s;

  outline: none;

  &:hover,
  &:focus {
    filter: brightness(85%);
  }
`;
