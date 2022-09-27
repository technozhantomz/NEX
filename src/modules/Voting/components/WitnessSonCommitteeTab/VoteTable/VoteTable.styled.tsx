import {
  BlockchainDownloadLinks,
  BlockchainHeader,
  BlockchainHeaderBar,
  BlockchainItemContent,
  BlockchainTable,
  BlockchainTableActiveIcon,
  BlockchainTableUrlIcon,
  Col as col,
  Row as row,
  styled,
  Button as UiButton,
  List as UiList,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
} from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";
import { Check as check, Xmark as xmark } from "../../../../../ui/src/icons";
import { mixIns } from "../../../../../ui/src/mixins";

export const VoteTableWrapper = styled.div`
  margin: 0 25px;
  ${breakpoint.sm} {
    margin: 0 35px;
  }
`;

export const VoteTable = styled(BlockchainTable)`
  margin: 0 35px;
  max-width: 100%;
`;

export const VoteList = styled(UiList)`
  padding: 0 25px 25px;
  ${mixIns.hairline}
  &.ant-list-split.ant-list-something-after-last-item .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
    border-bottom: none;
  }
  .ant-list-pagination {
    margin-top: 0;
  }
  .ant-pagination-item {
    border: none;
  }
  .ant-pagination.mini .ant-pagination-item,
  .ant-pagination-item-active {
    border-right: 2px solid ${colors.borderColorBase};
  }
`;

export const VoteListItem = styled(UiListItem)``;

export const VoteItemContent = styled(BlockchainItemContent)``;

export const VoteActionButton = styled(UiButton)`
  margin: 0px;
  border: none;
  background: none;
  boxshadow: none;
  padding: 0;
  color: ${colors.additionalBlue};
  text-align: right;
  vertical-align: middle;
  &:hover {
    background: #fafafa;
  }
`;

export const Container = styled.div`
  margin-bottom: 25px;
`;

export const Title = styled(BlockchainHeader)``;

export const ColHeader = styled(col)`
  width: 25%;
  font-size: 12px;
  color: ${colors.textColorSecondary};
  margin-bottom: 10px;
`;

export const Col = styled(col)`
  width: 25%;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Row = styled(row)`
  width: 100%;
`;

export const RowMessage = styled(row)`
  width: 100%;
  font-size: 20px;
  justify-content: center;
`;

/** ICONS */
export const Check = styled(check)`
  color: #11b881;
  ${breakpoint.sm} {
    margin-left: 15px;
  }
`;

export const Xmark = styled(xmark)`
  color: #d01721;
  ${breakpoint.sm} {
    margin-left: 15px;
  }
`;

export const VoteHeaderBar = styled(BlockchainHeaderBar)``;
export const DownloadLinks = styled(BlockchainDownloadLinks)``;
export const PrintTable = styled(UiPrintTable)``;
export const urlIcon = styled(BlockchainTableUrlIcon)``;
export const ActiveIcon = styled(BlockchainTableActiveIcon)``;

export const ApprovedStatus = styled.span`
  color: ${colors.successColor};
`;

export const NotApprovedStatus = styled.span`
  color: ${colors.missedColor};
`;
