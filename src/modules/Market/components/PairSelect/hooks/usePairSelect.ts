import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useSettingsContext } from "../../../../../common/components/SettingsProvider";
import { Asset } from "../../../../../common/types/Asset";
import { Exchanges } from "../../../../../common/types/Exchanges";

import { UsePairSelectResult } from "./usePariSelect.types";

export function usePairSelect(): UsePairSelectResult {
  const { exchanges, setExchanges } = useSettingsContext();
  // Active pair example: BTC_TEST
  const [activePair, setActivePair] = useState<string>(exchanges.active);
  // Recent pairs example: ["BTC / TEST"]
  const [recentPairs, setRecentPairs] = useState<string[]>([]);
  const { dbApi } = usePeerplaysApiContext();
  const [currentBase, setCurrentBase] = useState<Asset>();
  const [currentQuote, setCurrentQuote] = useState<Asset>();
  const [visible, setVisible] = useState<boolean>(false);

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

        setExchanges({
          active: selectedPair,
          list: [...list],
        } as Exchanges);
      }
    },
    [recentPairs, setExchanges]
  );

  const onSelectPair = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setActivePair(exchanges.active);
    setRecentPairs(exchanges.list);
    getPairData(exchanges.active.split("_"));
  }, [exchanges, setActivePair, setRecentPairs, getPairData]);
  return {
    visible,
    activePair,
    recentPairs,
    currentBase,
    currentQuote,
    handleSelectPair,
    onSelectPair,
    onCancel,
  };
}
