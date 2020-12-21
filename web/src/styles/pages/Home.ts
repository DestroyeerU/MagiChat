import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  h1 {
    margin-top: 40px;

    font-size: 54px;
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    margin-top: 24px;

    font-size: 24px;
    line-height: 32px;
  }
`;
