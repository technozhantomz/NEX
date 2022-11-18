import { CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const GPOSTabWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  color: ${colors.textColorSecondary};
  font-size: 17px;
  letter-spacing: 0px;
  ${breakpoint.sm} {
    flex-direction: column;
  }
  ul {
    list-style: none;
    padding-inline-start: 0;
  }
`;

export const GPOSIntro = styled.div`
  width: 85%;
  margin: 0 auto 25px;
  p,
  li,
  a {
    font-size: 12px;
  }
  ${breakpoint.sm} {
    width: 100%;
    margin: 0 0 26px 0;
    padding: 35px 24px 24px 24px;
    ${mixIns.hairline}
  }
`;

export const GPOSContentWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${breakpoint.sm} {
    flex-direction: row;
    margin: 0 0 24px 24px;
  }
`;

export const GPOSContent = styled.div`
  width: 85%;
  margin: 25px auto;
  ${breakpoint.sm} {
    max-width: 300px;
    width: 100%;
    margin: 0 40px 0 0;
  }
`;

export const GPOSDetails = styled.div`
  ${mixIns.hairline}
  ul li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  ul li span {
    margin-right: 5px;
  }
`;

export const GPOSDetailsTitle = styled.span`
  font-size: 12px;
`;
export const GPOSDetailsValue = styled.span`
  font-size: 12px;
  word-break: break-all;
  color: ${colors.textColor};
  font-weight: normal;
  &.max-rewards,
  &.great-rewards,
  &.good-Rewards,
  &.ok-rewards {
    color: #b8f4c9;
  }
  &.low-rewards,
  &.lower-rewards,
  &.critical-low {
    color: #ff903e;
  }
  &.no-rewards {
    color: #e2444d;
  }
`;

export const GPOSTotal = styled.div`
  ${mixIns.hairline}
`;

export const GPOSTotalTitle = styled.p`
  margin: 25px 0 10px;
  font-size: 14px;
  font-weight: normal;
`;

export const GPOSTotalValue = styled.p`
  color: ${colors.textColor};
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 500;
`;

export const GPOSActions = styled.div`
  ${mixIns.hairline}
  width: 100%;
  margin-top: 25px;
  ${breakpoint.sm} {
    border: none;
    max-width: 435px;
    margin: 0;
    margin-right: 10px;
  }
`;

export const GPOSButton = styled(CardFormButton)`
  margin-bottom: 15px;
  &.ant-btn-text {
    margin-top: 5px;
    color: ${colors.linkColor};
  }

  ${breakpoint.sm} {
    width: 100%;
    margin-bottom: 25px;
    &.ant-btn-text {
      margin-top: 10px;
    }
  }
`;
