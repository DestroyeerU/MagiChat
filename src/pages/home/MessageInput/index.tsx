import React, { useCallback, useMemo, useRef } from 'react';

import { Container, StyledMessageInput } from './styles';
import { convertInnerHtmlToText } from './utils';

type KeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

interface OwnProps {
  handleSubmit?: (value: string) => void;
}

type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'width'>;
type Props = OwnProps & InputAttributes;

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

  return (
    <Container>
      <StyledMessageInput
        ref={inputRef}
        onKeyDown={handleKeyDown}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
};

export default MessageInput;
