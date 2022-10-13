import {
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
} from "../../../../../../ui/src";
import {
  BlockchainDownloadLinks,
  BlockchainHeader,
  BlockchainHeaderBar,
  BlockchainItemContent,
  BlockchainTable,
} from "../../../../common";

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
  margin: 0 51px 0 35px;
`;

export const TransactionHeaderBar = styled(BlockchainHeaderBar)``;

export const TransactionHeader = styled(BlockchainHeader)``;

export const DownloadLinks = styled(BlockchainDownloadLinks)``;

export const TransactionsTable = styled(BlockchainTable)`
  max-width: 100%;
`;

export const TransactionListItem = styled(UiListItem)``;

export const TransactionItemContent = styled(BlockchainItemContent)``;

export const PrintTable = styled(UiPrintTable)``;
