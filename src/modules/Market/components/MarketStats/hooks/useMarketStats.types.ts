import {
  MarketPair,
  MarketPairStats,
  TradeHistoryRow,
} from "../../../../../common/types";

export type UseMarketStatsResult = {
  marketPairStats: MarketPairStats;
  lastTradeHistory?: TradeHistoryRow;
  selectedPair: MarketPair | undefined;
};
