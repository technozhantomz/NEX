import { styled, List as UiList } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetTitle = styled(UiList.Item.Meta)`
  .asset-symbol {
    color: ${colors.textColorSecondary};
  }
`;
