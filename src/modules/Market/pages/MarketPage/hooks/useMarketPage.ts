import { useCallback, useEffect, useState } from "react";

import {
  useAsset,
  useMarketPairStats,
  useUpdateExchanges,
} from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import {
  PairNameAndMarketStats,
  UseMarketPageResult,
} from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { dbApi } = usePeerplaysApiContext();
  const { exchanges, updateExchanges } = useUpdateExchanges();
  const { getMarketPairStats } = useMarketPairStats();
  const { getAssetBySymbol, defaultAsset } = useAsset();
  const [tradingPairsStats, setTradingPairsStats] = useState<
    PairNameAndMarketStats[]
  >([]);
  const [loadingTradingPairs, setLoadingTradingPairs] = useState<boolean>(true);
  const [currentBase, setCurrentBase] = useState<Asset>();
  const [currentQuote, setCurrentQuote] = useState<Asset>();
  const [loadingSelectedPair, setLoadingSelectedPair] = useState<boolean>(true);

  const getPairAssets = useCallback(
    async (assets: string[]) => {
      try {
        setLoadingSelectedPair(true);
        const [quote, base] = await dbApi("lookup_asset_symbols", [assets]);
        setCurrentBase(base as Asset);
        setCurrentQuote(quote as Asset);
        setLoadingSelectedPair(false);
      } catch (e) {
        setLoadingSelectedPair(false);
        console.log(e);
      }
    },
    [dbApi, setCurrentBase, setCurrentQuote, setLoadingSelectedPair]
  );

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
        setLoadingTradingPairs(true);
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
        setLoadingTradingPairs(false);
      } catch (e) {
        console.log(e);
        setLoadingTradingPairs(false);
      }
    },
    [setTradingPairsStats, formPairStats, setLoadingTradingPairs]
  );

  useEffect(() => {
    if (currentPair !== exchanges.active) {
      updateExchanges(currentPair);
    }
    getPairAssets(currentPair.split("_"));
  }, [currentPair, getPairAssets, updateExchanges]);

  useEffect(() => {
    if (defaultAsset && exchanges) {
      getTradingPairsStats(defaultAsset, exchanges);
    }
  }, [defaultAsset, exchanges.list]);

  return {
    tradingPairsStats,
    loadingTradingPairs,
    currentBase,
    currentQuote,
    loadingSelectedPair,
  };
}
