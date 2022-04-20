import { useCallback, useEffect, useState } from "react";

import { useAsset, useMarketPairStats } from "../../../../../common/hooks";
import { useSettingsContext } from "../../../../../common/providers";

import {
  PairNameAndMarketStats,
  UseMarketPageResult,
} from "./useMarketPage.types";

export function useMarketPage(): UseMarketPageResult {
  const { exchanges } = useSettingsContext();
  const { getMarketPairStats } = useMarketPairStats();
  const { getAssetBySymbol, defaultAsset } = useAsset();
  const [tradingPairsStats, setTradingPairsStats] = useState<
    PairNameAndMarketStats[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formPairStats = useCallback(
    async (pair: string): Promise<PairNameAndMarketStats> => {
      const quoteSymbol = pair.split("/")[0].trim();
      const baseSymbol = pair.split("/")[1].trim();
      const quote = await getAssetBySymbol(quoteSymbol);
      const base = await getAssetBySymbol(baseSymbol);
      if (base && quote) {
        const marketPairStats = await getMarketPairStats(base, quote);
        return {
          tradingPair: pair,
          marketPairStats,
        } as PairNameAndMarketStats;
      } else {
        return {
          tradingPair: pair,
          marketPairStats: {
            volume: 0,
            latest: 0,
            percentChange: 0,
          },
        } as PairNameAndMarketStats;
      }
    },
    [getAssetBySymbol, getMarketPairStats]
  );

  const getTradingPairsStats = useCallback(
    async (defaultAsset, exchanges) => {
      try {
        setLoading(true);
        const initPairs: string[] =
          exchanges.list.length > 0
            ? exchanges.list
            : [
                `BTC/${defaultAsset.symbol}`,
                `HIVE/${defaultAsset.symbol}`,
                `HBD/${defaultAsset.symbol}`,
                `LARNYX/${defaultAsset.symbol}`,
              ];
        const updatedPairs = await Promise.all(initPairs.map(formPairStats));
        setTradingPairsStats(updatedPairs);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [setTradingPairsStats, formPairStats]
  );

  useEffect(() => {
    if (defaultAsset && exchanges) {
      getTradingPairsStats(defaultAsset, exchanges);
    }
  }, [defaultAsset, exchanges.list]);

  return {
    tradingPairsStats,
    loading,
  };
}
