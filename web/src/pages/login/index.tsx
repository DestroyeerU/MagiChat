import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import Link from 'next/link';
import * as Yup from 'yup';

import Form from '@components/Form/Form';
import Input from '@components/Input';

import { StyledForm, Title, ForgotPassword, LoginButton, CreateAccount } from './styles';

interface FormSubmitData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
});

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFormSubmit = useCallback((data: FormSubmitData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, []);

  return (
    <Form ref={formRef} as={StyledForm} schema={schema} onSubmit={handleFormSubmit}>
      <Title>Faça seu login</Title>

      <Input ref={emailRef} name="email" placeholder="Digite seu email" autoFocus />
      <Input ref={passwordRef} name="password" placeholder="Digite sua senha" type="password" />

      <ForgotPassword>Esqueci minha senha</ForgotPassword>

      <LoginButton type="submit">ENTRAR</LoginButton>

      {/* <CreateAccount href="/#">Não tem conta?</CreateAccount> */}

      <Link href="/#">
        <CreateAccount>
          Não tem conta?
          <span> Crie uma!</span>
        </CreateAccount>
      </Link>
    </Form>
  );
};

export default Login;
