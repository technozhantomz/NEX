import { Asset, MarketPairStats } from "../../../../../common/types";

export type UseMarketPageResult = {
  tradingPairsStats: PairNameAndMarketStats[];
  loadingTradingPairs: boolean;
  loadingSelectedPair: boolean;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
};

export type PairNameAndMarketStats = {
  tradingPair: string;
  marketPairStats: MarketPairStats;
};
