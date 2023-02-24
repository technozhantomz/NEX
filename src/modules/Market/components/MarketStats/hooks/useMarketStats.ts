import { useMemo } from "react";

import { useAsset } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { MarketPairStats } from "../../../../../common/types";

import { UseMarketStatsResult } from "./useMarketStats.types";

export function useMarketStats(): UseMarketStatsResult {
  const { lastTradeHistory, selectedPair, ticker, dayOHLCVs } =
    useMarketContext();

  const { limitByPrecision, setPrecision } = useAsset();

  const marketPairStats = useMemo(() => {
    if (selectedPair && ticker) {
      const base = selectedPair.base;
      const quote = selectedPair.quote;
      let stats = {} as MarketPairStats;
      const tickerDate = {
        latest: Number(ticker.latest).toFixed(base.precision),
        percentChange: limitByPrecision(ticker.percent_change, 1) || "0",
        volume: limitByPrecision(ticker.quote_volume, quote.precision),
        highestBid: Number(ticker.highest_bid).toFixed(base.precision),
        lowestAsk: Number(ticker.lowest_ask).toFixed(base.precision),
      };
      if (dayOHLCVs) {
        stats = {
          ...tickerDate,
          dailyHigh: (
            setPrecision(false, dayOHLCVs.high_base, base.precision) /
            setPrecision(false, dayOHLCVs.high_quote, quote.precision)
          ).toFixed(base.precision),
          dailyLow: (
            setPrecision(false, dayOHLCVs.low_base, base.precision) /
            setPrecision(false, dayOHLCVs.low_quote, quote.precision)
          ).toFixed(base.precision),
        };
      } else {
        stats = {
          ...tickerDate,
          dailyHigh: "0",
          dailyLow: "0",
        };
      }
      return stats;
    } else {
      const defaultPairStats: MarketPairStats = {
        latest: "0",
        percentChange: "0",
        volume: "0",
        highestBid: "0",
        lowestAsk: "0",
        dailyHigh: "0",
        dailyLow: "0",
      };
      return defaultPairStats;
    }
  }, [selectedPair, ticker]);

  return {
    marketPairStats,
    lastTradeHistory,
    selectedPair,
  };
}
