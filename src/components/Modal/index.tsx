import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Container } from './styles';

export interface ModalHandles {
  handleOpen: () => void;
  handleClose: () => void;
}

const Modal = (_props, ref: React.Ref<ModalHandles>) => {
  const containerRef = useRef<HTMLDivElement>();
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

  useEffect(() => {
    const containerCurrent = containerRef.current;
    containerRef.current.addEventListener('animationend', handleAnimationEnd);

    return () => {
      containerCurrent.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [handleAnimationEnd, lastAnimationName]);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  // if (!visible) {
  //   return null;
  // }

  return <Container ref={containerRef} />;
};

export default forwardRef(Modal);
