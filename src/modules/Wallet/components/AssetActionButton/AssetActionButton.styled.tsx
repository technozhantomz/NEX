import { styled, Button as UiButton } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetActionButton = styled(UiButton)`
   {
    padding: 0px;
    background-color: #e3ebf8;
    max-height: 25px;
    min-width: 90px;
    &:hover,
    &:active {
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    }
  }
`;
