import { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "../../../../../common/hooks/useLocalStorage";
import { Exchanges } from "../../../../../common/types/Exchanges";

import { UsePairSelectResult } from "./usePariSelect.types";

export function usePairSelect(): UsePairSelectResult {
  const [jsonExchanges, setJsonExchanges] = useLocalStorage("exchanges");
  const [activePair, setActivePair] = useState<string>("");
  const [recentPairs, setRecentPairs] = useState<string[]>([]);

  const handleSelectPair = useCallback(
    (selectedPair: string) => {
      setActivePair(selectedPair);
      let list: string[] = [];
      recentPairs.includes(selectedPair)
        ? (list = [...recentPairs])
        : [...recentPairs, selectedPair];

      setRecentPairs([...list]);
      setJsonExchanges(
        JSON.stringify({
          active: selectedPair,
          list: [...list],
        })
      );
    },
    [recentPairs, setRecentPairs, setActivePair, setJsonExchanges]
  );

  useEffect(() => {
    const exchanges: Exchanges = JSON.parse(jsonExchanges as string);
    setActivePair(exchanges.active);
    setRecentPairs(exchanges.list);
  }, [jsonExchanges, setActivePair, setRecentPairs]);
  return {
    activePair,
    recentPairs,
    handleSelectPair,
  };
}
