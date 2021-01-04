import React, { forwardRef, useCallback, useState } from 'react';

import * as Yup from 'yup';

import Modal, { ModalHandles } from '@components/Modal';

import { useSafeRef } from '@hooks/native';

import { validateSchema } from '@utils/form';

import {
  Body,
  BodyInput,
  BodyInputError,
  BodyMessage,
  Container,
  Footer,
  FooterCancel,
  FooterConfirm,
  Header,
  HeaderTitle,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('You must enter a email'),
});

const CreateConversationModal: React.ForwardRefRenderFunction<ModalHandles> = (_props, ref) => {
  const modalRef = useSafeRef(ref);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handleConfirmClick = useCallback(async () => {
    const validationError = await validateSchema(schema, { email });

    setError(validationError.message);
  }, [email]);

  const handleCancelClick = useCallback(() => {
    modalRef.current.handleClose();
  }, [modalRef]);

  return (
    <Modal ref={modalRef}>
      <Container>
        <Header>
          <HeaderTitle>Create Conversation</HeaderTitle>
        </Header>

        <Body>
          <BodyMessage>Enter with the user email that you want to start chatting</BodyMessage>
          <BodyInput placeholder="Enter email" onChange={handleInputChange} />
          <BodyInputError visibilityVisible={Boolean(error)}>{error || 'Error here'}</BodyInputError>
        </Body>

        <Footer>
          <FooterCancel onClick={handleCancelClick}>Cancel</FooterCancel>
          <FooterConfirm onClick={handleConfirmClick}>Start Chatting</FooterConfirm>
        </Footer>
      </Container>
    </Modal>
  );
};

export default forwardRef(CreateConversationModal);
