import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../../common/hooks";
import { useMarketContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";

import { UseMarketPageResult } from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { getAssetsBySymbols } = useAsset();
  const { selectedPair, setSelectedPair } = useMarketContext();
  const [loadingSelectedPair, setLoadingSelectedPair] = useState<boolean>(true);
  const [isPairModalVisible, setIsPairModalVisible] = useState<boolean>(false);
  //   const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const getPairAssets = useCallback(async () => {
    const assetsSymbols = currentPair.split("_");
    try {
      const quoteBase = await getAssetsBySymbols(assetsSymbols);
      if (quoteBase.length > 1) {
        const base = quoteBase.find(
          (asset) => asset.symbol === assetsSymbols[0]
        ) as Asset;
        const quote = quoteBase.find(
          (asset) => asset.symbol === assetsSymbols[1]
        ) as Asset;
        return { base, quote };
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentPair, getAssetsBySymbols]);

  const handleClickOnPair = useCallback(() => {
    setIsPairModalVisible(true);
  }, [setIsPairModalVisible]);

  useEffect(() => {
    let ignore = false;
    async function setPairAssets() {
      setLoadingSelectedPair(true);
      const baseQuote = await getPairAssets();
      if (!ignore && baseQuote) {
        setSelectedPair({ base: baseQuote.base, quote: baseQuote.quote });
        setLoadingSelectedPair(false);
      }
    }
    setPairAssets();
    return () => {
      ignore = true;
    };
  }, [setLoadingSelectedPair, getPairAssets, setSelectedPair]);

  return {
    selectedPair,
    loadingSelectedPair,
    isPairModalVisible,
    handleClickOnPair,
    setIsPairModalVisible,
    // pageLoaded,
  };
}
