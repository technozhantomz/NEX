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
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetsTabWrapper = styled(DataTabWrapper)``;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const AssetHeaderBar = styled(DataTableHeaderBar)``;

export const AssetHeader = styled(DataTableHeader)``;

export const DownloadLinks = styled(DataTableDownloadLinks)``;

export const AssetsTable = styled(DataTable)``;

export const AssetListItem = styled(UiListItem)`
  :not(:last-child) {
    border-bottom: 0.25px solid ${colors.borderColorBase} !important;
  }
`;

export const AssetItemContent = styled(DataItemContent)``;

export const PrintTable = styled(UiPrintTable)``;
