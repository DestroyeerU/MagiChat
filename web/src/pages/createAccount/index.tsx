/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useRef } from 'react';

import { FormHandles } from '@unform/core';
import Link from 'next/link';
import * as Yup from 'yup';

import { LoginButton } from '@components/Buttons';
import { InputHandles } from '@components/Form/DefaultInput';
import Form from '@components/Form/Form';
import Input from '@components/Input';

import ArrowLeftIcon from './assets/arrow-left.svg';
import { Container, LeftSide, StyledForm, FormTitle, Title, Description, BackToLogin } from './styles';

interface FormSubmitData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string().email('Email inválido').required('Este campo é obrigatório'),
  password: Yup.string().required('Este campo é obrigatório'),
  passwordConfirmation: Yup.string().required('Este campo é obrigatório'),
});

const CreateAccount: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<InputHandles>(null);
  const emailInputRef = useRef<InputHandles>(null);
  const passwordInputRef = useRef<InputHandles>(null);
  const passwordConfirmationInputRef = useRef<InputHandles>(null);

  const handleFormSubmit = useCallback((data: FormSubmitData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, []);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  return (
    <Container>
      <Form ref={formRef} as={StyledForm} onSubmit={handleFormSubmit} schema={schema}>
        <FormTitle>Crie sua conta</FormTitle>

        <Input ref={nameInputRef} name="name" placeholder="Digite seu nome" autoFocus />
        <Input ref={emailInputRef} name="email" placeholder="Digite seu email" />
        <Input ref={passwordInputRef} name="password" placeholder="Digite sua senha" type="password" />
        <Input
          ref={passwordConfirmationInputRef}
          name="passwordConfirmation"
          placeholder="Confirmação de senha"
          type="password"
        />

        <LoginButton type="submit">CADASTRAR</LoginButton>
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
