import { FormInstance } from "../../../ui/src";
import {
  Asset,
  MarketHistory,
  MarketOrder,
  MarketPair,
  OrderForm,
  OrderHistory,
  Ticker,
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
  buyOrderForm: FormInstance<OrderForm>;
  sellOrderForm: FormInstance<OrderForm>;
  buckets: number[];
  OHLCVs: MarketHistory[] | undefined;
  dayOHLCVs: MarketHistory | undefined;
  ticker: Ticker | undefined;
};
