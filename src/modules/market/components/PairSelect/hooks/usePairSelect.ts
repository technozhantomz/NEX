import { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "../../../../../common/hooks/useLocalStorage";
import { Asset } from "../../../../../common/types/Asset";
import { Exchanges } from "../../../../../common/types/Exchanges";
import { usePeerplaysApi } from "../../../../peerplaysApi";

import { UsePairSelectResult } from "./usePariSelect.types";

export function usePairSelect(): UsePairSelectResult {
  const [jsonExchanges, setJsonExchanges] = useLocalStorage("exchanges");
  // Active pair example: BTC_TEST
  const [activePair, setActivePair] = useState<string>(
    (jsonExchanges as Exchanges).active
  );
  // Recent pairs example: ["BTC / TEST"]
  const [recentPairs, setRecentPairs] = useState<string[]>([]);
  const { dbApi } = usePeerplaysApi();
  const [currentBase, setCurrentBase] = useState<Asset>();
  const [currentQuote, setCurrentQuote] = useState<Asset>();

  const getPairData = useCallback(
    async (assets: string[]) => {
      const [quote, base] = await dbApi("lookup_asset_symbols", [assets]);
      setCurrentBase(base as Asset);
      setCurrentQuote(quote as Asset);
    },
    [dbApi, setCurrentBase, setCurrentQuote]
  );

  const handleSelectPair = useCallback(
    (selectedPair: string) => {
      let list: string[] = [];
      if (selectedPair !== activePair) {
        recentPairs.includes(selectedPair.split("_").join(" / "))
          ? (list = [...recentPairs])
          : [...recentPairs, selectedPair];

        setJsonExchanges(
          JSON.stringify({
            active: selectedPair,
            list: [...list],
          })
        );
      }
    },
    [recentPairs, setJsonExchanges]
  );

  useEffect(() => {
    const exchanges = jsonExchanges as Exchanges;
    setActivePair(exchanges.active);
    setRecentPairs(exchanges.list);
    getPairData(exchanges.active.split("_"));
  }, [jsonExchanges, setActivePair, setRecentPairs, getPairData]);
  return {
    activePair,
    recentPairs,
    currentBase,
    currentQuote,
    handleSelectPair,
  };
}
