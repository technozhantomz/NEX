import { styled, List as UiList } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetTitle = styled(UiList.Item.Meta)`{
  align-items: center;
  .ant-list-item-meta-avatar{
    margin-right: 10px;
  }
  .ant-list-item-meta-content {
    .ant-list-item-meta-title {
      margin-bottom: 0;
    }
  }
  .asset-symbol {
    color: ${colors.textColorSecondary};
  }
}
`;
