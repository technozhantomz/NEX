import { Dispatch, SetStateAction } from "react";

import {
  Asset,
  Exchanges,
  PairNameAndMarketStats,
} from "../../../../../common/types";
import { FormInstance } from "../../../../../ui/src";
import { Order, OrderForm, OrderHistoryRow, OrderRow } from "../../../types";

export type UseMarketPageResult = {
  tradingPairsStats: PairNameAndMarketStats[];
  loadingTradingPairs: boolean;
  loadingSelectedPair: boolean;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  isPairModalVisible: boolean;
  setIsPairModalVisible: Dispatch<SetStateAction<boolean>>;
  handleClickOnPair: () => void;
  exchanges: Exchanges;
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
  buyOrderForm: FormInstance<OrderForm>;
  sellOrderForm: FormInstance<OrderForm>;
  onOrderBookRowClick: (record: OrderRow) => void;
  pageLoaded: boolean;
};
