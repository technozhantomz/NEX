import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
  toPrecision,
  useAccount,
  useFees,
  useLimitOrderTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import {
  UseCreateLimitOrderArgs,
  UseCreateLimitOrderResult,
} from "./useCreateLimitOrder.types";

export function useCreateLimitOrder({
  currentBase,
  currentQuote,
  loadingSelectedPair,
  isBuyOrder,
  refreshHistory,
  refreshOrderBook,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [marketFeePercent, setMarketFeePercent] = useState<number>(0);
  const [balance, _setBalance] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);

  const [orderForm] = Form.useForm();
  const price: number = Form.useWatch("price", orderForm);
  const quantity: number = Form.useWatch("quantity", orderForm);
  const total: number = Form.useWatch("total", orderForm);
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateCreateLimitOrderFee } = useFees();
  const { localStorageAccount, assets, id } = useUserContext();
  const { buildTrx } = useTransactionBuilder();

  const { buildCreateLimitOrderTransaction } =
    useLimitOrderTransactionBuilder();

  const handleNegativeValuesAndAssetPrecission = useCallback(
    (changedValues) => {
      if (
        !loadingSelectedPair &&
        currentBase !== undefined &&
        currentQuote !== undefined
      ) {
        if (changedValues.price) {
          if (changedValues.price < 0) {
            orderForm.setFieldsValue({ price: 0 });
          } else if (
            changedValues.price > 0 &&
            changedValues.price.split(".")[1]?.length > currentBase.precision
          ) {
            orderForm.setFieldsValue({
              price: toPrecision(changedValues.price, currentBase.precision),
            });
          }
        } else if (changedValues.total) {
          if (changedValues.total < 0) {
            orderForm.setFieldsValue({ total: 0 });
          } else if (
            changedValues.total > 0 &&
            changedValues.total.split(".")[1]?.length > currentBase.precision
          ) {
            orderForm.setFieldsValue({
              total: toPrecision(changedValues.total, currentBase.precision),
            });
          }
        } else if (changedValues.quantity) {
          if (changedValues.quantity < 0) {
            orderForm.setFieldsValue({ quantity: 0 });
          } else if (
            changedValues.quantity > 0 &&
            changedValues.quantity.split(".")[1]?.length >
              currentQuote.precision
          ) {
            orderForm.setFieldsValue({
              quantity: toPrecision(
                changedValues.quantity,
                currentQuote.precision
              ),
            });
          }
        }
      }
    },
    [orderForm, currentBase, currentQuote, loadingSelectedPair, toPrecision]
  );

  const handleRelationsBetweenInputs = useCallback(
    (changedValues, allValues) => {
      let baseRoundTo = 5;
      let quoteRoundTo = 5;
      if (
        !loadingSelectedPair &&
        currentBase !== undefined &&
        currentQuote != undefined
      ) {
        baseRoundTo = currentBase.precision;
        quoteRoundTo = currentQuote.precision;
      }
      if (changedValues.price || changedValues.quantity) {
        if (
          allValues.price &&
          allValues.price > 0 &&
          allValues.quantity &&
          allValues.quantity > 0
        ) {
          orderForm.setFieldsValue({
            total: toPrecision(
              allValues.price * allValues.quantity,
              baseRoundTo
            ),
          });
        }
      } else if (changedValues.total) {
        if (
          allValues.price &&
          allValues.price > 0 &&
          allValues.total &&
          allValues.total > 0
        ) {
          orderForm.setFieldsValue({
            quantity: toPrecision(
              allValues.total / allValues.price,
              quoteRoundTo
            ),
          });
        }
      }
    },
    [orderForm, currentBase, currentQuote, toPrecision]
  );

  const handleValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      handleNegativeValuesAndAssetPrecission(changedValues);
      handleRelationsBetweenInputs(changedValues, allValues);
    },
    [handleNegativeValuesAndAssetPrecission, handleRelationsBetweenInputs]
  );

  const setBalance = useCallback(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      if (assets.length > 0) {
        const userBaseAsset = assets.find(
          (asset) => asset.symbol === currentBase.symbol
        );
        const userQuoteAsset = assets.find(
          (asset) => asset.symbol === currentQuote.symbol
        );
        isBuyOrder
          ? _setBalance(userBaseAsset ? (userBaseAsset.amount as number) : 0)
          : _setBalance(userQuoteAsset ? (userQuoteAsset.amount as number) : 0);
      }
    }
  }, [
    assets,
    _setBalance,
    currentBase,
    currentQuote,
    loadingSelectedPair,
    isBuyOrder,
  ]);

  const handleCreateLimitOrder = useCallback(
    async (password: string) => {
      setTransactionErrorMessage("");
      const values = orderForm.getFieldsValue();
      const expiration = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365
      ).toISOString();
      const activeKey = getPrivateKey(password, "active");
      const trx = buildCreateLimitOrderTransaction(
        id,
        values.quantity,
        values.total,
        currentBase as Asset,
        currentQuote as Asset,
        expiration,
        false,
        [],
        isBuyOrder
      );
      let trxResult;

      try {
        setLoadingTransaction(true);
        trxResult = await buildTrx([trx], [activeKey]);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        refreshOrderBook();
        refreshHistory();
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.errors.limit_order_successfully`)
        );
        setLoadingTransaction(false);
      } else {
        refreshOrderBook();
        refreshHistory();
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      setTransactionErrorMessage,
      orderForm,
      getPrivateKey,
      buildCreateLimitOrderTransaction,
      id,
      currentBase,
      currentQuote,
      isBuyOrder,
      buildTrx,
      setLoadingTransaction,
      localStorageAccount,
      formAccountBalancesByName,
      refreshOrderBook,
      refreshHistory,
      setTransactionSuccessMessage,
    ]
  );

  const validatePrice = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.pirce_should_greater`))
      );
    }
    return Promise.resolve();
  };

  const validateQuantity = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.pirce_should_greater`))
      );
    }
    const userQuoteAsset = assets.find(
      (asset) => asset.symbol === currentQuote?.symbol
    );
    if (!isBuyOrder) {
      if (!userQuoteAsset) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
      if (currentQuote?.symbol === defaultToken) {
        if (Number(value) + feeAmount > (userQuoteAsset?.amount as number)) {
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

  const validateTotal = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.pirce_should_greater`))
      );
    }
    const userDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    if (
      userDefaultAsset === undefined ||
      feeAmount > (userDefaultAsset?.amount as number)
    ) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.balance_not_enough_to_pay`)
        )
      );
    }

    const userBaseAsset = assets.find(
      (asset) => asset.symbol === currentBase?.symbol
    );
    if (isBuyOrder) {
      if (!userBaseAsset) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
      if (currentBase?.symbol === defaultToken) {
        if (Number(value) + feeAmount > (userBaseAsset?.amount as number)) {
          return Promise.reject(
            new Error(counterpart.translate(`field.errors.balance_not_enough`))
          );
        }
      } else {
        if (Number(value) > (userBaseAsset?.amount as number)) {
          return Promise.reject(
            new Error(counterpart.translate(`field.errors.balance_not_enough`))
          );
        }
      }
      if (
        userBaseAsset === undefined ||
        Number(value) > (userBaseAsset?.amount as number)
      ) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
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
    quantity: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      { validator: validateQuantity },
    ],
    total: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      { validator: validateTotal },
    ],
  };

  useEffect(() => {
    setBalance();
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      const createLimitOrderFee = calculateCreateLimitOrderFee(
        currentBase,
        currentQuote
      );
      if (createLimitOrderFee !== undefined) {
        setFeeAmount(createLimitOrderFee.fee);
        isBuyOrder
          ? setMarketFeePercent(createLimitOrderFee.buyMarketFeePercent)
          : setMarketFeePercent(createLimitOrderFee.sellMarketFeePercent);
      }
    }
  }, [
    setBalance,
    loadingSelectedPair,
    currentQuote,
    currentBase,
    calculateCreateLimitOrderFee,
    setFeeAmount,
    isBuyOrder,
    setMarketFeePercent,
  ]);

  return {
    feeAmount,
    marketFeePercent,
    balance,
    orderForm,
    formValidation,
    handleValuesChange,
    handleCreateLimitOrder,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    price,
    total,
    quantity,
  };
}
