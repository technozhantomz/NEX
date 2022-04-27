import { Dispatch, SetStateAction } from "react";

import { Asset } from "../../../../common/types";
import { Order, OrderHistoryRow, OrderRow } from "../../types";
import { HistoryBook } from "../HistoryBook";
import { OrderBook } from "../OrderBook";

import * as Styled from "./OrderTabs.styled";

const { TabPane } = Styled.Tabs;

type Props = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  forUser?: boolean;
  getOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  asks: Order[];
  bids: Order[];
  ordersRows: OrderRow[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
  loadingOrderRows: boolean;
  getUserOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  userOrdersRows: OrderRow[];
  loadingUserOrderRows: boolean;
  getHistory: (base: Asset, quote: Asset) => Promise<void>;
  orderHistoryRows: OrderHistoryRow[];
  loadingOrderHistoryRows: boolean;
  getUserHistory: (base: Asset, quote: Asset) => Promise<void>;
  userOrderHistoryRows: OrderHistoryRow[];
  loadingUserHistoryRows: boolean;
};

export const OrderTabs = ({
  forUser = false,
  currentBase,
  currentQuote,
  loadingSelectedPair,
  getOrderBook,
  asks,
  bids,
  ordersRows,
  setOrdersRows,
  loadingOrderRows,
  getUserOrderBook,
  userOrdersRows,
  loadingUserOrderRows,
  getHistory,
  orderHistoryRows,
  loadingOrderHistoryRows,
  getUserHistory,
  userOrderHistoryRows,
  loadingUserHistoryRows,
}: Props): JSX.Element => {
  return (
    <Styled.Tabs
      defaultActiveKey="1"
      centered={true}
      className={forUser ? "for-user" : ""}
    >
      <TabPane tab={forUser ? "My Open Orders" : "Order Book"} key="1">
        <OrderBook
          currentBase={currentBase}
          currentQuote={currentQuote}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
          getOrderBook={getOrderBook}
          asks={asks}
          bids={bids}
          ordersRows={ordersRows}
          setOrdersRows={setOrdersRows}
          loadingOrderRows={loadingOrderRows}
          getUserOrderBook={getUserOrderBook}
          userOrdersRows={userOrdersRows}
          loadingUserOrderRows={loadingUserOrderRows}
        />
      </TabPane>
      <TabPane tab={forUser ? "My Order History" : "History"} key="2">
        <HistoryBook
          currentBase={currentBase}
          currentQuote={currentQuote}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
          getHistory={getHistory}
          orderHistoryRows={orderHistoryRows}
          loadingOrderHistoryRows={loadingOrderHistoryRows}
          getUserHistory={getUserHistory}
          userOrderHistoryRows={userOrderHistoryRows}
          loadingUserHistoryRows={loadingUserHistoryRows}
        />
      </TabPane>
    </Styled.Tabs>
  );
};
