import {
  DataTableDownloadLinks,
  DataTableHeader,
  DataTableHeaderBar,
  DataTabWrapper,
  styled,
  PrintTable as UiPrintTable,
  DataTable as UiTable,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const OpenOrdersWrapper = styled(DataTabWrapper)``;

export const OpenOrdersHeaderBar = styled(DataTableHeaderBar)`
  margin-bottom: 24px;
`;

export const OpenOrdersHeader = styled(DataTableHeader)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const PrintTable = styled(UiPrintTable)``;

export const OpenOrdersTable = styled(UiTable)`
  .ant-table-thead > tr > th {
    background: transparent;
    color: ${colors.textColorSecondary};
    font-weight: 300;
    border: none;
    &:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
      display: none;
    }
  }

  .ant-table-tbody > tr > td {
    border: none;
    font-weight: 500;
  }
`;
