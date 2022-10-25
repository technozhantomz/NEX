import { styled, Button as UiButton } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const AssetActionButton = styled(UiButton)`
   {
    padding: 0px;
    background-color: ${colors.primaryColor};
    color: ${colors.white};
    max-height: 35px;
    min-width: 90px;
    font-size: 12px;
    &:hover,
    &:active {
      background-color: #015ef4;
      color: ${colors.white};
    }
    ${breakpoint.sm} {
      min-height: 25px;
      margin: 0px 15px;
    }
  }
`;
