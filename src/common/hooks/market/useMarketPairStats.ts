import { useCallback, useEffect, useState } from "react";

import { useAsset, useMarketHistory } from "..";
import {
  BITCOIN_ASSET_SYMBOL,
  defaultToken,
  HBD_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
} from "../../../api/params";
import {
  Asset,
  MarketPairStats,
  OrderHistory,
  PairNameAndMarketStats,
} from "../../types";
import { useOrderBook } from "../market/useOrderBook";

import { UseMarketPairStatsResult } from "./useMarketPairStats.types";

export function useMarketPairStats(): UseMarketPairStatsResult {
  const { getAllAssets, limitByPrecision, ceilPrecision } = useAsset();
  const { getOrderBook } = useOrderBook();
  const { getTicker, getFillOrderHistory } = useMarketHistory();
  const [allAssets, _setAllAssets] = useState<Asset[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  //to-do: refactor or remove
  const getMarketPairStats = useCallback(async (base: Asset, quote: Asset) => {
    let latest = "0",
      latestIsBuyOrder = false,
      percentChange = "0",
      volume = "0",
      ask_quote = "0",
      bid_quote = "0",
      dailyHigh = "0",
      dailyLow = "0";
    try {
      const ticker = await getTicker(base, quote);
      const tradeHistory = await getFillOrderHistory(base, quote);
      const askBids = await getOrderBook(base, quote);

      const latestAskQuote = askBids?.asks[0]?.quote;
      const latestBidQuote = askBids?.bids[0]?.quote;

      if (tradeHistory && tradeHistory.length > 0) {
        const lastTrade = tradeHistory[0];

        const { pays } = (lastTrade as OrderHistory).op;
        // this is sell orders
        if (pays.asset_id === base.id) {
          latestIsBuyOrder = false;
          //this is buy orders
        } else {
          latestIsBuyOrder = true;
        }
      }
      if (ticker) {
        latest = ceilPrecision(ticker.latest, base.precision);
        percentChange = limitByPrecision(ticker.percent_change, base.precision);
        volume = limitByPrecision(ticker.quote_volume, 3);
        ask_quote = limitByPrecision(latestAskQuote, base.precision);
        bid_quote = limitByPrecision(latestBidQuote, base.precision);
        dailyHigh = limitByPrecision(ticker?.highest_bid, base.precision);
        dailyLow = limitByPrecision(ticker?.lowest_ask, base.precision);
      }
    } catch (e) {
      console.log(e);
    }
    return {
      latest,
      latestIsBuyOrder,
      percentChange,
      volume,
      ask_quote,
      bid_quote,
      dailyHigh,
      dailyLow,
    } as MarketPairStats;
  }, []);

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
