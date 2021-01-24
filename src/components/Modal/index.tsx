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
  const [visible, setVisible] = useState(false);
  const [lastAnimationName, setLastAnimationName] = useState('');

  const handleOpen = useCallback(() => {
    if (visible) return;
    if (onOpen) onOpen();

    setVisible(true);

    if (!containerRef.current.classList.contains('active')) {
      containerRef.current.classList.add('active');
      containerRef.current.classList.remove('no-active');

      setLastAnimationName('active');
    }
  }, [onOpen, visible]);

  const handleClose = useCallback(() => {
    if (!visible) return;
    if (onClose) onClose();

    if (!containerRef.current.classList.contains('no-active')) {
      containerRef.current.classList.add('no-active');
      containerRef.current.classList.remove('active');

      setLastAnimationName('no-active');
    }
  }, [onClose, visible]);

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
    containerRef.current.addEventListener('animationend', handleAnimationEnd);

    return () => {
      containerCurrent.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [handleAnimationEnd, lastAnimationName]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, visible]);

  useImperativeHandle(ref, () => ({
    isOpen: visible,
    handleOpen,
    handleClose,
  }));

  return <Container ref={containerRef}>{children}</Container>;
};

export default forwardRef(Modal);
