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

  div {
    &:last-of-type {
      margin-top: 20px;
    }
  }

  button {
    margin-top: 68px;
  }

  > span {
    margin-top: 2px;

    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.red};
  }
`;

export const FormTitle = styled.h1`
  margin-bottom: 35px;

  text-align: center;

  font-size: 2.6rem;
  font-weight: 500;
`;

export const ForgotPassword = styled.a`
  margin-top: 12px;

  color: ${(props) => props.theme.colors.green};

  font-size: 1.5rem;
  font-weight: 500;

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const CreateAccount = styled.a`
  margin-top: 20px;

  font-size: 1.5rem;
  font-weight: 500;

  text-align: center;
  color: ${(props) => props.theme.colors.white};

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  > span {
    color: ${(props) => props.theme.colors.green};
  }
`;
