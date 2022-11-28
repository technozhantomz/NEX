import {
  Button,
  Col as col,
  DataItemContent,
  DataTable,
  DataTableActiveIcon,
  DataTableDownloadLinks,
  DataTableHeader,
  DataTableHeaderBar,
  DataTableMissedBlocks,
  DataTableUrlIcon,
  LikeFilled,
  LikeOutlined,
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

export const LikeFilledIcon = styled(LikeFilled)`
  font-size: 16px;
  color: ${colors.textColorSecondary};
`;

export const LikeOutlinedIcon = styled(LikeOutlined)`
  font-size: 16px;
  color: ${colors.textColorSecondary};
`;

export const MissedBlocks = styled(DataTableMissedBlocks)``;

export const VoteTableWrapper = styled.div`
  margin: 0 25px;
  ${breakpoint.sm} {
    margin: 0 35px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
`;

export const Reconfirm = styled(Button)`
  height: 50px;
  min-width: 60%;
  margin-right: 16px;
  margin-bottom: 8px;
  ${breakpoint.sm} {
    min-width: 165px;
    margin-bottom: 0;
  }
`;

export const VoteTable = styled(DataTable)`
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

export const VoteListItem = styled(UiListItem)`
  border-bottom: 0.25px solid ${colors.borderColorBase} !important;
`;

export const VoteItemContent = styled(DataItemContent)``;

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
  margin-bottom: 0px;
`;

export const Title = styled(DataTableHeader)``;

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

export const VoteHeaderBar = styled(DataTableHeaderBar)`
  .ant-tooltip-disabled-compatible-wrapper {
    width: 100%;
  }
`;
export const DownloadLinks = styled(DataTableDownloadLinks)``;
export const PrintTable = styled(UiPrintTable)``;
export const urlIcon = styled(DataTableUrlIcon)``;
export const ActiveIcon = styled(DataTableActiveIcon)``;

export const ApprovedStatus = styled.span`
  color: ${colors.successColor};
`;

export const NotApprovedStatus = styled.span`
  color: ${colors.missedColor};
`;
