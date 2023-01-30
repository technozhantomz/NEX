import { useRouter } from "next/router";
import { useMemo } from "react";

import { useFees } from "../../../../../../../common/hooks";
import {
  useMarketContext,
  useUserContext,
} from "../../../../../../../common/providers";
import { Form } from "../../../../../../../ui/src";

import { UseOrderFormResult } from "./useOrderForm.types";

type Args = {
  isBuyForm: boolean;
};
export function useOrderForm({ isBuyForm }: Args): UseOrderFormResult {
  const { assets } = useUserContext();
  const router = useRouter();
  const { pair } = router.query;
  const { buyOrderForm, sellOrderForm, selectedPair } = useMarketContext();
  const orderForm = isBuyForm ? buyOrderForm : sellOrderForm;
  const { calculateCreateLimitOrderFee } = useFees();

  const price: string = Form.useWatch("price", orderForm);
  const quantity: string = Form.useWatch("quantity", orderForm);
  const total: string = Form.useWatch("total", orderForm);
  console.log(price, quantity, total);

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

  const fees = useMemo(() => {
    if (selectedPair) {
      const createLimitOrderFee = calculateCreateLimitOrderFee(
        selectedPair.base,
        selectedPair.quote
      );
      if (createLimitOrderFee !== undefined) {
        const feeAmount = createLimitOrderFee.fee;
        const marketFeePercent = isBuyForm
          ? createLimitOrderFee.buyMarketFeePercent
          : createLimitOrderFee.sellMarketFeePercent;
        return { feeAmount, marketFeePercent };
      } else {
        return { feeAmount: 0, marketFeePercent: 0 };
      }
    } else {
      return { feeAmount: 0, marketFeePercent: 0 };
    }
  }, [selectedPair, calculateCreateLimitOrderFee, isBuyForm]);

  return {
    balance,
    fees,
  };
}
