import styled from 'styled-components';

import Form from '../../components/Form/Form';

export const Container = styled.div`
  display: flex;

  width: 100%;
  max-width: 1007px;

  padding: 45px 85px 60px 75px;

  background-color: ${(props) => props.theme.colors.backgroundContrast};
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 360px;

  > input:last-of-type {
    /* Second Input */
    margin-top: 20px;
  }

  div {
    /* PasswordInput */
    margin-top: 20px;
  }

  button {
    margin-top: 60px;
  }

  > span {
    margin-top: 2px;

    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.red};
  }
`;

export const FormTitle = styled.h1`
  margin-bottom: 40px;

  text-align: center;

  font-size: 2.6rem;
  font-weight: 500;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 58px;
  margin-left: 130px;
`;

export const Title = styled.h1`
  font-size: 4rem;
  line-height: 5.1rem;

  color: ${(props) => props.theme.colors.green};
`;

export const Description = styled.p`
  margin-top: 40px;

  font-size: 1.6rem;
  line-height: 2.6rem;

  > span {
    color: ${(props) => props.theme.colors.green};
  }
`;

export const BackToLogin = styled.a`
  display: flex;
  align-items: center;

  margin-top: auto;
  margin-left: auto;

  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.primary};

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  > svg {
    margin-right: 13px;
  }
`;
