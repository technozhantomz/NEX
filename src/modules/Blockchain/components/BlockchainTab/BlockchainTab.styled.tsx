import {
  DataItemContent,
  DataTable,
  DataTableDownloadLinks,
  DataTableHeader,
  DataTableHeaderBar,
  DataTabWrapper,
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";

export const BlockTabWrapper = styled(DataTabWrapper)``;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const BlockHeaderBar = styled(DataTableHeaderBar)``;

export const BlockHeader = styled(DataTableHeader)``;

export const BlockTable = styled(DataTable)`
  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    cursor: pointer;
  }
`;

export const BlockListItem = styled(UiListItem)``;

export const BlockItemContent = styled(DataItemContent)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const PrintTable = styled(UiPrintTable)``;
