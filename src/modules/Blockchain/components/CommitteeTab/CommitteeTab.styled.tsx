import {
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import {
  BlockchainDownloadLinks,
  BlockchainHeader,
  BlockchainHeaderBar,
  BlockchainItemContent,
  BlockchainTable,
  BlockchainTableActiveIcon,
  BlockchainTableLastBlock,
  BlockchainTableMissedBlocks,
  BlockchainTableUrlIcon,
  BlockchainTabWrapper,
} from "../../common";

export const CommitteeTabWrapper = styled(BlockchainTabWrapper)``;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const CommitteeHeaderBar = styled(BlockchainHeaderBar)``;

export const CommitteeHeader = styled(BlockchainHeader)``;

export const DownloadLinks = styled(BlockchainDownloadLinks)``;

export const CommitteeTable = styled(BlockchainTable)``;

export const CommiteeListItem = styled(UiListItem)``;

export const CommiteeItemContent = styled(BlockchainItemContent)``;

export const PrintTable = styled(UiPrintTable)``;

export const LastBlock = styled(BlockchainTableLastBlock)``;
export const MissedBlocks = styled(BlockchainTableMissedBlocks)``;
export const urlIcon = styled(BlockchainTableUrlIcon)``;
export const ActiveIcon = styled(BlockchainTableActiveIcon)``;
