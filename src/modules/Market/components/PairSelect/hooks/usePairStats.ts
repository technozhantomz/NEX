import { useCallback, useEffect, useState } from "react";

import { roundNum } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import { usePairSelect } from "./usePairSelect";
import { Ticker, UsePairStatsResult } from "./usePairStats.types";
// We should get additional infor for bit assets
export function usePairStats(): UsePairStatsResult {
  // latest price for base asset in 24hr
  const [latest, setLatest] = useState<number>(0);
  // change in price of base asset in 24hr
  const [change, setChange] = useState<number>(0);
  // trade volume of quote asset in 24hr
  const [volume, setVolume] = useState<number>(0);
  const { currentBase, currentQuote } = usePairSelect();
  const { dbApi } = usePeerplaysApiContext();

  const getPairStats = useCallback(
    async (base: Asset, quote: Asset) => {
      const ticker: Ticker = await dbApi("get_ticker", [
        base.symbol,
        quote.symbol,
      ]);

      setLatest(roundNum(Number(ticker.latest), base.precision));
      setChange(roundNum(Number(ticker.percent_change, 1)) || 0.0);
      setVolume(roundNum(Number(ticker.quote_volume), 3));
    },
    [dbApi, setLatest, setChange, setVolume]
  );
  useEffect(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getPairStats(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getPairStats]);
  return {
    latest,
    change,
    volume,
  };
}
