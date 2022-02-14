import {
  styled,
  Button as UiButton,
  List as UiList,
  Table as UiTable,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetsTable = styled(UiTable)`
.ant-table-cell{
    background: transparent:
    &::before{
        backround-color: transparent;
    }
}
`;

export const AssetListItem = styled(UiList.Item)`
   {
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
    margin: 18px 0 25px 0;
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

export const AssetActionButton = styled(UiButton)`
   {
    background-color: #e3ebf8;
    &:hover,
    &:active {
      background-color: ${colors.primaryColor};
      color: ${colors.white};
    }
  }
`;
