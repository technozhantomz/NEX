import { useCallback, useEffect, useState } from "react";

import { useSettingsContext } from "../../../../../common/components";
import { useAsset, useMarketPairStats } from "../../../../../common/hooks";

import {
  PairNameAndMarketStats,
  UseMarketPageResult,
} from "./useMarketPage.types";

export function useMarketPage(): UseMarketPageResult {
  const { exchanges } = useSettingsContext();
  const { getMarketPairStats } = useMarketPairStats();
  const { getAssetBySymbol, defaultAsset } = useAsset();
  const [statPairs, setPairs] = useState<PairNameAndMarketStats[]>([]);

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

  const getMarketPairStatsForPairs = useCallback(
    async (defaultAsset, exchanges) => {
      try {
        const initPairs =
          exchanges.list.length > 0
            ? exchanges.list
            : [
                `BTC/${defaultAsset.symbol}`,
                `HIVE/${defaultAsset.symbol}`,
                `HBD/${defaultAsset.symbol}`,
                `LARNYX/${defaultAsset.symbol}`,
              ];
        const updatedPairs = await Promise.all(initPairs.map(formPairStats));
        setPairs(updatedPairs);
      } catch (e) {
        console.log(e);
      }
    },
    [statPairs, setPairs, formPairStats]
  );

  useEffect(() => {
    if (defaultAsset && exchanges) {
      // setInterval(
      // () =>
      getMarketPairStatsForPairs(defaultAsset, exchanges);
      //   10000
      // );
    }
  }, [defaultAsset, exchanges]);

  return {
    statPairs,
  };
}
