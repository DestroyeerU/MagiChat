import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.background};
  }

  *, button, input {
    background: none;
    border: 0;
    font-family: Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
