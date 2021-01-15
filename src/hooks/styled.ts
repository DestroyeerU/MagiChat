import { css } from 'styled-components';

import { margin, pxNumber } from '@utils/styled';

export interface Margin {
  marginTop?: number | 'auto';
  marginBottom?: number | 'auto';

  marginRight?: number | 'auto';
  marginLeft?: number | 'auto';
}

export interface Size {
  width?: number;
  height?: number;
}

export const useMargin = (props: Margin) => css`
  margin-top: ${margin(props.marginTop)};
  margin-bottom: ${margin(props.marginBottom)};

  margin-right: ${margin(props.marginRight)};
  margin-left: ${margin(props.marginLeft)};
`;

export const useSize = (props: Size) => css`
  width: ${props.width && '100%'};
  max-width: ${pxNumber(props.width)};

  height: ${props.height && '100%'};
  max-height: ${pxNumber(props.height)};
`;
