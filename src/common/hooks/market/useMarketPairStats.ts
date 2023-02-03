import { useCallback, useEffect, useState } from "react";

import { useAsset, useMarketHistory } from "..";
import {
  BITCOIN_ASSET_SYMBOL,
  defaultToken,
  HBD_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
} from "../../../api/params";
import { Asset, MarketPairStats, PairNameAndMarketStats } from "../../types";

import { UseMarketPairStatsResult } from "./useMarketPairStats.types";

export function useMarketPairStats(): UseMarketPairStatsResult {
  const { getAllAssets, limitByPrecision, ceilPrecision } = useAsset();
  const { getTicker } = useMarketHistory();
  const [allAssets, _setAllAssets] = useState<Asset[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const getMarketPairStats = useCallback(
    async (base: Asset, quote: Asset) => {
      let latest = "0",
        percentChange = "0",
        volume = "0";
      try {
        const ticker = await getTicker(base, quote);
        if (ticker) {
          latest = ceilPrecision(ticker.latest, base.precision);
          percentChange = limitByPrecision(ticker.percent_change, 1) || "0";
          volume = limitByPrecision(ticker.quote_volume, 3);
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
    [getTicker]
  );

  const getDefaultPairs = useCallback(() => {
    const pairs: string[] = [
      `BTC/${defaultToken}`,
      `HIVE/${defaultToken}`,
      `HBD/${defaultToken}`,
    ];
    try {
      if (allAssets && allAssets.length > 0) {
        const threeLetterAsset = allAssets.find(
          (asset) =>
            asset.symbol !== defaultToken &&
            asset.symbol !== BITCOIN_ASSET_SYMBOL &&
            asset.symbol !== HBD_ASSET_SYMBOL &&
            asset.symbol.length === 3
        );
        const fourLetterAsset = allAssets.find(
          (asset) =>
            asset.symbol !== defaultToken &&
            asset.symbol !== HIVE_ASSET_SYMBOL &&
            asset.symbol.length === 4
        );
        const otherAsset = allAssets.find(
          (asset) => asset.symbol !== defaultToken && asset.symbol.length > 4
        );
        if (threeLetterAsset) {
          pairs.push(`${threeLetterAsset.symbol}/${defaultToken}`);
          return pairs;
        } else if (fourLetterAsset) {
          pairs.push(`${fourLetterAsset.symbol}/${defaultToken}`);
          return pairs;
        } else if (otherAsset) {
          pairs.push(`${otherAsset.symbol}/${defaultToken}`);
          return pairs;
        }
        return pairs;
      } else {
        return pairs;
      }
    } catch (e) {
      console.log(e);
      return pairs;
    }
  }, [
    defaultToken,
    BITCOIN_ASSET_SYMBOL,
    HBD_ASSET_SYMBOL,
    HIVE_ASSET_SYMBOL,
    allAssets,
  ]);

  const formPairStats = useCallback(
    async (pair: string): Promise<PairNameAndMarketStats> => {
      const quoteSymbol = pair.split("/")[0].trim();
      const baseSymbol = pair.split("/")[1].trim();
      const quote = allAssets?.find((asset) => asset.symbol === quoteSymbol);
      const base = allAssets?.find((asset) => asset.symbol === baseSymbol);
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
            volume: "0",
            latest: "0",
            percentChange: "0",
          },
        } as PairNameAndMarketStats;
      }
    },
    [getMarketPairStats, allAssets]
  );

  useEffect(() => {
    let ignore = false;
    async function setAllAssets() {
      setLoading(true);
      const allAssets = await getAllAssets();
      if (!ignore) {
        _setAllAssets(allAssets);
        setLoading(false);
      }
    }
    setAllAssets();
    return () => {
      ignore = true;
    };
  }, [getAllAssets, _setAllAssets, setLoading]);

  return {
    getMarketPairStats,
    getDefaultPairs,
    formPairStats,
    loading,
  };
}
