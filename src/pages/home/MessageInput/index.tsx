import React, { useCallback, useMemo, useRef } from 'react';

import { convertInnerHtmlToText } from '@utils/html';

import { Container, StyledMessageInput } from './styles';

type KeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

interface OwnProps {
  handleSubmit?: (value: string) => void;
}

type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'width'>;
type Props = OwnProps & InputAttributes;

function moveCursorToEnd() {
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();
}

const MessageInput: React.FC<Props> = ({ handleSubmit, placeholder, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>();

  const actions = useMemo(() => {
    function Enter(_event: KeyDownEvent) {
      //
    }

    function ShiftEnter(event: KeyDownEvent) {
      event.preventDefault();

      if (handleSubmit) {
        const text = convertInnerHtmlToText(inputRef.current.innerHTML);

        handleSubmit(text);
        inputRef.current.textContent = '';
      }
    }

    return {
      Enter,
      ShiftEnter,
    };
  }, [handleSubmit]);

  const handleKeyDown = useCallback(
    (event: KeyDownEvent) => {
      function getKeyCompleteName() {
        if (event.shiftKey) {
          return `Shift${event.key}`;
        }

        return event.key;
      }

      function callKeyFunctionIfExists(key: string) {
        if (key in actions) {
          actions[key](event);
        }
      }

      const key = getKeyCompleteName();
      callKeyFunctionIfExists(key);
    },
    [actions]
  );

  const handleCopy = useCallback((event: React.ClipboardEvent) => {
    event.preventDefault();

    const text = convertInnerHtmlToText(inputRef.current.innerHTML);

    event.clipboardData.setData('text', text);
  }, []);

  const handleCut = useCallback((event: React.ClipboardEvent) => {
    event.preventDefault();

    const text = convertInnerHtmlToText(inputRef.current.innerHTML);
    inputRef.current.innerHTML = '';

    event.clipboardData.setData('text/plain', text);
  }, []);

  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');

    function isAllTextSelected() {
      return document.getSelection().toString() === text;
    }

    if (!isAllTextSelected()) {
      inputRef.current.innerHTML += text;
    }

    moveCursorToEnd();
  }, []);

  const handleFocus = useCallback(() => {
    moveCursorToEnd();
  }, []);

  return (
    <Container>
      <StyledMessageInput
        ref={inputRef}
        data-placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        onFocus={handleFocus}
        contentEditable
        suppressContentEditableWarning
        {...rest}
      />
    </Container>
  );
};

export default MessageInput;
