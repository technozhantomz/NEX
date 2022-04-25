import { Dispatch, SetStateAction } from "react";

import { Asset, Exchanges, MarketPairStats } from "../../../../../common/types";
import { Order, OrderHistoryRow, OrderRow } from "../../../types";

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
  getOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  asks: Order[];
  bids: Order[];
  ordersRows: OrderRow[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
  loadingOrderRows: boolean;
  getUserOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  userOrdersRows: OrderRow[];
  loadingUserOrderRows: boolean;
  refreshOrderBook: () => void;
  getHistory: (base: Asset, quote: Asset) => Promise<void>;
  orderHistoryRows: OrderHistoryRow[];
  loadingOrderHistoryRows: boolean;
  getUserHistory: (base: Asset, quote: Asset) => Promise<void>;
  userOrderHistoryRows: OrderHistoryRow[];
  loadingUserHistoryRows: boolean;
  refreshHistory: () => void;
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
