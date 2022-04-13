import { useCallback } from "react";

import { usePeerplaysApiContext } from "../providers";
import { Asset, MarketPairStats, Ticker } from "../types";

import { roundNum } from ".";

type UseMarketPairStatsResult = {
  getMarketPairStats: (base: Asset, quote: Asset) => Promise<MarketPairStats>;
};

export function useMarketPairStats(): UseMarketPairStatsResult {
  const { dbApi } = usePeerplaysApiContext();
  const getMarketPairStats = useCallback(
    async (base: Asset, quote: Asset) => {
      let latest = 0,
        percentChange = 0,
        volume = 0;
      try {
        const ticker: Ticker = await dbApi("get_ticker", [
          base.symbol,
          quote.symbol,
        ]);
        if (ticker) {
          latest = roundNum(Number(ticker.latest), base.precision);
          percentChange = roundNum(Number(ticker.percent_change), 1) || 0.0;
          volume = roundNum(Number(ticker.quote_volume), 3);
        }
      } catch (e) {
        console.log(e);
      }
      return {
        latest,
        percentChange,
        volume,
      } as MarketPairStats;
    },
    [dbApi]
  );
  return {
    getMarketPairStats,
  };
}
