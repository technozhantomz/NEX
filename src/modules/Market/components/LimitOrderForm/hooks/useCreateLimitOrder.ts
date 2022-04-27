import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
  roundNum,
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
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [marketFeePercent, setMarketFeePercent] = useState<number>(0);
  const [balance, _setBalance] = useState<number>(0);
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);

  const [orderForm] = Form.useForm();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateCreateLimitOrderFee } = useFees();
  const { localStorageAccount, assets, id } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();

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
          } else if (changedValues.price > 0) {
            orderForm.setFieldsValue({
              price: roundNum(changedValues.price, currentBase.precision),
            });
          }
        } else if (changedValues.total) {
          if (changedValues.total < 0) {
            orderForm.setFieldsValue({ total: 0 });
          } else if (changedValues.total > 0) {
            orderForm.setFieldsValue({
              total: roundNum(changedValues.total, currentBase.precision),
            });
          }
        } else if (changedValues.quantity) {
          if (changedValues.quantity < 0) {
            orderForm.setFieldsValue({ quantity: 0 });
          } else if (changedValues.quantity > 0) {
            orderForm.setFieldsValue({
              quantity: roundNum(
                changedValues.quantity,
                currentQuote.precision
              ),
            });
          }
        }
      }
    },
    [orderForm, currentBase, currentQuote, loadingSelectedPair, roundNum]
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
            total: roundNum(allValues.price * allValues.quantity, baseRoundTo),
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
            quantity: roundNum(allValues.total / allValues.price, quoteRoundTo),
          });
        }
      }
    },
    [orderForm, currentBase, currentQuote, roundNum]
  );

  const handleValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      handleNegativeValuesAndAssetPrecission(changedValues);
      handleRelationsBetweenInputs(changedValues, allValues);
    },
    [handleNegativeValuesAndAssetPrecission, handleRelationsBetweenInputs]
  );

  const handleCancelPasswordModal = useCallback(() => {
    setIsPasswordModalVisible(false);
  }, [setIsPasswordModalVisible]);

  const confirm = useCallback(() => {
    orderForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  }, [orderForm, setIsPasswordModalVisible]);

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

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleCreateLimitOrder(values.password);
      });
    }
  };

  const resetForm = useCallback(() => {
    orderForm.setFieldsValue({
      price: 0,
      quantity: 0,
      total: 0,
    });
  }, [orderForm]);

  const handleCreateLimitOrder = async (password: string) => {
    setSubmittingPassword(true);
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
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (e) {
      console.log(e);
    }
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setIsPasswordModalVisible(false);
      setSubmittingPassword(false);
      resetForm();
      refreshOrderBook();
      refreshHistory();
      //setStatus();
    } else {
      setIsPasswordModalVisible(false);
      setSubmittingPassword(false);
      refreshOrderBook();
      refreshHistory();
      //setStatus();
    }
  };

  const validatePrice = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(new Error("Price should be greater than 0"));
    }
    return Promise.resolve();
  };

  const validateQuantity = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(new Error("Price should be greater than 0"));
    }
    const userQuoteAsset = assets.find(
      (asset) => asset.symbol === currentQuote?.symbol
    );
    if (!isBuyOrder) {
      if (!userQuoteAsset) {
        return Promise.reject(new Error("Balance is not enough"));
      }
      if (currentQuote?.symbol === defaultToken) {
        if (Number(value) + feeAmount > (userQuoteAsset?.amount as number)) {
          return Promise.reject(new Error("Balance is not enough"));
        }
      } else {
        if (Number(value) > (userQuoteAsset?.amount as number)) {
          return Promise.reject(new Error("Balance is not enough"));
        }
      }
    }
    return Promise.resolve();
  };

  const validateTotal = (_: unknown, value: number) => {
    if (Number(value) <= 0) {
      return Promise.reject(new Error("Price should be greater than 0"));
    }
    const userDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    if (
      userDefaultAsset === undefined ||
      feeAmount > (userDefaultAsset?.amount as number)
    ) {
      return Promise.reject(new Error("Balance is not enough to pay the fee"));
    }

    const userBaseAsset = assets.find(
      (asset) => asset.symbol === currentBase?.symbol
    );
    if (isBuyOrder) {
      if (!userBaseAsset) {
        return Promise.reject(new Error("Balance is not enough"));
      }
      if (currentBase?.symbol === defaultToken) {
        if (Number(value) + feeAmount > (userBaseAsset?.amount as number)) {
          return Promise.reject(new Error("Balance is not enough"));
        }
      } else {
        if (Number(value) > (userBaseAsset?.amount as number)) {
          return Promise.reject(new Error("Balance is not enough"));
        }
      }
      if (
        userBaseAsset === undefined ||
        Number(value) > (userBaseAsset?.amount as number)
      ) {
        return Promise.reject(new Error("Balance is not enough"));
      }
    }
    return Promise.resolve();
  };

  const formValdation = {
    price: [
      { required: true, message: "This field is required" },
      { validator: validatePrice },
    ],
    quantity: [
      { required: true, message: "This field is required" },
      { validator: validateQuantity },
    ],
    total: [
      { required: true, message: "This field is required" },
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
    formValdation,
    isPasswordModalVisible,
    handleCancelPasswordModal,
    confirm,
    onFormFinish,
    handleValuesChange,
    submittingPassword,
  };
}
