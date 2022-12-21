import counterpart from "counterpart";
import { useCallback, useMemo, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
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
  selectedAssets,
  loadingSelectedPair,
  isBuyOrder,
  orderForm,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
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
  const { limitByPrecision, roundNum } = useAsset();

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
      return isBuyOrder ? userBaseAssetAmount : userQuoteAssetAmount;
    } else {
      return 0;
    }
  }, [assets, selectedAssets, loadingSelectedPair, isBuyOrder]);

  const fees = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      const createLimitOrderFee = calculateCreateLimitOrderFee(
        selectedAssets.base,
        selectedAssets.quote
      );
      if (createLimitOrderFee !== undefined) {
        const feeAmount = createLimitOrderFee.fee;
        const marketFeePercent = isBuyOrder
          ? createLimitOrderFee.buyMarketFeePercent
          : createLimitOrderFee.sellMarketFeePercent;
        return { feeAmount, marketFeePercent };
      } else {
        return { feeAmount: 0, marketFeePercent: 0 };
      }
    } else {
      return { feeAmount: 0, marketFeePercent: 0 };
    }
  }, [loadingSelectedPair, selectedAssets, calculateCreateLimitOrderFee]);

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
      if (!loadingSelectedPair && selectedAssets) {
        if (changedValues.price) {
          handleFieldAssetPrecission(
            changedValues.price,
            "price",
            selectedAssets.base.precision
          );
        } else if (changedValues.total) {
          handleFieldAssetPrecission(
            changedValues.total,
            "total",
            selectedAssets.base.precision
          );
        } else if (changedValues.quantity) {
          handleFieldAssetPrecission(
            changedValues.quantity,
            "quantity",
            selectedAssets.quote.precision
          );
        }
      }
    },
    [selectedAssets, loadingSelectedPair, handleFieldAssetPrecission]
  );

  const handleRelationsBetweenInputs = useCallback(
    (changedValues, allValues) => {
      let baseRoundTo = 5;
      if (!loadingSelectedPair && selectedAssets) {
        baseRoundTo = selectedAssets.base.precision;
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
    [orderForm, selectedAssets]
  );

  const handleValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      handleAssetPrecission(changedValues);
      handleRelationsBetweenInputs(changedValues, allValues);
    },
    [handleAssetPrecission, handleRelationsBetweenInputs]
  );

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
        selectedAssets?.base as Asset,
        selectedAssets?.quote as Asset,
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
      selectedAssets,
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
      (asset) => asset.symbol === selectedAssets?.quote.symbol
    );
    if (!isBuyOrder) {
      if (!userQuoteAsset) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
      if (selectedAssets?.quote.symbol === defaultToken) {
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
      (asset) => asset.symbol === selectedAssets?.base.symbol
    );
    if (!userBaseAsset) {
      errorMessage = counterpart.translate(`field.errors.balance_not_enough`);
    }
    if (selectedAssets?.base.symbol === defaultToken) {
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

  return {
    fees,
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
