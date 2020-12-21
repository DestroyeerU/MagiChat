import React, { forwardRef } from 'react';

import DefaultInput, { InputProps, InputRef } from '../DefaultInput';
import { StyledInput } from './styles';

const Input = (props: InputProps, ref: InputRef) => {
  return <DefaultInput ref={ref} {...props} input={StyledInput} />;
};

export default forwardRef(Input);
