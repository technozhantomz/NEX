import { styled, Button as UiButton } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetActionButton = styled(UiButton)`
   {
    padding: 0px;
    background-color: ${colors.primaryColor};
    color: ${colors.white};
    height: 25px !important;
    min-height: 25px !important;
    margin-right: 16px;
    min-width: 90px;
    &:hover,
    &:active {
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    }
  }
`;
