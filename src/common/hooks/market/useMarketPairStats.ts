import { useCallback, useEffect, useState } from "react";

import { useAsset } from "..";
import {
  BITCOIN_ASSET_SYMBOL,
  defaultToken,
  HBD_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
} from "../../../api/params";
import { usePeerplaysApiContext } from "../../providers";
import {
  Asset,
  MarketPairStats,
  PairNameAndMarketStats,
  Ticker,
} from "../../types";

import { UseMarketPairStatsResult } from "./useMarketPairStats.types";

export function useMarketPairStats(): UseMarketPairStatsResult {
  const { dbApi } = usePeerplaysApiContext();
  const { getAllAssets, getAssetsBySymbols, limitByPrecision, ceilPrecision } =
    useAsset();

  const [allAssets, _setAllAssets] = useState<Asset[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const getMarketPairStats = useCallback(
    async (base: Asset, quote: Asset) => {
      let latest = "0",
        percentChange = "0",
        volume = "0";
      try {
        const ticker: Ticker = await dbApi("get_ticker", [
          base.symbol,
          quote.symbol,
        ]);
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
    [dbApi]
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
  }, [defaultToken, allAssets]);

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
    [getAssetsBySymbols, allAssets]
  );

  const setAllAssets = useCallback(async () => {
    try {
      setLoading(true);
      const allAssets = await getAllAssets();
      _setAllAssets(allAssets);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [getAllAssets, _setAllAssets, setLoading]);

  useEffect(() => {
    setAllAssets();
  }, [setAllAssets]);

  return {
    getMarketPairStats,
    getDefaultPairs,
    formPairStats,
    loading,
  };
}
