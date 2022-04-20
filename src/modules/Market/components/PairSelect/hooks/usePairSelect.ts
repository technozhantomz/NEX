import { useCallback, useEffect, useState } from "react";

import { useUpdateExchanges } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import { UsePairSelectResult } from "./usePariSelect.types";

export function usePairSelect(currentPair: string): UsePairSelectResult {
  // Active pair example: BTC_TEST
  // Recent pairs example: ["BTC/TEST"]
  const { dbApi } = usePeerplaysApiContext();
  const [currentBase, setCurrentBase] = useState<Asset>();
  const [currentQuote, setCurrentQuote] = useState<Asset>();
  const [loading, setLoading] = useState<boolean>(true);
  const { exchanges, updateExchanges } = useUpdateExchanges();

  const getPairAssets = useCallback(
    async (assets: string[]) => {
      try {
        setLoading(true);
        const [quote, base] = await dbApi("lookup_asset_symbols", [assets]);
        setCurrentBase(base as Asset);
        setCurrentQuote(quote as Asset);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    },
    [dbApi, setCurrentBase, setCurrentQuote, setLoading]
  );

  useEffect(() => {
    if (currentPair !== exchanges.active) {
      updateExchanges(currentPair);
    }
    getPairAssets(currentPair.split("_"));
    // I think should remove exchanges
  }, [currentPair, exchanges, getPairAssets, updateExchanges]);

  return {
    loading,
    currentBase,
    currentQuote,
  };
}
