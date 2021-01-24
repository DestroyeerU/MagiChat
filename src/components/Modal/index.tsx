import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Container } from './styles';

export interface ModalHandles {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface ModalProps {
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  onEnterClick?: () => void;
}

type ModalComponent = React.ForwardRefRenderFunction<ModalHandles, ModalProps>;
const Modal: ModalComponent = ({ children, onOpen, onClose, onEnterClick }, ref) => {
  const containerRef = useRef<HTMLDivElement>();
  const opened = useRef(false);

  const [visible, setVisible] = useState(false);
  const [lastAnimationName, setLastAnimationName] = useState('');

  const handleOpen = useCallback(() => {
    if (visible) return;
    setVisible(true);

    if (!containerRef.current.classList.contains('active')) {
      containerRef.current.classList.add('active');
      containerRef.current.classList.remove('no-active');

      setLastAnimationName('active');
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    if (!visible) return;

    if (!containerRef.current.classList.contains('no-active')) {
      containerRef.current.classList.add('no-active');
      containerRef.current.classList.remove('active');

      setLastAnimationName('no-active');
    }
  }, [visible]);

  const handleAnimationEnd = useCallback(() => {
    if (lastAnimationName === 'no-active') {
      setVisible(false);

      containerRef.current.classList.remove('active');
      containerRef.current.classList.remove('no-active');
    }
  }, [lastAnimationName]);

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      const { key } = event;

      const actions = {
        Escape: () => handleClose && handleClose(),
        Enter: () => onEnterClick && onEnterClick(),
      };

      if (key in actions) {
        await actions[key]();
      }
    },
    [handleClose, onEnterClick]
  );

  useEffect(() => {
    const containerCurrent = containerRef.current;
    containerCurrent.addEventListener('animationend', handleAnimationEnd);

    return () => {
      containerCurrent.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [handleAnimationEnd, lastAnimationName]);

  useEffect(() => {
    function handleVisibleOn() {
      if (opened.current) return;

      if (onOpen) onOpen();
      opened.current = true;
    }

    function handleVisibleOff() {
      if (!opened.current) return;

      if (onClose) onClose();
      opened.current = false;
    }

    if (visible) {
      handleVisibleOn();
      document.addEventListener('keydown', handleKeyDown);
    } else {
      handleVisibleOff();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, onClose, onOpen, visible]);

  useImperativeHandle(ref, () => ({
    isOpen: visible,
    handleOpen,
    handleClose,
  }));

  return <Container ref={containerRef}>{children}</Container>;
};

export default forwardRef(Modal);
