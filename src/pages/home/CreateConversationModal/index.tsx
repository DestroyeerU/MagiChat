import React, { forwardRef, useCallback } from 'react';

import Modal, { ModalHandles } from '@components/Modal';

import { useSafeRef } from '@hooks/native';

import {
  Body,
  BodyInput,
  BodyMessage,
  Container,
  Footer,
  FooterCancel,
  FooterConfirm,
  Header,
  HeaderTitle,
} from './styles';

const CreateConversationModal: React.ForwardRefRenderFunction<ModalHandles> = (_props, ref) => {
  const modalRef = useSafeRef(ref);

  const handleConfirmClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Confirm');
  }, []);

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
          <BodyInput placeholder="Enter email" />
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
