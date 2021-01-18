/* eslint-disable no-alert */
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { Conversation } from '@mytypes/conversation';
import { DefaultRequestError } from '@mytypes/request';
import { useConversation } from 'src/contexts/conversation';
import { useSocket } from 'src/contexts/socket';
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

  const socketConnection = useSocket();
  const conversationContext = useConversation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handleConfirmClick = useCallback(async () => {
    const validationError = await validateSchema(schema, { email });

    if (validationError) {
      setError(validationError.message);
      return;
    }

    socketConnection.socket.emit('create-conversation-request', {
      toUserEmail: email,
    });
  }, [email, socketConnection.socket]);

  const handleCancelClick = useCallback(() => {
    setError('');
    setEmail('');
    modalRef.current.handleClose();
  }, [modalRef]);

  const handleConversationResponse = useCallback(
    (_conversation: Conversation) => {
      setError('');
      setEmail('');
      modalRef.current.handleClose();
    },
    [modalRef]
  );

  const handleConversationError = useCallback((socketError: DefaultRequestError) => {
    setError(socketError.message);
  }, []);

  useEffect(() => {
    if (!socketConnection.connectionStarted) {
      return () => {
        //
      };
    }

    socketConnection.socket.on('create-conversation-response', handleConversationResponse);
    socketConnection.socket.on('create-conversation-error', handleConversationError);
    socketConnection.socket.on('create-conversation-response', conversationContext.handleAddConversation);

    return () => {
      socketConnection.socket.off('create-conversation-response', handleConversationResponse);
      socketConnection.socket.off('create-conversation-error', handleConversationError);
      socketConnection.socket.off('create-conversation-response', conversationContext.handleAddConversation);
    };
  }, [
    conversationContext.handleAddConversation,
    handleConversationError,
    handleConversationResponse,
    socketConnection,
  ]);

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
