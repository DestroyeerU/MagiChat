import { createGlobalStyle, css } from 'styled-components';

export const ScrollCSS = css`
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #282d2f;
    border: 1px solid ${(props) => props.theme.colors.stroke};

    margin-top: 5px;
    margin-bottom: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #101219;
  }
`;

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
