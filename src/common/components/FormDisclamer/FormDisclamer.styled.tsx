import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const Disclamer = styled.p`
   {
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 14px;
    }
    font-weight: 300;
    text-align: center;
    margin-bottom: 0;
    color: ${colors.textColor};
  }
`;
