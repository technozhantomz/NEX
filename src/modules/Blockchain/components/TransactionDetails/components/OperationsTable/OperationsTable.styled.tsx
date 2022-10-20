import {
  DataItemContent,
  DataTable,
  DataTableDownloadLinks,
  DataTableHeader,
  DataTableHeaderBar,
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
} from "../../../../../../ui/src";

export const TimeStamp = styled.p`
  width: 153px;
  margin: 0;
`;

export const TableWrapper = styled.div`
  margin: 0 51px 0 35px;
`;

export const OperationsHeaderBar = styled(DataTableHeaderBar)``;

export const OperationsHeader = styled(DataTableHeader)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const OperationsTable = styled(DataTable)`
  max-width: 100%;
`;

export const OperationsListItem = styled(UiListItem)``;

export const OperationsItemContent = styled(DataItemContent)``;

export const PrintTable = styled(UiPrintTable)``;
