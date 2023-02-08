import { Statistic as UiStatistic } from "antd";

import { styled, Col as UiCol } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const Row = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const Col = styled(UiCol)`
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 8px !important;
  min-width: 120px;
`;
export const LatestCol = styled(Col)`
  min-width: 160px;
  ${breakpoint.lg} {
    min-width: 220px;
  }
`;

export const Statistic = styled(UiStatistic)`
  .ant-statistic-title {
    font-size: 12px;
  }

  .ant-statistic-content {
    font-size: 12px;
    font-weight: 400;
    ${breakpoint.lg} {
      font-size: 14px;
    }
  }
`;

export const LatestStatisticContainer = styled.div`
  display: flex;
`;

export const LatestBuyStatisticValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.marketSell};
  ${breakpoint.lg} {
    font-size: 20px;
  }
`;
export const LatestSellStatisticValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.marketSell};
  ${breakpoint.lg} {
    font-size: 20px;
  }
`;
export const LatestStatisticUnit = styled.div`
  font-size: 14px;
  font-weight: 400;
  ${breakpoint.lg} {
    font-size: 20px;
  }
`;
