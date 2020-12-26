import React, { useCallback, useEffect, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import * as Yup from 'yup';

import { LoginButton } from '@components/Buttons';
import { InputHandles } from '@components/Form/DefaultInput';
import Form from '@components/Form/Form';
import Input from '@components/Input';

import { StyledForm, FormTitle, ForgotPassword, CreateAccount } from './styles';

interface FormSubmitData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
});

const Login: React.FC = () => {
  const router = useRouter();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<InputHandles>(null);
  const passwordInputRef = useRef<InputHandles>(null);

  const handleFormSubmit = useCallback(
    (data: FormSubmitData) => {
      // eslint-disable-next-line no-console
      console.log(data);
      router.push('/home');
    },
    [router]
  );

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <Form ref={formRef} as={StyledForm} schema={schema} onSubmit={handleFormSubmit}>
      <FormTitle>Faça seu login</FormTitle>

      <Input ref={emailInputRef} name="email" placeholder="Digite seu email" />
      <Input ref={passwordInputRef} name="password" placeholder="Digite sua senha" type="password" />

      <ForgotPassword>Esqueci minha senha</ForgotPassword>

      <LoginButton type="submit">ENTRAR</LoginButton>

      {/* <CreateAccount href="/#">Não tem conta?</CreateAccount> */}

      <Link href="/createAccount">
        <CreateAccount>
          Não tem conta?
          <span> Crie uma!</span>
        </CreateAccount>
      </Link>
    </Form>
  );
};

export default Login;
