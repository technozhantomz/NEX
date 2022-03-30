import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import { useAsset, useMarketPairStats } from "../../../../../common/hooks";

import {
  PairNameAndMarketStats,
  UseMarketTabResult,
} from "./useMarketTab.types";

export function useMarketTab(): UseMarketTabResult {
  const { getMarketPairStats } = useMarketPairStats();
  const { getAssetBySymbol } = useAsset();
  const [pairs, setPairs] = useState<PairNameAndMarketStats[]>([
    {
      tradingPair: `BTC/${defaultToken}`,
      marketPairStats: {
        volume: 0,
        latest: 0,
        percentChange: 0,
      },
    },
    {
      tradingPair: `HIVE/${defaultToken}`,
      marketPairStats: {
        volume: 0,
        latest: 0,
        percentChange: 0,
      },
    },
    {
      tradingPair: `HBD/${defaultToken}`,
      marketPairStats: {
        volume: 0,
        latest: 0,
        percentChange: 0,
      },
    },
    {
      tradingPair: `LARNYX/${defaultToken}`,
      marketPairStats: {
        volume: 0,
        latest: 0,
        percentChange: 0,
      },
    },
  ]);

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
    try {
      const updatedPairs = await Promise.all(pairs.map(formPairStats));
      setPairs(updatedPairs);
    } catch (e) {
      console.log(e);
    }
  }, [setPairs, formPairStats]);

  useEffect(() => {
    getMarketPairStatsForPairs();
  }, []);

  return {
    pairs,
  };
}
