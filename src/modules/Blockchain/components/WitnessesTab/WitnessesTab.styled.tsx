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

export const WitnessesTabWrapper = styled(BlockchainTabWrapper)``;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const WitnessesHeaderBar = styled(BlockchainHeaderBar)``;

export const WitnessesHeader = styled(BlockchainHeader)``;

export const DownloadLinks = styled(BlockchainDownloadLinks)``;

export const WitnessesTable = styled(BlockchainTable)``;

export const WitnessListItem = styled(UiListItem)``;

export const WitnessesItemContent = styled(BlockchainItemContent)``;

export const PrintTable = styled(UiPrintTable)``;

export const LastBlock = styled(BlockchainTableLastBlock)``;
export const MissedBlocks = styled(BlockchainTableMissedBlocks)``;
export const urlIcon = styled(BlockchainTableUrlIcon)``;
export const ActiveIcon = styled(BlockchainTableActiveIcon)``;
