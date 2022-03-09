import { styled, List as UiList, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetsTable = styled(UiTable)`
.ant-table-thead > tr > th {
        background: transparent;
        color: ${colors.textColorSecondary};
        font-weight: 300;
        border: none;
        &:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before{
            display:none;
        }
    }
}
.ant-table-tbody > tr > td {
    border: none;
    font-weight: 500;
 }
`;

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
