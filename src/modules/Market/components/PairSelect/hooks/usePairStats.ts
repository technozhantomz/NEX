import { useCallback, useEffect, useState } from "react";

import { useMarketPairStats } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import { UsePairStatsResult } from "./usePairStats.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingAssets: boolean;
};

// We should get additional infor for bit assets
export function usePairStats({
  currentBase,
  currentQuote,
  loadingAssets,
}: Args): UsePairStatsResult {
  // latest price for base asset in 24hr
  const [latest, setLatest] = useState<string>("0");
  // change in price of base asset in 24hr
  const [change, setChange] = useState<string>("0");
  // trade volume of quote asset in 24hr
  const [volume, setVolume] = useState<string>("0");
  const { getMarketPairStats } = useMarketPairStats();
  const { dbApi } = usePeerplaysApiContext();

  const getPairStats = useCallback(
    async (base: Asset, quote: Asset) => {
      const marketPairStats = await getMarketPairStats(base, quote);

      setLatest(marketPairStats.latest);
      setChange(marketPairStats.percentChange);
      setVolume(marketPairStats.volume);
    },
    [dbApi, setLatest, setChange, setVolume]
  );
  useEffect(() => {
    if (
      !loadingAssets &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      getPairStats(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getPairStats, loadingAssets]);
  return {
    latest,
    change,
    volume,
  };
}
