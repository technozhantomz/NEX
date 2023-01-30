import counterpart from "counterpart";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { defaultToken } from "../../../../../../../api/params";
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
  const amount: string = Form.useWatch("amount", orderForm);
  const total: string = Form.useWatch("total", orderForm);
  console.log(price, amount, total);

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

  const validatePrice = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.price_should_greater`))
      );
    }
    return Promise.resolve();
  };
  const validateAmount = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.quantity_should_greater`))
      );
    }
    const userQuoteAsset = assets.find(
      (asset) => asset.symbol === selectedPair?.quote.symbol
    );
    if (!isBuyForm) {
      if (!userQuoteAsset) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
      if (selectedPair?.quote.symbol === defaultToken) {
        if (
          Number(value) + fees.feeAmount >
          (userQuoteAsset?.amount as number)
        ) {
          return Promise.reject(
            new Error(counterpart.translate(`field.errors.balance_not_enough`))
          );
        }
      } else {
        if (Number(value) > (userQuoteAsset?.amount as number)) {
          return Promise.reject(
            new Error(counterpart.translate(`field.errors.balance_not_enough`))
          );
        }
      }
    }
    return Promise.resolve();
  };

  const formValidation = {
    price: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      { validator: validatePrice },
    ],
    amount: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      { validator: validateAmount },
    ],
  };

  return {
    balance,
    fees,
    formValidation,
  };
}
