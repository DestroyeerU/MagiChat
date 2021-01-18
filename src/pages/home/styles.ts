import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;

  background-color: ${(props) => props.theme.colors.home.chat.background};
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 350px;

  background-color: ${(props) => props.theme.colors.home.background};
`;

export const LeftSideHeader = styled.header`
  display: flex;
  align-items: center;

  min-height: 63px;
  max-height: 63px;

  padding: 0 14px;

  background-color: ${(props) => props.theme.colors.home.header};
  border-bottom: 2px solid ${(props) => props.theme.colors.stroke};

  svg {
    cursor: pointer;

    &:nth-child(2) {
      margin-left: auto;
      margin-right: 16px;
    }
  }
`;

export const LeftSideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  border-right: 1px solid ${(props) => props.theme.colors.stroke};
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 330px;

  margin: 8px auto;
  padding: 14px 20px;

  border-radius: 8px;

  font-size: 1.6rem;
  font-weight: 400;

  border: 1px solid ${(props) => props.theme.colors.stroke};

  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.home.searchInput};

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export const Divider = styled.hr`
  width: 100%;
  max-width: 320px;

  height: 1px;
  background-color: ${(props) => props.theme.colors.divider};
`;

// Right Side

interface RightSideProps {
  visible?: boolean;
}

export const RightSide = styled.div<RightSideProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-bottom: 27px;

  display: ${(props) => !props?.visible && 'none'};
`;

export const RightSideHeader = styled.header`
  display: flex;
  align-items: center;

  min-height: 63px;
  max-height: 63px;

  background-color: ${(props) => props.theme.colors.home.header};
  border-bottom: 2px solid ${(props) => props.theme.colors.stroke};
`;

export const RightSideHeaderUsername = styled.p`
  margin-left: 13px;

  font-size: 1.6rem;
  font-weight: 500;
`;

export const RightSideHeaderDivider = styled.hr`
  width: 1px;
  height: 36px;

  background-color: ${(props) => props.theme.colors.divider};
`;
