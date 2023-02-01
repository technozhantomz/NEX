import { RadioChangeEvent } from "antd";
import counterpart from "counterpart";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

import { defaultToken } from "../../../../../../../api/params";
import { useAsset, useFees } from "../../../../../../../common/hooks";
import {
  useMarketContext,
  useUserContext,
} from "../../../../../../../common/providers";

import { UseOrderFormResult } from "./useOrderForm.types";

type Args = {
  isBuyForm: boolean;
  formType: "limit" | "market";
};
export function useOrderForm({ isBuyForm }: Args): UseOrderFormResult {
  const { assets } = useUserContext();
  const { limitByPrecision, roundNum } = useAsset();
  const router = useRouter();
  const { pair } = router.query;
  const {
    buyOrderForm,
    sellOrderForm,
    selectedPair,
    lastTradeHistory,
    asks,
    bids,
  } = useMarketContext();
  const orderForm = useMemo(() => {
    return isBuyForm ? buyOrderForm : sellOrderForm;
  }, [isBuyForm, buyOrderForm, sellOrderForm]);
  const { calculateCreateLimitOrderFee } = useFees();
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

  const precisions = useMemo(() => {
    if (selectedPair) {
      const leastPrecision = 1;
      let firstPrecision = 5;
      let secondPrecision = 5;
      const isSamePrecisions =
        selectedPair.base.precision === selectedPair.quote.precision;
      if (isSamePrecisions) {
        firstPrecision = Math.floor(selectedPair.base.precision / 2);
        secondPrecision = Math.floor(selectedPair.base.precision / 2);
      } else {
        const smallToBigRatio =
          selectedPair.base.precision > selectedPair.quote.precision
            ? {
                ratio:
                  selectedPair.quote.precision / selectedPair.base.precision,
                isBaseBigger: true,
              }
            : {
                ratio:
                  selectedPair.base.precision / selectedPair.quote.precision,
                isBaseBigger: false,
              };
        firstPrecision = smallToBigRatio.isBaseBigger
          ? Math.round(selectedPair.quote.precision * smallToBigRatio.ratio)
          : Math.round(selectedPair.base.precision * smallToBigRatio.ratio);
        secondPrecision = selectedPair.base.precision - firstPrecision;
        if (firstPrecision === 0) {
          firstPrecision = leastPrecision;
          secondPrecision = secondPrecision - leastPrecision;
        }
        if (secondPrecision === 0) {
          secondPrecision = leastPrecision;
          firstPrecision = firstPrecision - leastPrecision;
        }
      }
      const bigPrecision =
        firstPrecision >= secondPrecision ? firstPrecision : secondPrecision;
      const smallPrecision =
        firstPrecision >= secondPrecision ? secondPrecision : firstPrecision;
      return {
        price:
          selectedPair.base.precision >= selectedPair.quote.precision
            ? bigPrecision
            : smallPrecision,
        amount:
          selectedPair.quote.precision >= selectedPair.base.precision
            ? bigPrecision
            : smallPrecision,
        total: selectedPair.base.precision,
      };
    } else {
      return {
        price: 5,
        amount: 5,
        total: 5,
      };
    }
  }, [selectedPair]);
  const [priceRadioValue, setPriceRadioValue] = useState<string>();
  const [priceSliderValue, setPriceSliderValue] = useState<number>(0);
  const handleFieldPrecision = useCallback(
    (fieldValue: string, fieldName: string, assetPrecision: number) => {
      const precisedValue = limitByPrecision(fieldValue, assetPrecision);

      const fieldsValueObject: {
        [fieldName: string]: string;
      } = {};
      fieldsValueObject[`${fieldName}`] = precisedValue;

      orderForm.setFieldsValue(fieldsValueObject);
    },
    [orderForm, limitByPrecision]
  );
  const handleFormPrecision = useCallback(
    (changedValues: any) => {
      if (selectedPair) {
        if (changedValues.price) {
          handleFieldPrecision(changedValues.price, "price", precisions.price);
        }
        if (changedValues.amount) {
          handleFieldPrecision(
            changedValues.amount,
            "amount",
            precisions.amount
          );
        }
        if (changedValues.total) {
          handleFieldPrecision(changedValues.total, "total", precisions.total);
        }
      }
    },
    [selectedPair, handleFieldPrecision, isBuyForm, precisions]
  );
  const handleRelationsBetweenInputs = useCallback(
    (changedValues: any, allValues: any) => {
      let baseRoundTo = 5;
      if (selectedPair) {
        baseRoundTo = selectedPair.base.precision;
      }
      if (changedValues.price || changedValues.amount) {
        if (
          allValues.price &&
          allValues.price > 0 &&
          allValues.amount &&
          allValues.amount > 0
        ) {
          orderForm.setFieldsValue({
            total: roundNum(allValues.price * allValues.amount, baseRoundTo),
          });
        } else {
          orderForm.setFieldsValue({
            total: undefined,
          });
        }
      }
    },
    [orderForm, selectedPair]
  );
  const specifyPriceSliderValue = useCallback(() => {
    const allValues = orderForm.getFieldsValue() as any;
    if (isBuyForm) {
      const userBaseBalance =
        assets && assets.length
          ? assets.find((asset) => asset.symbol === selectedPair?.base.symbol)
              ?.amount
          : 0;
      if (allValues.total) {
        const sliderValue = !userBaseBalance
          ? 0
          : Math.floor((allValues.total / userBaseBalance) * 100);
        setPriceSliderValue(sliderValue);
      } else {
        setPriceSliderValue(0);
      }
    } else {
      const userQuoteBalance =
        assets && assets.length
          ? assets.find((asset) => asset.symbol === selectedPair?.quote.symbol)
              ?.amount
          : 0;
      if (allValues.amount) {
        const sliderValue = !userQuoteBalance
          ? 0
          : Math.floor((allValues.amount / userQuoteBalance) * 100);
        setPriceSliderValue(sliderValue);
      } else {
        setPriceSliderValue(0);
      }
    }
  }, [orderForm, isBuyForm, assets, selectedPair, setPriceSliderValue]);
  const handleValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      handleFormPrecision(changedValues);
      handleRelationsBetweenInputs(changedValues, allValues);
      specifyPriceSliderValue();
    },
    [handleFormPrecision, handleRelationsBetweenInputs, specifyPriceSliderValue]
  );
  const handlePriceRadioGroupChange = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      setPriceRadioValue(value);
      const currentPrice = lastTradeHistory
        ? lastTradeHistory.price
        : undefined;
      let price: string | undefined = undefined;
      const orders = isBuyForm ? asks : bids;
      switch (value) {
        case "mid":
          price = currentPrice;
          break;
        case "book":
          price = orders && orders.length ? orders[0].price : undefined;
          break;
        case "1":
          price = currentPrice
            ? String(Number(currentPrice) * 0.99)
            : undefined;
          break;
        case "5":
          price = currentPrice
            ? String(Number(currentPrice) * 0.95)
            : undefined;
          break;
        case "10":
          price = currentPrice ? String(Number(currentPrice) * 0.9) : undefined;
          break;
      }
      orderForm.setFieldsValue({
        price: price,
      });
      const allValues = orderForm.getFieldsValue();
      handleValuesChange({ price: price }, allValues);
    },
    [
      setPriceRadioValue,
      orderForm,
      lastTradeHistory,
      isBuyForm,
      asks,
      bids,
      handleValuesChange,
    ]
  );
  const clearPriceRadioGroup = useCallback(() => {
    setPriceRadioValue(undefined);
  }, [setPriceRadioValue]);
  const handlePriceSliderChange = useCallback(
    (value: number) => {
      if (isBuyForm) {
        const userBaseAsset =
          assets && assets.length
            ? assets.find((asset) => asset.symbol === selectedPair?.base.symbol)
                ?.amount
            : 0;
        const total = userBaseAsset
          ? String(userBaseAsset * (value / 100))
          : "0";
        const formPrice: string = orderForm.getFieldValue("price");
        const askPrice = asks && asks.length ? asks[0].price : undefined;
        const price = formPrice && formPrice !== "0" ? formPrice : askPrice;
        const amount = price ? String(Number(total) / Number(price)) : "0";
        orderForm.setFieldsValue({
          amount: amount,
          price: price,
          total: total,
        });
        const allValues = orderForm.getFieldsValue();
        handleValuesChange(
          {
            amount: amount,
            price: price,
            total: total,
          },
          allValues
        );
      } else {
        const userQuoteBalance =
          assets && assets.length
            ? assets.find(
                (asset) => asset.symbol === selectedPair?.quote.symbol
              )?.amount
            : 0;
        const amount = userQuoteBalance
          ? String(userQuoteBalance * (value / 100))
          : "0";
        orderForm.setFieldsValue({
          amount: amount,
        });
        const allValues = orderForm.getFieldsValue();
        handleValuesChange({ amount: amount }, allValues);
      }
    },
    [
      setPriceSliderValue,
      isBuyForm,
      assets,
      selectedPair,
      asks,
      orderForm,
      handleValuesChange,
    ]
  );

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
        new Error(counterpart.translate(`field.errors.amount_should_greater`))
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

  const validateTotalForBuyOrders = (value: number) => {
    let errorMessage = "";
    const userBaseAsset = assets.find(
      (asset) => asset.symbol === selectedPair?.base.symbol
    );
    if (!userBaseAsset) {
      errorMessage = counterpart.translate(`field.errors.balance_not_enough`);
    }
    if (selectedPair?.base.symbol === defaultToken) {
      if (Number(value) + fees.feeAmount > (userBaseAsset?.amount as number)) {
        errorMessage = counterpart.translate(`field.errors.balance_not_enough`);
      }
    } else {
      if (Number(value) > (userBaseAsset?.amount as number)) {
        errorMessage = counterpart.translate(`field.errors.balance_not_enough`);
      }
    }
    if (
      userBaseAsset === undefined ||
      Number(value) > (userBaseAsset?.amount as number)
    ) {
      errorMessage = counterpart.translate(`field.errors.balance_not_enough`);
    }
    return errorMessage;
  };

  const validateTotal = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.total_should_greater`))
      );
    }
    const userDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    if (
      userDefaultAsset === undefined ||
      fees.feeAmount > (userDefaultAsset?.amount as number)
    ) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.balance_not_enough_to_pay`)
        )
      );
    }

    if (isBuyForm) {
      const errorMessage = validateTotalForBuyOrders(value);
      if (errorMessage !== "") {
        return Promise.reject(new Error(errorMessage));
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
    total: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      { validator: validateTotal },
    ],
  };

  const timePolicyOptions = [
    {
      label: counterpart.translate(
        "pages.market.tabs.controls.good_til_canceled"
      ),
      value: "good-til-canceled",
    }, // remember to pass the key prop
    {
      label: counterpart.translate("pages.market.tabs.controls.good_til_time"),
      value: "good-til-time",
    },
    {
      label: counterpart.translate("pages.market.tabs.controls.fill_or_kill"),
      value: "fill-or-kill",
    },
    {
      label: counterpart.translate(
        "pages.market.tabs.controls.maker_or_cancel"
      ),
      value: "maker-or-cancel",
    },
    {
      label: counterpart.translate(
        "pages.market.tabs.controls.immediate_or_cancel"
      ),
      value: "immediate-or-cancel",
    },
  ];

  return {
    balance,
    fees,
    formValidation,
    timePolicyOptions,
    handleValuesChange,
    orderForm,
    handlePriceRadioGroupChange,
    priceRadioValue,
    clearPriceRadioGroup,
    handlePriceSliderChange,
    priceSliderValue,
  };
}
