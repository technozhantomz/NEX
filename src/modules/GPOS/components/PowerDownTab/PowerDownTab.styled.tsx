import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const PowerDownTabWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  color: ${colors.textColorSecondary};
  font-size: 17px;
  letter-spacing: 0px;
  ${breakpoint.sm} {
    flex-direction: column;
  }
  ul {
    padding-inline-start: 25px;
  }
`;

export const PowerDownTabIntro = styled.div`
  padding: 0 25px;
  ${breakpoint.sm} {
    padding: 35px;
  }
`;
export const PowerDownTabFormWrapper = styled.div`
  padding: 25px;
  margin-bottom: 25px;
  ${mixIns.hairline}
  ${breakpoint.sm} {
    padding: 0 35px;
    max-width: 610px;
    border: none;
  }
`;
