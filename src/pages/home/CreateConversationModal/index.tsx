import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { useConversation } from '@contexts/conversation';
import { useSocket } from '@contexts/socket';
import * as Yup from 'yup';

import { Conversation } from '@mytypes/conversation';
import { DefaultRequestError } from '@mytypes/request';

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

type Modal = React.ForwardRefRenderFunction<ModalHandles>;
const CreateConversationModal: Modal = (_props, ref) => {
  const socketConnection = useSocket();
  const { createConversationRequest } = useConversation();

  const modalRef = useSafeRef<ModalHandles>(ref);
  const emailRef = useRef<HTMLInputElement>();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleOpen = useCallback(() => {
    emailRef.current.focus();
  }, []);

  const handleClose = useCallback(() => {
    setEmail('');
    setError('');

    modalRef.current.handleClose();
  }, [modalRef]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handleConfirmClick = useCallback(async () => {
    const validationError = await validateSchema(schema, { email });

    if (validationError) {
      setError(validationError.message);
      return;
    }

    createConversationRequest({
      toUserEmail: email,
    });

    handleClose();
  }, [createConversationRequest, email, handleClose]);

  const handleConversationResponse = useCallback(
    (_conversation: Conversation) => {
      handleClose();
    },
    [handleClose]
  );

  const handleConversationError = useCallback((socketError: DefaultRequestError) => {
    setError(socketError.message);
  }, []);

  useEffect(() => {
    if (!socketConnection.connectionStarted) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    socketConnection.on('create-conversation-response', handleConversationResponse);
    socketConnection.on('create-conversation-error', handleConversationError);

    return () => {
      socketConnection.off('create-conversation-response', handleConversationResponse);
      socketConnection.off('create-conversation-error', handleConversationError);
    };
  }, [handleConversationError, handleConversationResponse, socketConnection]);

  return (
    <Modal ref={modalRef} onOpen={handleOpen} onClose={handleClose} onEnterClick={handleConfirmClick}>
      <Container>
        <Header>
          <HeaderTitle>Create Conversation</HeaderTitle>
        </Header>

        <Body>
          <BodyMessage>Enter with the user email that you want to start chatting</BodyMessage>
          <BodyInput ref={emailRef} value={email} placeholder="Enter email" onChange={handleInputChange} />
          <BodyInputError visibilityVisible={Boolean(error)}>{error || 'Error here'}</BodyInputError>
        </Body>

        <Footer>
          <FooterCancel onClick={handleClose}>Cancel</FooterCancel>
          <FooterConfirm onClick={handleConfirmClick}>Start Chatting</FooterConfirm>
        </Footer>
      </Container>
    </Modal>
  );
};

export default forwardRef(CreateConversationModal);
