import {
  BlockchainDownloadLinks,
  BlockchainHeader,
  BlockchainHeaderBar,
  BlockchainItemContent,
  BlockchainTable,
  styled,
  Button as UiButton,
  List as UiList,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";
import { Check as check, Xmark as xmark } from "../../../../../../ui/src/icons";
import { mixIns } from "../../../../../../ui/src/mixins";

export const ProxyTableWrapper = styled.div`
  margin: 0 25px;
  ${breakpoint.sm} {
    margin: 0 35px;
  }
`;

export const ProxyTable = styled(BlockchainTable)``;
export const ProxyList = styled(UiList)`
  ${mixIns.hairlineTop}
  padding: 25px 0;
  &.ant-list-split.ant-list-something-after-last-item
    .ant-spin-container
    > .ant-list-items
    > .ant-list-item:last-child {
    border-bottom: none;
  }
`;

export const ProxyListItem = styled(UiListItem)`
  padding: 15px 25px;
  border-bottom: none;
`;

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

export const ProxyListItemContent = styled(BlockchainItemContent)``;
export const ProxyHeaderBar = styled(BlockchainHeaderBar)``;
export const ProxyHeader = styled(BlockchainHeader)``;
export const DownloadLinks = styled(BlockchainDownloadLinks)``;
export const PrintTable = styled(UiPrintTable)``;

export const ProxyTableActionButton = styled(UiButton)`
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

export const ApprovedStatus = styled.span`
  color: ${colors.successColor};
`;

export const NotApprovedStatus = styled.span`
  color: ${colors.missedColor};
`;
