import styled, { css } from 'styled-components';
import { Margin, useMargin } from '../../../hooks/styled';

interface SharedProps {
  invalid?: number;
}

export interface StyledInputProps {
  gone?: boolean;
}

export type ContainerProps = SharedProps & Margin;

type LabelProps = SharedProps;

export const Container = styled.div<ContainerProps>`
  padding-top: 5px;
  padding-bottom: 5px;

  ${useMargin};
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;

  padding-right: 12px;

  border-radius: 5px;
  border: 1px solid #ced4da;

  background: #fff;
`;

export const StyledInputCSS = (props: StyledInputProps) => css`
  width: 100%;

  padding: 8px 12px;

  border-radius: 5px;
  border: 1px solid #ced4da;

  color: #333;
  background: #fff;

  ${props.gone &&
  css`
    border-width: 0;
    outline: 0;
  `}
`;

export const Label = styled.span<LabelProps>`
  margin-top: ${(props) => (props.invalid === 1 ? '0px' : '10px')};

  font-size: 14px;
`;

export const Error = styled.span`
  font-size: 13px;
  font-weight: 300;

  color: #ff1111;
`;
