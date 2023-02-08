import { Col, Row, styled, Card as UiCard } from "../../../../src/ui/src";
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
  padding: 8px 20px;
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
  min-height: 520px;
  ${breakpoint.xxl} {
    min-height: 750px;
  }
  ${mixIns.hairline}
`;

export const PriceChartContainer = styled.div`
  height: 100%;
  ${breakpoint.xxl} {
    min-height: 450px;
  }
`;

export const MarketDepthContainer = styled.div``;

export const TabletTabsContainer = styled.div`
  min-height: 636px;
`;

export const UserOrdersContainer = styled.div`
  min-height: 425px;
`;

export const LimitOrderFormContainer = styled.div`
  min-height: 930px;
  ${mixIns.hairline}
`;

export const WalletContainer = styled.div`
  padding: 25px;
`;

const MobileContainer = styled.div`
  margin-bottom: 8px;
  background-color: ${colors.white};
  border-radius: 2px;
  color: ${colors.textColor};
`;

export const MobileAssetSelectorContainer = styled(MobileContainer)`
  padding: 0px 20px;
  height: 50px;
  border: 1px solid ${colors.borderColorBase};
  display: flex;
  align-items: center;
`;

export const MobileStatsContainer = styled(MobileContainer)`
  height: 50px;
`;

export const MobileChartContainer = styled(MobileContainer)`
  height: 250px;
`;

export const MobileTabsContainer = styled(MobileContainer)`
  height: 320px;
`;
