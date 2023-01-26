import { useCallback, useEffect, useState } from "react";

import { useAsset, useMarketHistory } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { MarketPairStats } from "../../../../../common/types";

import { UseMarketStatsResult } from "./useMarketStats.types";

export function useMarketStats(): UseMarketStatsResult {
  const { asks, bids, marketHistory, lastTradeHistory, selectedPair } =
    useMarketContext();
  const [marketPairStats, _setMarketPairStats] = useState<MarketPairStats>({
    latest: "0",
    percentChange: "0",
    volume: "0",
    askPrice: "0",
    bidPrice: "0",
    dailyHigh: "0",
    dailyLow: "0",
  });
  const { getTicker } = useMarketHistory();
  const { limitByPrecision } = useAsset();

  const getMarketPairStats = useCallback(async () => {
    let latest = "0",
      percentChange = "0",
      volume = "0",
      askPrice = "0",
      bidPrice = "0",
      dailyHigh = "0",
      dailyLow = "0";
    if (selectedPair && asks && bids && marketHistory) {
      const base = selectedPair.base;
      const quote = selectedPair.quote;
      try {
        const ticker = await getTicker(selectedPair.base, selectedPair.quote);
        console.log("ticker", ticker);
        askPrice = Number(asks[0].price).toFixed(base.precision);
        bidPrice = Number(bids[0].price).toFixed(base.precision);
        if (ticker) {
          latest = Number(ticker.latest).toFixed(base.precision);
          percentChange = limitByPrecision(ticker.percent_change, 1) || "0";
          volume = limitByPrecision(ticker.quote_volume, quote.precision);
          dailyHigh = limitByPrecision(ticker.highest_bid, base.precision);
          dailyLow = limitByPrecision(ticker.lowest_ask, base.precision);
        }
      } catch (e) {
        console.log(e);
      }
    }
    console.log("ticker final", {
      latest,
      percentChange,
      volume,
      askPrice,
      bidPrice,
      dailyHigh,
      dailyLow,
    });
    return {
      latest,
      percentChange,
      volume,
      askPrice,
      bidPrice,
      dailyHigh,
      dailyLow,
    } as MarketPairStats;
  }, [selectedPair, asks, bids, marketHistory, getTicker]);

  useEffect(() => {
    let ignore = false;
    async function setMarketPairStats() {
      const marketPairStats = await getMarketPairStats();
      if (!ignore) {
        _setMarketPairStats(marketPairStats);
      }
    }
    setMarketPairStats();
    return () => {
      ignore = true;
    };
  }, [getMarketPairStats, _setMarketPairStats]);

  return {
    marketPairStats,
    lastTradeHistory,
    selectedPair,
  };
}
