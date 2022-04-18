import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import {
  usePeerplaysApiContext,
  useSettingsContext,
} from "../../../../../common/providers";
import { Asset, Exchanges } from "../../../../../common/types";

import { UsePairSelectResult } from "./usePariSelect.types";

export function usePairSelect(
  currentPair?: string | undefined
): UsePairSelectResult {
  const { exchanges, setExchanges } = useSettingsContext();
  // Active pair example: BTC_TEST
  const [activePair, setActivePair] = useState<string>(exchanges.active);
  // Recent pairs example: ["BTC / TEST"]
  const [recentPairs, setRecentPairs] = useState<string[]>([]);
  const { dbApi } = usePeerplaysApiContext();
  const [currentBase, setCurrentBase] = useState<Asset>();
  const [currentQuote, setCurrentQuote] = useState<Asset>();
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();

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
      if (selectedPair !== activePair) {
        recentPairs.includes(selectedPair.split("_").join("/"))
          ? (exchanges.list = [...recentPairs])
          : exchanges.list.push(selectedPair.split("_").join("/"));

        setExchanges({
          active: selectedPair,
          list: exchanges.list,
        } as Exchanges);
      }
    },
    [recentPairs, setExchanges]
  );

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    console.log(currentPair);
    const { values, forms } = info;
    const { pairModal } = forms;
    if (name === "pairModal") {
      pairModal.validateFields().then(() => {
        setVisible(false);
        router.push(`/market/${values.quote.trim()}_${values.base.trim()}`);
      });
    }
  };

  const onSelectPair = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (currentPair && currentPair !== activePair) handleSelectPair(currentPair as string);
    setActivePair(exchanges.active);
    setRecentPairs(exchanges.list);
    getPairData(exchanges.active.split("_"));
  }, [currentPair, exchanges, setActivePair, setRecentPairs, getPairData]);

  return {
    visible,
    activePair,
    recentPairs,
    currentBase,
    currentQuote,
    handleSelectPair,
    onSelectPair,
    onCancel,
    onFormFinish,
  };
}
