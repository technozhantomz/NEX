import { useCallback } from "react";

import { useAsset } from "..";
import { defaultToken } from "../../../api/params";
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
  const { getAssetBySymbol, limitByPrecision } = useAsset();

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
          latest = limitByPrecision(ticker.latest, base.precision);
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

  const getDefaultPairs = useCallback(async () => {
    const pairs: string[] = [
      `BTC/${defaultToken}`,
      `HIVE/${defaultToken}`,
      `HBD/${defaultToken}`,
    ];
    try {
      const rawAssets: Asset[] = await dbApi("list_assets", ["", 99]);
      const threeLetterAsset = rawAssets.find(
        (asset) =>
          asset.symbol !== defaultToken &&
          asset.symbol !== "BTC" &&
          asset.symbol !== "HBD" &&
          asset.symbol.length === 3
      );
      const fourLetterAsset = rawAssets.find(
        (asset) =>
          asset.symbol !== defaultToken &&
          asset.symbol !== "HIVE" &&
          asset.symbol.length === 4
      );
      const otherAsset = rawAssets.find(
        (asset) => asset.symbol !== defaultToken && asset.symbol.length > 4
      );
      if (threeLetterAsset) {
        pairs.push(`${threeLetterAsset.symbol}/${defaultToken}`);
        return pairs;
      }
      if (fourLetterAsset) {
        pairs.push(`${fourLetterAsset.symbol}/${defaultToken}`);
        return pairs;
      }
      if (otherAsset) {
        pairs.push(`${otherAsset.symbol}/${defaultToken}`);
        return pairs;
      }
      return pairs;
    } catch (e) {
      console.log(e);
      return pairs;
    }
  }, [defaultToken, dbApi]);

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
            volume: "0",
            latest: "0",
            percentChange: "0",
          },
        } as PairNameAndMarketStats;
      }
    },
    [getAssetBySymbol, getMarketPairStats]
  );

  return {
    getMarketPairStats,
    getDefaultPairs,
    formPairStats,
  };
}
