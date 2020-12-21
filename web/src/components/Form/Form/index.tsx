/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, forwardRef } from 'react';

import { SubmitHandler, FormHandles, FormProps as UnformProps } from '@unform/core';
import * as Yup from 'yup';

import { StyledForm, StyledFormProps } from './styles';
import { useSafeRef } from '../../../hooks/native';

export declare type FormPros = FormHandles;

interface OwnProps {
  children?: React.ReactNode;
  onSubmit: (data: object) => void;
  schema?: any;
  keepErros?: boolean;
}

type Props = OwnProps & StyledFormProps & Omit<UnformProps, 'onSubmit' | 'ref'>;
type Ref = React.Ref<FormHandles>;

const Form = ({ children, schema, onSubmit, keepErros, ...rest }: Props, ref: Ref) => {
  const formRef = useSafeRef(ref);

  const setErrorsMessages = useCallback(
    (err: Yup.ValidationError) => {
      const errorMessages = {} as { [key: string]: string };

      err.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });

      if (formRef.current) {
        formRef.current.setErrors(errorMessages);
      }
    },
    [formRef]
  );

  const handleSubmit: SubmitHandler<object> = useCallback(
    (data) => {
      // (data, { reset }) => {
      async function validateFields() {
        try {
          await schema?.validate(data, {
            abortEarly: false,
          });

          onSubmit(data);

          if (!keepErros && formRef.current) {
            formRef.current.setErrors({});
          }
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            setErrorsMessages(err);
          }
        }
      }

      validateFields();
    },
    [formRef, keepErros, onSubmit, schema, setErrorsMessages]
  );

  return (
    <StyledForm ref={formRef} onSubmit={handleSubmit} {...rest}>
      {children}
    </StyledForm>
  );
};

export default forwardRef(Form);
