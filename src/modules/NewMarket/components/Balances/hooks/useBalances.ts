import { useMemo } from "react";

import { useUserContext } from "../../../../../common/providers";
import { PairAssets } from "../../../../Market/types";

type UseBalancesResult = {
  balance: { userBaseAssetAmount: number; userQuoteAssetAmount: number };
};

export function useBalances(
  selectedAssets: PairAssets | undefined,
  loadingSelectedPair: boolean
): UseBalancesResult {
  const { assets } = useUserContext();

  const balance = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets && assets.length > 0) {
      const userBaseAsset = assets.find(
        (asset) => asset.symbol === selectedAssets.base.symbol
      );
      const userQuoteAsset = assets.find(
        (asset) => asset.symbol === selectedAssets.quote.symbol
      );
      const userBaseAssetAmount = userBaseAsset
        ? (userBaseAsset.amount as number)
        : 0;
      const userQuoteAssetAmount = userQuoteAsset
        ? (userQuoteAsset.amount as number)
        : 0;
      return { userBaseAssetAmount, userQuoteAssetAmount };
    } else {
      return { userBaseAssetAmount: 0, userQuoteAssetAmount: 0 };
    }
  }, [assets, selectedAssets, loadingSelectedPair]);

  return {
    balance,
  };
}
