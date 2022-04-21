import { CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const GPOSTabWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${breakpoint.sm} {
    flex-direction: column;
  }
`;

export const GPOSIntro = styled.div``;

export const GPOSContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  ${breakpoint.sm} {
    flex-direction: row;
  }
`;
export const GPOSContentInfo = styled.div`
  max-width: 266px;
  width: 100%;
  ${breakpoint.sm} {
    margin-right: 40px;
  }
`;
export const GPOSContentActions = styled.div`
  ${mixIns.hairline}
  width: 100%;
  ${breakpoint.sm} {
    max-width: 435px;
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
