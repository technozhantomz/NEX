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

export const CenterEllipsis = styled.p`
  width: 79px;
  margin: 0;
  > span {
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
  }

  .ellipsis {
    display: inline-block;
    width: calc(50% + 1.2em);
    text-overflow: ellipsis;
  }

  .indent {
    display: inline-flex;
    width: calc(50% - 1.2em);
    justify-content: flex-end;
  }
`;

export const TimeStamp = styled.p`
  width: 153px;
  margin: 0;
`;

export const TableWrapper = styled.div`
  margin: 0 15px;
`;

export const TransactionHeaderBar = styled(DataTableHeaderBar)``;

export const TransactionHeader = styled(DataTableHeader)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const TransactionsTable = styled(DataTable)`
  .pointer {
    cursor: pointer;
  }
  max-width: 100%;
`;

export const TransactionListItem = styled(UiListItem)``;

export const TransactionItemContent = styled(DataItemContent)``;

export const PrintTable = styled(UiPrintTable)``;
