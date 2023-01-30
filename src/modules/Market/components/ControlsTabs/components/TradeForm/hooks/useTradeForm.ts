import { useRouter } from "next/router";
import { useMemo } from "react";

import { useUserContext } from "../../../../../../../common/providers";

import { UseTradeFormResult } from "./useTradeForm.types";

type Args = {
  isBuyForm: boolean;
};
export function useTradeForm({ isBuyForm }: Args): UseTradeFormResult {
  const { assets } = useUserContext();
  const router = useRouter();
  const { pair } = router.query;
  const balance = useMemo(() => {
    const baseSymbol = (pair as string).split("_")[1];
    const quoteSymbol = (pair as string).split("_")[0];
    if (assets && assets.length > 0) {
      const userBaseAsset = assets.find((asset) => asset.symbol === baseSymbol);
      const userQuoteAsset = assets.find(
        (asset) => asset.symbol === quoteSymbol
      );
      const baseAmount = userBaseAsset ? (userBaseAsset.amount as number) : 0;
      const quoteAmount = userQuoteAsset
        ? (userQuoteAsset.amount as number)
        : 0;
      return isBuyForm
        ? `${baseAmount} ${baseSymbol}`
        : `${quoteAmount} ${quoteSymbol}`;
    } else {
      return `0 ${isBuyForm ? baseSymbol : quoteSymbol}`;
    }
  }, [assets, pair, isBuyForm]);
  return {
    balance,
  };
}
