import { styled, List as UiList } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetListItem = styled(UiList.Item)`
   {
    padding: 15px 20px;
  }
  .ant-list-item-action {
    display: flex;
    justify-content: space-between;
    li {
      padding: 0;
      .ant-list-item-action-split {
        display: none;
      }
    }
  }
`;

export const AssetsItemContent = styled.div`
   {
    margin: 18px 0 25px;
  }
  .asset-info {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    .asset-info-title {
      font-weight: 300;
      color: ${colors.textColorSecondary};
    }
    .asset-info-value {
      font-weight: 500;
    }
  }
`;
