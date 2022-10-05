import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const PowerDownTabWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  color: ${colors.textColorSecondary};
  ${breakpoint.sm} {
    flex-direction: column;
  }
  ul {
    padding-inline-start: 15px;
    margin-bottom: 0;
  }
`;

export const PowerDownTabIntro = styled.div`
  margin: 0 auto 25px;
  padding: 0 25px;
  ${breakpoint.sm} {
    margin: 0 auto 0;
    padding: 20px 35px;
  }
  ul {
    font-size: 12px;
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

export const PowerDownTabIntroHeading = styled.p`
  font-size: 16px;
  color: ${colors.textColor};
`;

export const PowerDownTabIntroParagraph = styled.p`
  font-size: 12px;
`;
