import { Form as Unform } from '@unform/web';
import styled from 'styled-components';
import { useSize, Size } from '../../../hooks/styled';

export type StyledFormProps = Size;

export const StyledForm = styled(Unform)`
  ${useSize};
`;
