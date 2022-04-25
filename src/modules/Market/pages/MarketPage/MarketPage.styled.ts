import {
  styled,
  Card as UiCard,
  StatsCardsDeck as UIStatsCardsDeck,
  Tabs as UiTabs,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const StatsCardsDeck = styled(UIStatsCardsDeck)`
  justify-content: space-around;
  margin: 25px 20px;
  flex-wrap: wrap;
  height: auto;
  .trading-card {
    min-width: 140px;
    width: 40%;
    margin: 10px;
  }
  ${breakpoint.sm} {
    display: flex;
    margin: 25px 0 0;
    flex-wrap: nowrap;
    justify-content: flex-start;
    .trading-card {
      width: 203px;
      margin: 0 10px;
    }
  }
`;

export const Container = styled(UiCard)`
  ${mixIns.borderRadius}
  margin: 15px 0;
  .ant-card-body {
    padding: 0;
  }
  ${breakpoint.sm} {
  }
`;

export const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Tabs = styled(UiTabs)`
  width: 100%;
  .ant-tabs-nav-wrap,
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;
  }
`;
