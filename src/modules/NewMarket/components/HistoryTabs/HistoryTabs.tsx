import counterpart from "counterpart";

import { TradeHistoryColumn, TradeHistoryRow } from "../../types";
import {
  HistoryTable,
  renderTradeHistoryColumnsWithPriceMovement,
} from "../HistoryTable";

import * as Styled from "./HistoryTabs.styled";

type Props = {
  tradeHistoryRows: TradeHistoryRow[];
  loadingTradeHistory: boolean;
  userTradeHistoryRows: TradeHistoryRow[];
  loadingUserTradeHistory: boolean;
  tradeHistoryColumns: TradeHistoryColumn[];
};

export function HistoryTabs({
  tradeHistoryRows,
  loadingTradeHistory,
  userTradeHistoryRows,
  loadingUserTradeHistory,
  tradeHistoryColumns,
}: Props): JSX.Element {
  const tradeHistoryColumnsWithPriceMovement =
    renderTradeHistoryColumnsWithPriceMovement(tradeHistoryColumns);

  const tabItems = [
    {
      label: counterpart.translate(`pages.market.tabs.history.all`),
      key: "trade-history",
      children: (
        <Styled.TabContentContainer>
          <HistoryTable
            tradeHistoryRows={tradeHistoryRows}
            loading={loadingTradeHistory}
            tradeHistoryColumns={tradeHistoryColumnsWithPriceMovement}
          />
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.tabs.history.user`),
      key: "user-history",
      children: (
        <Styled.TabContentContainer>
          <HistoryTable
            tradeHistoryRows={userTradeHistoryRows}
            loading={loadingUserTradeHistory}
            tradeHistoryColumns={tradeHistoryColumns}
          />
        </Styled.TabContentContainer>
      ),
    },
  ];
  return (
    <Styled.Tabs
      defaultActiveKey="trade-history"
      centered={true}
      items={tabItems}
    />
  );
}
