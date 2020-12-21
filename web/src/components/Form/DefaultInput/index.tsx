import React, { useEffect, forwardRef } from 'react';

import { useField } from '@unform/core';

import { Container, ContainerProps, Error, Label, InnerContainer } from './styles';
import { useSafeRef } from '../../../hooks/native';

type InputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'width'>;

interface OwnProps {
  name: string;
  label?: string;
  input: any;
  icon?: any;
  onIconClick?: () => void;
}

type DefaultInputProps = OwnProps & ContainerProps & InputAttributes;
export type InputProps = Omit<DefaultInputProps, 'icon'>;
export type InputRef = React.Ref<HTMLInputElement>;

const DefaultInput = (
  {
    name,
    input: InputComponent,
    label,
    type,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    icon: Icon,
    onIconClick,
    ...rest
  }: DefaultInputProps,
  ref: InputRef
) => {
  const inputRef = useSafeRef(ref);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: type === 'checkbox' ? 'checked' : 'value',
    });
  }, [fieldName, inputRef, registerField, type]);

  return (
    <Container marginTop={marginTop} marginBottom={marginBottom} marginLeft={marginLeft} marginRight={marginRight}>
      {label ? <Label invalid={error ? 1 : 0}>{label}</Label> : null}

      {Icon !== undefined ? (
        <InnerContainer>
          <InputComponent
            ref={inputRef}
            defaultValue={defaultValue}
            defaultChecked={defaultValue}
            gone
            type={type}
            {...rest}
          />

          <Icon onClick={onIconClick} />
        </InnerContainer>
      ) : (
        <InputComponent
          ref={inputRef}
          defaultValue={defaultValue}
          defaultChecked={defaultValue}
          type={type}
          {...rest}
        />
      )}

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default forwardRef(DefaultInput);
