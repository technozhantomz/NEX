import { Card, Form, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const ConnectCard = styled(Card)`
  min-height: 291px;
  ${mixIns.borderRadius}
  margin: 0 auto;
  .ant-card-body {
    padding: 25px 15px 45px;
  }
  ${breakpoint.sm} {
    .ant-card-body {
      padding: 30px;
    }
  }
`;
export const ConnectForm = styled(Form)``;
export const ConnectButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 37px;
  ${breakpoint.md} {
    flex-direction: row;
  }
`;
export const ConnectButton = styled.button`
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  padding: 20px 29px;
  margin: 10px 0;
  text-align: left;
  &.required {
    background-color: ${colors.white};
  }
  &.connected {
    background-color: ${colors.inactiveColor};
  }
  .anticon {
    font-size: 20px;
  }
  .anticon-right {
  }
  .anticon-check {
    color: ${colors.successColor};
  }
`;
export const ConnectButtonTextWrapper = styled.div`
  margin: 0 20px 0 24px;
`;
export const ConnectButtonTitle = styled.p`
  font-size: 15px;
  font-weight: 400;
  margin: 0;
`;
export const ConnectButtonStatus = styled.p`
  margin: 0;
  &.required {
    color: ${colors.errorColor};
  }
  &.connected {
    color: ${colors.successColor};
  }
`;
export const ConnectInfoWrapper = styled.div``;
export const ConnectInfo = styled.p`
  display: flex;
  align-items: flex-start;
  justify-content; space-between;
  color: ${colors.textColorSecondary};
  margin: 15px;
  .anticon {
    font-size: 20px;
    color: ${colors.warningColor};
    margin-right: 15px;
  }
`;
export const ConnectDownloads = styled.div`
  text-align: center;
  margin: 25px auto 0;
`;
