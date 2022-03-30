import { useCallback, useEffect, useState } from "react";

import { useAsset, useMarketPairStats } from "../../../../../common/hooks";

import {
  PairNameAndMarketStats,
  UseMarketPageResult,
} from "./useMarketPage.types";

export function useMarketPage(): UseMarketPageResult {
  const { getMarketPairStats } = useMarketPairStats();
  const { getAssetBySymbol, defaultAsset } = useAsset();
  const [statPairs, setPairs] = useState<PairNameAndMarketStats[]>([]);

  const formPairStats = useCallback(
    async (pair: PairNameAndMarketStats): Promise<PairNameAndMarketStats> => {
      const quoteSymbol = pair.tradingPair.split("/")[0];
      const baseSymbol = pair.tradingPair.split("/")[1];
      const quote = await getAssetBySymbol(quoteSymbol);
      const base = await getAssetBySymbol(baseSymbol);
      if (base && quote) {
        const marketPairStats = await getMarketPairStats(base, quote);
        return {
          tradingPair: pair.tradingPair,
          marketPairStats,
        } as PairNameAndMarketStats;
      } else {
        return pair;
      }
    },
    [getAssetBySymbol, getMarketPairStats]
  );
  const getMarketPairStatsForPairs = useCallback(async () => {
    if (statPairs.length > 0) {
      try {
        const updatedPairs = await Promise.all(statPairs.map(formPairStats));
        setPairs(updatedPairs);
      } catch (e) {
        console.log(e);
      }
    }
  }, [statPairs, setPairs, formPairStats]);

  useEffect(() => {
    if (defaultAsset) {
      setPairs([
        {
          tradingPair: `BTC/${defaultAsset.symbol}`,
          marketPairStats: {
            volume: 0,
            latest: 0,
            percentChange: 0,
          },
        },
        {
          tradingPair: `HIVE/${defaultAsset.symbol}`,
          marketPairStats: {
            volume: 0,
            latest: 0,
            percentChange: 0,
          },
        },
        {
          tradingPair: `HBD/${defaultAsset.symbol}`,
          marketPairStats: {
            volume: 0,
            latest: 0,
            percentChange: 0,
          },
        },
        {
          tradingPair: `LARNYX/${defaultAsset.symbol}`,
          marketPairStats: {
            volume: 0,
            latest: 0,
            percentChange: 0,
          },
        },
      ]);
      getMarketPairStatsForPairs();
    }
  }, [defaultAsset]);

  return {
    statPairs,
  };
}
