import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const ProxyTabWrapper = styled.div``;
export const ProxyIntroWrapper = styled.div`
  margin: 25px;
  ${breakpoint.sm} {
    margin: 35px;
  }
`;
export const ProxyInfoLink = styled.div`
  .anticon {
    color: ${colors.warningColor};
    margin-right: 15px;
  }
`;
