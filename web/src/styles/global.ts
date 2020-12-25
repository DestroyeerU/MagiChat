import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    outline: none;
  }

  html {
    font-size: 10px;
  }

  #__next {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

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
