import { useMemo } from "react";

import { useUserContext } from "../../../../../common/providers";

type UseWalletResult = {
  balances: { baseAmount: number; quoteAmount: number };
};
type Args = {
  currentPair: string;
};

export function useWallet({ currentPair }: Args): UseWalletResult {
  const { assets } = useUserContext();

  const balances = useMemo(() => {
    const baseSymbol = currentPair.split("_")[1];
    const quoteSymbol = currentPair.split("_")[0];
    if (assets && assets.length > 0) {
      const userBaseAsset = assets.find((asset) => asset.symbol === baseSymbol);
      const userQuoteAsset = assets.find(
        (asset) => asset.symbol === quoteSymbol
      );
      const baseAmount = userBaseAsset ? (userBaseAsset.amount as number) : 0;
      const quoteAmount = userQuoteAsset
        ? (userQuoteAsset.amount as number)
        : 0;
      return { baseAmount, quoteAmount };
    } else {
      return { baseAmount: 0, quoteAmount: 0 };
    }
  }, [assets, assets.length, currentPair]);

  return {
    balances,
  };
}
