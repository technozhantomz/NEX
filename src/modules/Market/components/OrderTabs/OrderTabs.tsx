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
  asks: Order[];
  bids: Order[];
  ordersRows: OrderRow[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
  loadingOrderRows: boolean;
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
  currentBase,
  currentQuote,
  loadingSelectedPair,
  asks,
  bids,
  ordersRows,
  setOrdersRows,
  loadingOrderRows,
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
        key="1"
      >
        <OrderBook
          currentBase={currentBase}
          currentQuote={currentQuote}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
          asks={asks}
          bids={bids}
          ordersRows={ordersRows}
          setOrdersRows={setOrdersRows}
          loadingOrderRows={loadingOrderRows}
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
        key="2"
      >
        <HistoryBook
          currentBase={currentBase}
          currentQuote={currentQuote}
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
