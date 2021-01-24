/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useRef } from 'react';

import { User } from '@mytypes/user';
import { FormHandles } from '@unform/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import * as Yup from 'yup';

import { DefaultButton } from '@components/Buttons';
import { InputHandles } from '@components/Form/DefaultInput';
import Form from '@components/Form/Form';
import Input from '@components/Input';
import PasswordInput from '@components/PasswordInput';

import { postRequest } from '@utils/request';

import ArrowLeftIcon from './assets/arrow-left.svg';
import { Container, LeftSide, StyledForm, FormTitle, Title, Description, BackToLogin } from './styles';

interface FormSubmitData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

function testPasswords(password: string, passwordConfirmation: string) {
  return password === passwordConfirmation;
}

const createAccountSchema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string().email('Email inválido').required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
  passwordConfirmation: Yup.string().when('password', (password: string, schema: any) =>
    schema.test({
      test: (passwordConfirmation: string) => testPasswords(password, passwordConfirmation),
      message: 'As senhas não coincidem',
    })
  ),
});

const CreateAccount: React.FC = () => {
  const router = useRouter();

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<InputHandles>(null);
  const emailInputRef = useRef<InputHandles>(null);
  const passwordInputRef = useRef<InputHandles>(null);
  const passwordConfirmationInputRef = useRef<InputHandles>(null);

  const handleFormSubmit = useCallback(
    async (formData: FormSubmitData) => {
      const { name, email, password } = formData;
      const { error, status } = await postRequest<User>('/users', {
        name,
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (status === 200) {
        router.push('/login');
      }
    },
    [router]
  );

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  return (
    <Container>
      <Form ref={formRef} as={StyledForm} onSubmit={handleFormSubmit} schema={createAccountSchema}>
        <FormTitle>Crie sua conta</FormTitle>

        <Input ref={nameInputRef} name="name" placeholder="Digite seu nome" autoFocus />
        <Input ref={emailInputRef} name="email" placeholder="Digite seu email" />
        <PasswordInput ref={passwordInputRef} name="password" placeholder="Digite sua senha" />
        <PasswordInput
          ref={passwordConfirmationInputRef}
          name="passwordConfirmation"
          placeholder="Confirmação de senha"
        />

        <DefaultButton type="submit">CADASTRAR</DefaultButton>
      </Form>

      <LeftSide>
        <Title>Crie uma conta em nossa Plataforma</Title>
        <Description>
          Ao criar uma conta em nossa plataforma você terá a oportunidade de se
          <span> comunicar </span>
          com todos os seus
          <span> amigos</span>!
        </Description>

        <Link href="/login">
          <BackToLogin>
            <ArrowLeftIcon />
            Voltar para o login
          </BackToLogin>
        </Link>
      </LeftSide>
    </Container>
  );
};

export default CreateAccount;
