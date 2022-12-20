import counterpart from "counterpart";

import { Order, OrderHistoryRow, OrderRow, PairAssets } from "../../types";
import { HistoryBook } from "../HistoryBook";
import { OrderBook } from "../OrderBook";

import * as Styled from "./OrderTabs.styled";

const { TabPane } = Styled.Tabs;

type Props = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  forUser?: boolean;
  asks: Order[];
  bids: Order[];
  loadingAsksBids: boolean;
  userOrdersRows: OrderRow[];
  loadingUserOrderRows: boolean;
  orderHistoryRows: OrderHistoryRow[];
  loadingOrderHistoryRows: boolean;
  userOrderHistoryRows: OrderHistoryRow[];
  loadingUserHistoryRows: boolean;
  onOrderBookRowClick: (record: OrderRow) => void;
};

export const OrderTabs = ({
  forUser = false,
  selectedAssets,
  loadingSelectedPair,
  asks,
  bids,
  loadingAsksBids,
  userOrdersRows,
  loadingUserOrderRows,
  orderHistoryRows,
  loadingOrderHistoryRows,
  userOrderHistoryRows,
  loadingUserHistoryRows,
  onOrderBookRowClick,
}: Props): JSX.Element => {
  return (
    <Styled.Tabs
      defaultActiveKey="1"
      centered={true}
      className={forUser ? "for-user" : ""}
    >
      <TabPane
        tab={
          forUser
            ? counterpart.translate(`pages.market.my_open_orders`)
            : counterpart.translate(`pages.market.order_book`)
        }
        key={forUser ? "user-order-book" : "order-book"}
      >
        <OrderBook
          selectedAssets={selectedAssets}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
          asks={asks}
          bids={bids}
          loadingAsksBids={loadingAsksBids}
          userOrdersRows={userOrdersRows}
          loadingUserOrderRows={loadingUserOrderRows}
          onOrderBookRowClick={onOrderBookRowClick}
        />
      </TabPane>
      <TabPane
        tab={
          forUser
            ? counterpart.translate(`pages.market.my_order_history`)
            : counterpart.translate(`pages.market.history`)
        }
        key={forUser ? "user-history-book" : "history-book"}
      >
        <HistoryBook
          selectedAssets={selectedAssets}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
          orderHistoryRows={orderHistoryRows}
          loadingOrderHistoryRows={loadingOrderHistoryRows}
          userOrderHistoryRows={userOrderHistoryRows}
          loadingUserHistoryRows={loadingUserHistoryRows}
        />
      </TabPane>
    </Styled.Tabs>
  );
};
