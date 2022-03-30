import {
  styled,
  StatsCardsDeck as UIStatsCardsDeck,
  Tabs as UiTabs,
} from "../../../../ui/src";

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
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
