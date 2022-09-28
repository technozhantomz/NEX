import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const ProxyTabWrapper = styled.div`
  padding: 10px 0;
`;

export const ProxyIntroWrapper = styled.div`
  margin: 0 25px;
  ${breakpoint.sm} {
    margin: 0 35px;
  }
`;

export const ProxyTitle = styled.h2`
  font-size: 14px;
  ${breakpoint.sm} {
    font-size: 20px;
  }
  margin-bottom: 25px;
  .anticon-info-circle {
    margin: 0 15px;
    color: ${colors.warningColor};
  }
  a {
    font: normal normal normal 14px/40px Inter;
    letter-spacing: 0px;
    opacity: 1;
  }
`;

export const ProxyInfoLink = styled.div`
  .anticon {
    color: ${colors.warningColor};
    margin-right: 15px;
  }
`;
