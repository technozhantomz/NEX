import { CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

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
export const GPOSContentInfo = styled.div``;
export const GPOSContentActions = styled.div`
`;
export const GPOSTButton = styled(CardFormButton)``;
