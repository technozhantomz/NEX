import { styled, Button as UiButton } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const AssetActionButton = styled(UiButton)`
   {
    padding: 0px;
    background-color: #e3ebf8;
    max-height: 35px;
    min-width: 90px;
    &:hover,
    &:active {
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    }
    ${breakpoint.sm} {
      max-height: 25px;
    }
  }
`;
