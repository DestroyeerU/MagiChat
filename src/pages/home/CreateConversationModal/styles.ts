import styled from 'styled-components';

import { DefaultButton } from '@components/Buttons';
import { StyledInput } from '@components/Input/styles';

export const Container = styled.div`
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.home.background};
  box-shadow: 0 4px 20px 4px ${(props) => props.theme.colors.shadow};
`;

export const Header = styled.header`
  padding: 20px;

  border-bottom: 1px solid ${(props) => props.theme.colors.darkLighten};
`;

export const HeaderTitle = styled.h4`
  font-size: 2rem;
  font-weight: 500;

  color: ${(props) => props.theme.colors.white};
`;

export const Body = styled.div`
  padding: 20px 20px 60px;
`;

export const BodyMessage = styled.p`
  font-size: 1.7rem;
  font-weight: 400;
`;

export const BodyInput = styled(StyledInput)`
  margin-top: 23px;
  padding: 12px 20px;
`;

interface BodyInputErrorProps {
  visibilityVisible: boolean;
}

export const BodyInputError = styled.span<BodyInputErrorProps>`
  margin-top: 2px;

  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.red};

  visibility: ${(props) => (props.visibilityVisible ? 'visible' : 'hidden')};
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 15px 22px;

  border-top: 1px solid ${(props) => props.theme.colors.stroke};
  background-color: ${(props) => props.theme.colors.home.header};
`;

export const FooterCancel = styled.span`
  margin-right: 24px;

  font-size: 1.8rem;
  font-weight: 400;

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const FooterConfirm = styled(DefaultButton)`
  width: 150px;
  height: 42px;

  font-size: 1.6rem;
`;
