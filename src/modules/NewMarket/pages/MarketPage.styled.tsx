import { Col, Row, styled, Card as UiCard } from "../../../../src/ui/src";
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
  // padding: 16px 20px;
  // ${mixIns.hairline}
  min-height: 65px;
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
  padding: 16px 16px;
  height: 100%;
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
