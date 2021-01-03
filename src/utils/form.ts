import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

export async function validateSchema(schema: Yup.ObjectSchema, data: any) {
  try {
    await schema?.validate(data, {
      abortEarly: false,
    });

    return undefined;
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return err;
    }

    return undefined;
  }
}

export function setErrorsMessages(formRef: React.RefObject<FormHandles>, err: Yup.ValidationError) {
  const errorMessages = {} as { [key: string]: string };

  err.inner.forEach((error) => {
    errorMessages[error.path] = error.message;
  });

  if (formRef.current) {
    formRef.current.setErrors(errorMessages);
  }
}
