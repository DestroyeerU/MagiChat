import React, { forwardRef } from 'react';

import DefaultInput, { InputProps, InputRef } from '../Form/DefaultInput';
import { StyledInput } from './styles';

const Input = (props: InputProps, ref: InputRef) => {
  return <DefaultInput ref={ref} {...props} as={StyledInput} />;
};

export default forwardRef(Input);
