import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import DefaultInput, { InputProps, InputRef } from '../Form/DefaultInput';
import EyeOff from './assets/eye-off.svg';
import Eye from './assets/eye.svg';
import { InputContainer, StyledInput } from './styles';

const PasswordInput = (props: InputProps, ref: InputRef) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputContainerClass, setInputContainerClass] = useState('');

  const handleFocus = useCallback(() => {
    setInputContainerClass('focus');
  }, []);

  const handleBlur = useCallback(() => {
    setInputContainerClass('');
  }, []);

  const handleEyeClick = useCallback(() => {
    setShowPassword((oldShowPassword) => !oldShowPassword);
  }, []);

  const inputType = useMemo(() => {
    if (showPassword) {
      return 'text';
    }

    return 'password';
  }, [showPassword]);

  return (
    <InputContainer className={inputContainerClass}>
      <DefaultInput ref={ref} {...props} as={StyledInput} type={inputType} onFocus={handleFocus} onBlur={handleBlur} />

      {showPassword && <EyeOff onClick={handleEyeClick} />}
      {!showPassword && <Eye onClick={handleEyeClick} />}
    </InputContainer>
  );
};

export default forwardRef(PasswordInput);
