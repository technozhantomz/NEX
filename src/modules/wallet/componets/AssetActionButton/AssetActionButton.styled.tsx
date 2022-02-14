import { styled, Button as UiButton } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetActionButton = styled(UiButton)`
   {
    padding: 5px 21px;
    background-color: #e3ebf8;
    &:hover,
    &:active {
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    }
  }
`;
