import { Affix as AntdAffix } from "antd";

import {
  Col,
  Row,
  styled,
  Button as UiButton,
  Card as UiCard,
  Drawer as UiDrawer,
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

export const VerticalFlexedCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;

export const RightBorderedVerticalFlexedCol = styled(VerticalFlexedCol)`
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
  padding: 0;
  ${mixIns.hairline}
  min-height: 65px;
`;

export const PairSelectorContainer = styled.div`
  padding: 8px 20px;
  ${mixIns.hairline}
  min-height: 65px;
`;

export const TradeHistoryContainer = styled.div`
  padding: 0px 0px;
  height: 100%;
  max-height: inherit;
`;

export const ChartsAndOrderBookRow = styled(Row)`
  height: 520px;
  ${breakpoint.xxl} {
    height: 850px;
  }
  ${mixIns.hairline}
`;

export const PriceChartContainer = styled.div`
  margin: 8px;
  height: 100%;
  ${breakpoint.xxl} {
    height: 450px;
    border: 1px solid ${colors.borderColorBase};
    ${mixIns.borderRadius}
  }
`;

export const MarketDepthContainer = styled.div`
  margin: 8px;
  ${breakpoint.xxl} {
    height: 365px;
  }
`;

export const TabletTabsContainer = styled.div`
  min-height: 636px;
`;

export const UserOrdersContainer = styled.div`
  height: 325px;
`;

export const LimitOrderFormContainer = styled.div`
  min-height: 930px;
  ${mixIns.hairline}
`;

export const WalletContainer = styled.div`
  padding: 25px;
`;

export const MobilePageWrapper = styled.div``;
const MobileContainer = styled.div`
  margin-bottom: 8px;
  background-color: ${colors.white};
  border-radius: 2px;
  color: ${colors.textColor};
`;

export const MobileAssetSelectorContainer = styled(MobileContainer)`
  padding: 0px 20px;
  height: 60px;
  border: 1px solid ${colors.borderColorBase};
  display: flex;
  align-items: center;
`;

export const MobileStatsContainer = styled(MobileContainer)`
  height: 60px;
`;

export const MobileChartContainer = styled(MobileContainer)`
  height: 250px;
`;

export const MobileTabsContainer = styled(MobileContainer)`
  height: 320px;
`;

export const Affix = styled(AntdAffix)``;

export const BuySellWrapper = styled.div`
  height: 45px;
  display: flex;
  justify-content: space-between;
`;

export const BuySellButton = styled(UiButton)`
  flex: 1 1 46%;
  color: ${colors.white};
  font-size: 16px;
  border: none;
  &.ant-btn:hover,
  .ant-btn:focus {
    color: ${colors.white} !important;
    border-color: unset;
  }
`;
export const BuyButton = styled(BuySellButton)`
  margin-right: 8px;
  background: ${colors.marketBuy};
  &.ant-btn:hover,
  .ant-btn:focus {
    background: ${colors.marketBuy} !important;
  }
`;
export const SellButton = styled(BuySellButton)`
  margin-left: 8px;
  background: ${colors.marketSell};
  &.ant-btn:hover,
  .ant-btn:focus {
    background: ${colors.marketSell} !important;
  }
`;

export const OrderDrawer = styled(UiDrawer)`
  .ant-drawer-header {
    border-bottom: none;
  }
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }
  .ant-drawer-header {
    margin-top: 20px;
  }
  .ant-drawer-header-title {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    .ant-drawer-title {
      font-size: 20px;
    }
  }
`;
