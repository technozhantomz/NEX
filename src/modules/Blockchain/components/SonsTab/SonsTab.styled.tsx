import {
  DataItemContent,
  DataTable,
  DataTableActiveIcon,
  DataTableDownloadLinks,
  DataTableHeader,
  DataTableHeaderBar,
  DataTableLastBlock,
  DataTableMissedBlocks,
  DataTableUrlIcon,
  DataTabWrapper,
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const SonsTabWrapper = styled(DataTabWrapper)``;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const SonsHeaderBar = styled(DataTableHeaderBar)``;

export const SonsHeader = styled(DataTableHeader)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const SonsTable = styled(DataTable)``;

export const SonListItem = styled(UiListItem)`
  :not(:last-child) {
    border-bottom: 0.25px solid ${colors.borderColorBase} !important;
  }
`;

export const SonItemContent = styled(DataItemContent)``;

export const PrintTable = styled(UiPrintTable)``;

export const LastBlock = styled(DataTableLastBlock)``;
export const MissedBlocks = styled(DataTableMissedBlocks)``;
export const urlIcon = styled(DataTableUrlIcon)``;
export const ActiveIcon = styled(DataTableActiveIcon)``;
