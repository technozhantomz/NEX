import {
  Col,
  Row,
  styled,
  Card as UiCard,
  Tabs as UiTabs,
} from "../../../../src/ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";
import { mixIns } from "../../../ui/src/mixins";

export const Container = styled(UiCard)`
  .ant-card-body {
    height: 100%;
    padding: 0;
  }
`;

export const FullHeightRow = styled(Row)`
  height: 100%;
`;

export const FlexedCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;

export const RightBorderedFlexedCol = styled(FlexedCol)`
  border-right: 0.25px solid ${colors.borderColorBase};
`;

export const RightBorderedCol = styled(Col)`
  border-right: 0.25px solid ${colors.borderColorBase};
`;

export const HistoryBox = styled.div`
  padding: 10px 0 0;
  max-height: inherit;
`;

export const BoxHeader = styled.h2`
  font-size: 20px;
  margin-bottom: 0;
`;

export const StatsBox = styled.div`
  padding: 8px 20px;
  ${mixIns.hairline}
  min-height: 65px;
`;

export const PairSelectorContainer = styled.div`
  padding: 16px 20px;
  ${mixIns.hairline}
  min-height: 65px;
`;

export const TradeHistoryContainer = styled.div`
  padding: 20px 16px;
  height: 100%;
  max-height: inherit;
`;

export const ChartsAndOrderBookRow = styled(Row)`
  min-height: 750px;
  ${mixIns.hairline}
`;

export const PriceChartContainer = styled.div`
  min-height: 450px;
`;

export const MarketDepthContainer = styled.div`
  min-height: 300px;
`;

export const UserOrdersContainer = styled.div``;

export const LimitOrderFormContainer = styled.div`
  min-height: 930px;
  ${mixIns.hairline}
`;

export const WalletContainer = styled.div`
  padding: 25px;
`;

export const Tabs = styled(UiTabs)`
  width: 100%;
  &.ant-tabs-top > .ant-tabs-nav,
  &.ant-tabs-bottom > .ant-tabs-nav,
  &.ant-tabs-top > div > .ant-tabs-nav,
  &.ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 0;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    flex: 1 1 50%;
    justify-content: center;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
  .ant-tabs-tab:hover {
    color: ${colors.textColor};
  }
  &.for-user .ant-tabs-tab {
    ${breakpoint.md} {
      font-size: 20px;
    }
  }
`;
