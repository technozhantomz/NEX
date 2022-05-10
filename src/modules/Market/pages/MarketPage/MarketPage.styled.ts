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
  flex-wrap: wrap;
  height: auto;
  .trading-card {
    min-width: 140px;
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
  .ant-form {
    padding: 0 20px;

    .ant-input-affix-wrapper {
      margin-bottom: 0px;
      height: 50px;
    }
    .ant-form-item {
      margin-bottom: 15px;
    }
  }
  ${mixIns.borderRadius}
  margin: 0 0 15px 0;
  .ant-card-body {
    padding: 0;
  }
  ${breakpoint.sm} {
    margin: 15px 0;
    .ant-form {
      padding: 0;

      .ant-input-affix-wrapper {
        margin-bottom: 0px;
        height: 65px;
      }
      .ant-form-item {
        margin-bottom: 10px;
      }
    }
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

export const MarketContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  color: white;
  width: 100%;
  // margin: 10px;
  margin-bottom: 15px;
  padding: 10px;
  text-align: center;
`;

export const Div = styled.div`
  margin: 10px;

  ${breakpoint.sm} {
    margin: 25px;
  }
`;
