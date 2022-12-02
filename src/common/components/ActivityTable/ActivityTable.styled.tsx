import {
  DataTableDownloadLinks,
  DataTableHeader,
  DataTableHeaderBar,
  DataTabWrapper,
  styled,
  PrintTable as UiPrintTable,
  DataTable as UiTable,
} from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const ActivityTable = styled(UiTable)`
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

  .ant-table-container table > thead > tr:first-child th:first-child {
    width: 150px;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    min-width: 110px;
  }
`;

export const ActivityTableWrapper = styled(DataTabWrapper)``;

export const ActivityTableHeader = styled(DataTableHeader)`
  margin-left: 10px;
`;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const ActivityTableHeaderBar = styled(DataTableHeaderBar)`
  margin-bottom: 24px;
`;

export const PrintTable = styled(UiPrintTable)``;
