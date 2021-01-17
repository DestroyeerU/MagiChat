import React, { useCallback, useMemo, useRef } from 'react';

import { Container, StyledMessageInput } from './styles';
import { convertInnerHtmlToText } from './utils';

type KeyDownEvent = React.KeyboardEvent<HTMLInputElement>;

interface LastKeyDownState {
  key: string;
  time: number;
}

interface OwnProps {
  handleSubmit?: (value: string) => void;
}

type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'width'>;
type Props = OwnProps & InputAttributes;

const keyDownDeltaTime = 300;

const MessageInput: React.FC<Props> = ({ handleSubmit, placeholder, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>();
  const lastKeyDown = useRef({} as LastKeyDownState);

  const actions = useMemo(() => {
    function Enter(_event: KeyDownEvent) {
      //
    }

    function ShiftEnter(event: KeyDownEvent) {
      event.preventDefault();

      if (handleSubmit) {
        // [to-do] copy, past, cut
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
      // [to-do] key press

      const keyDownTime = new Date().getTime();

      function getKeyCompleteName() {
        if (keyDownTime - lastKeyDown.current.time <= keyDownDeltaTime) {
          const keyFunctionName = lastKeyDown.current.key + event.key;

          return keyFunctionName;
        }

        return event.key;
      }

      function callKeyFunctionIfExists(key: string) {
        if (key in actions) {
          actions[key](event);
        }
      }

      function updateLastKeyDown(key: string) {
        lastKeyDown.current = {
          key,
          time: keyDownTime,
        };
      }

      const key = getKeyCompleteName();
      callKeyFunctionIfExists(key);
      updateLastKeyDown(key);
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
