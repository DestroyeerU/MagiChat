import styled from 'styled-components';

import Form from '../../components/Form/Form';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 450px;

  background: ${(props) => props.theme.colors.backgroundContrast};

  padding: 45px 50px 75px;

  border: 1px solid ${(props) => props.theme.colors.stroke};
  border-radius: 4px;

  input {
    &:last-of-type {
      margin-top: 20px;
    }
  }

  button {
    margin-top: 68px;
  }

  span {
    margin-top: 2px;

    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.red};
  }
`;

export const Title = styled.h1`
  margin-bottom: 35px;

  text-align: center;

  font-size: 2.6rem;
  font-weight: 500;
`;

export const ForgotPassword = styled.p`
  margin-top: 12px;

  color: ${(props) => props.theme.colors.green};

  font-size: 1.5rem;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginButton = styled.button`
  height: 50px;

  border-radius: 4px;

  font-size: 1.8rem;
  font-weight: 700;

  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary};

  transition: filter 0.1s;

  outline: none;

  &:hover,
  &:focus {
    filter: brightness(85%);
  }
`;
