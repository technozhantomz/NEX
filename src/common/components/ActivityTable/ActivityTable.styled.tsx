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
} from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const ActivitysTabWrapper = styled(DataTabWrapper)``;

export const ActivityHeaderBar = styled(DataTableHeaderBar)``;

export const ActivityHeader = styled(DataTableHeader)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const ActivityTable = styled(DataTable)`
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
.ant-table-tbody > tr > td a{
font-style: italic;
}
`;

export const ActivityListItem = styled(UiListItem)``;

export const ActivityItemContent = styled(DataItemContent)``;

export const PrintTable = styled(UiPrintTable)``;
