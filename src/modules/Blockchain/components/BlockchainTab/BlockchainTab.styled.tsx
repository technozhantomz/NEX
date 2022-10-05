import {
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
  StatsCardsDeck as UIStatsCardsDeck,
  // TableSearch as UiTableSearch,
} from "../../../../ui/src";
// import { breakpoint } from "../../../../ui/src/breakpoints";
import {
  BlockchainDownloadLinks,
  BlockchainHeader,
  BlockchainHeaderBar,
  BlockchainItemContent,
  BlockchainTable,
  BlockchainTabWrapper,
} from "../../common";

export const BlockTabWrapper = styled(BlockchainTabWrapper)``;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

// export const BlockSearch = styled(UiTableSearch)`
//   margin-bottom: 25px;
//   ${breakpoint.sm} {
//     margin-bottom: 35px;
//   }
// `;

export const BlockHeaderBar = styled(BlockchainHeaderBar)``;

export const BlockHeader = styled(BlockchainHeader)``;

export const BlockTable = styled(BlockchainTable)`
  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    cursor: pointer;
  }
`;

export const BlockListItem = styled(UiListItem)``;

export const BlockItemContent = styled(BlockchainItemContent)``;

export const DownloadLinks = styled(BlockchainDownloadLinks)``;

export const PrintTable = styled(UiPrintTable)``;
