import counterpart from "counterpart";
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
  refreshOrderBook: () => void;
  refreshHistory: () => void;
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
  refreshOrderBook,
  refreshHistory,
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
        key="1"
      >
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
          refreshOrderBook={refreshOrderBook}
          refreshHistory={refreshHistory}
        />
      </TabPane>
      <TabPane
        tab={
          forUser
            ? counterpart.translate(`pages.market.my_order_history`)
            : counterpart.translate(`pages.market.history`)
        }
        key="2"
      >
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
