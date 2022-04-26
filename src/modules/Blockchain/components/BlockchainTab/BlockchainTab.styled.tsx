import {
  styled,
  StatsCardsDeck as UIStatsCardsDeck,
  TableSearch as UiTableSearch,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const BlockTabWrapper = styled.div`
  margin: 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px;
  }
`;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const BlockSearch = styled(UiTableSearch)`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;
