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
  ${breakpoint.sm} {
    width: 100%;
    margin: 0 0 26px 0;
    padding: 35px 0 24px 24px;
    ${mixIns.hairline}
  }
`;

export const GPOSContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  ${breakpoint.sm} {
    flex-direction: row;
    margin: 0 0 24px 24px;
  }
`;

export const GPOSContentInfo = styled.div`
  width: 85%;
  margin: 25px auto;
  ${breakpoint.sm} {
    max-width: 266px;
    width: 100%;
    margin: 0 40px 0 0;
  }
`;

export const GPOSContentInfoDetails = styled.div`
  ${mixIns.hairline}
  ul li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

export const GPOSContentInfoDetailsTitle = styled.span``;
export const GPOSContentInfoDetailsValue = styled.span`
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

export const GPOSContentInfoTotal = styled.div`
  ${mixIns.hairline}
`;

export const GPOSContentInfoTotalTitle = styled.p`
  margin: 25px 0 10px;
  font-size: 17px;
  font-weight: normal;
`;

export const GPOSContentInfoTotalValue = styled.p`
  color: ${colors.textColor};
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

export const GPOSContentActions = styled.div`
  ${mixIns.hairline}
  width: 100%;
  margin-top: 25px;
  ${breakpoint.sm} {
    border: none;
    max-width: 435px;
    margin: 0;
  }
`;

export const GPOSTButton = styled(CardFormButton)`
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
