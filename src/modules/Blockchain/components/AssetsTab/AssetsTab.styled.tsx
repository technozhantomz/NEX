import {
  styled,
  ListItem as UiListItem,
  StatsCardsDeck as UIStatsCardsDeck,
  Table as UiTable,
  TableSearch as UiTableSearch,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const AssetsTabWrapper = styled.div`
  margin: 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px;
  }
`;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const AssetsSearch = styled(UiTableSearch)``;

export const AssetsTable = styled(UiTable)`
  max-width: 886px;
  .ant-table-thead > tr > th {
    color: ${colors.textColorSecondary};
    background: ${colors.white};
    border: none;
    font-size: 0.9em;
    font-weight: 300;
    &:before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    border: none;
  }
  .ant-tag {
    padding: 5px 15px;
    background: ${colors.assetTag};
    border: none;
    color: ${colors.textColor};
  }
`;

export const AssetListItem = styled(UiListItem)``;

export const AssetItemContent = styled.div`
  margin: 18px 0 25px;
  .asset-info {
    margin: 5px 0;
    display: flex;
    .asset-info-title {
      font-weight: 300;
      width: 100px;
      color: ${colors.textColorSecondary};
    }
    .asset-info-value {
      font-weight: 500;
      .ant-tag {
        padding: 5px 15px;
        background: ${colors.assetTag};
        border: none;
        color: ${colors.textColor};
      }
    }
  }
`;
