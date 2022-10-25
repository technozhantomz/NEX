import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
  roundNum,
  useAccount,
  useAsset,
  useFees,
  useOrderTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset, SignerKey } from "../../../../../common/types";
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
  orderForm,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [marketFeePercent, setMarketFeePercent] = useState<number>(0);
  const [balance, _setBalance] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);

  const price: string = Form.useWatch("price", orderForm);
  const quantity: string = Form.useWatch("quantity", orderForm);
  const total: string = Form.useWatch("total", orderForm);
  const { formAccountBalancesByName } = useAccount();
  const { calculateCreateLimitOrderFee } = useFees();
  const { localStorageAccount, assets, id } = useUserContext();
  const { buildTrx } = useTransactionBuilder();
  const { buildCreateLimitOrderTransaction } = useOrderTransactionBuilder();
  const { limitByPrecision } = useAsset();

  const handleFieldAssetPrecission = useCallback(
    (fieldValue: number, fieldName: string, assetPrecission: number) => {
      const precisedValue = limitByPrecision(
        String(fieldValue),
        assetPrecission
      );

      const fieldsValueObject: {
        [fieldName: string]: string;
      } = {};
      fieldsValueObject[`${fieldName}`] = precisedValue;

      orderForm.setFieldsValue(fieldsValueObject);
    },
    [orderForm, limitByPrecision]
  );

  const handleAssetPrecission = useCallback(
    (changedValues) => {
      if (
        !loadingSelectedPair &&
        currentBase !== undefined &&
        currentQuote !== undefined
      ) {
        if (changedValues.price) {
          handleFieldAssetPrecission(
            changedValues.price,
            "price",
            currentBase.precision
          );
        } else if (changedValues.total) {
          handleFieldAssetPrecission(
            changedValues.total,
            "total",
            currentBase.precision
          );
        } else if (changedValues.quantity) {
          handleFieldAssetPrecission(
            changedValues.quantity,
            "quantity",
            currentQuote.precision
          );
        }
      }
    },
    [currentBase, currentQuote, loadingSelectedPair, handleFieldAssetPrecission]
  );

  const handleRelationsBetweenInputs = useCallback(
    (changedValues, allValues) => {
      let baseRoundTo = 5;
      if (
        !loadingSelectedPair &&
        currentBase !== undefined &&
        currentQuote !== undefined
      ) {
        baseRoundTo = currentBase.precision;
      }
      if (changedValues.price || changedValues.quantity) {
        if (
          allValues.price &&
          allValues.price > 0 &&
          allValues.quantity &&
          allValues.quantity > 0
        ) {
          orderForm.setFieldsValue({
            total: roundNum(allValues.price * allValues.quantity, baseRoundTo),
          });
        }
      }
    },
    [orderForm, currentBase, currentQuote]
  );

  const handleValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      handleAssetPrecission(changedValues);
      handleRelationsBetweenInputs(changedValues, allValues);
    },
    [handleAssetPrecission, handleRelationsBetweenInputs]
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
        const userBaseAssetAmount = userBaseAsset
          ? (userBaseAsset.amount as number)
          : 0;
        const userQuoteAssetAmount = userQuoteAsset
          ? (userQuoteAsset.amount as number)
          : 0;
        isBuyOrder
          ? _setBalance(userBaseAssetAmount)
          : _setBalance(userQuoteAssetAmount);
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
    async (signerKey: SignerKey) => {
      setTransactionErrorMessage("");
      const values = orderForm.getFieldsValue();
      const expiration = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365
      ).toISOString();

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
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.limit_order_successfully`)
        );
        setLoadingTransaction(false);
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      setTransactionErrorMessage,
      orderForm,
      buildCreateLimitOrderTransaction,
      id,
      currentBase,
      currentQuote,
      isBuyOrder,
      buildTrx,
      setLoadingTransaction,
      localStorageAccount,
      formAccountBalancesByName,
      setTransactionSuccessMessage,
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

  const validateQuantity = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.quantity_should_greater`))
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

  const validateTotalForBuyOrders = (value: number) => {
    let errorMessage = "";
    const userBaseAsset = assets.find(
      (asset) => asset.symbol === currentBase?.symbol
    );
    if (!userBaseAsset) {
      errorMessage = counterpart.translate(`field.errors.balance_not_enough`);
    }
    if (currentBase?.symbol === defaultToken) {
      if (Number(value) + feeAmount > (userBaseAsset?.amount as number)) {
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
      feeAmount > (userDefaultAsset?.amount as number)
    ) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.balance_not_enough_to_pay`)
        )
      );
    }

    if (isBuyOrder) {
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
