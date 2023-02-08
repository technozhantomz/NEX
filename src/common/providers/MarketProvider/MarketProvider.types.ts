import { FormInstance } from "../../../ui/src";
import {
  Asset,
  MarketOrder,
  MarketPair,
  OrderForm,
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
  buyOrderForm: FormInstance<OrderForm>;
  sellOrderForm: FormInstance<OrderForm>;
};
