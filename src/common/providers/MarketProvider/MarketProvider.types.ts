import {
  Asset,
  MarketOrder,
  MarketPair,
  OrderHistory,
  TradeHistoryRow,
} from "../../types";

export type MarketContextType = {
  selectedPair?: MarketPair;
  marketHistory?: OrderHistory[];
  asks?: MarketOrder[];
  bids?: MarketOrder[];
  setMarketPair: (base: Asset, quote: Asset) => void;
  loadingAsksBids: boolean;
  lastTradeHistory: TradeHistoryRow | undefined;
  fillLastTradeHistory: (lastTradeHistory?: TradeHistoryRow) => void;
};
