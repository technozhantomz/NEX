import { Statistic as UiStatistic } from "antd";

import { styled, Col as UiCol, Row as UiRow } from "../../../../ui/src";

export const Row = styled(UiRow)`
  padding-left: 5px;
  padding-right: 5px;
  align-items: baseline;
`;

export const Col = styled(UiCol)``;

export const Statistic = styled(UiStatistic)`
  .ant-statistic-title {
    font-size: 12px;
  }

  .ant-statistic-content {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const LatestStatistic = styled(UiStatistic)`
  .ant-statistic-title {
    font-size: 20px;
    font-weight: 400;
  }

  .ant-statistic-content {
    font-size: 14px;
    font-weight: 400;
  }
`;
