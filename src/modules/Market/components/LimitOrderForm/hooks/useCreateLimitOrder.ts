import { useCallback, useEffect, useState } from "react";

import {
  roundNum,
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Form } from "../../../../../ui/src";
import { useHistory } from "../../HistoryBook/hooks/useHistory";
import { useOrderBook } from "../../OrderBook/hooks/useOrderBook";

import {
  UseCreateLimitOrderArgs,
  UseCreateLimitOrderResult,
} from "./useCreateLimitOrder.types";

export function useCreateLimitOrder({
  currentBase,
  currentQuote,
  loadingSelectedPair,
  isBuyOrder,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [marketFeePercent, setMarketFeePercent] = useState<number>(0);
  const [balance, _setBalance] = useState<number>(0);
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);

  const [orderForm] = Form.useForm();
  const { defaultAsset, getAssetBySymbol } = useAsset();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateCreateLimitOrderFee } = useFees();
  const { localStorageAccount, assets, id } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { refreshOrderBook } = useOrderBook({
    currentBase,
    currentQuote,
    loadingSelectedPair,
  });
  const { refreshHistory } = useHistory({
    currentBase,
    currentQuote,
    loadingSelectedPair,
  });

  const handleRelationsBetweenInputs = useCallback(
    (changedValues, allValues) => {
      let baseRoundTo = 5;
      let quoteRoundTo = 5;
      if (currentBase !== undefined && currentQuote != undefined) {
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

  const handleCancelPasswordModal = useCallback(() => {
    setIsPasswordModalVisible(false);
  }, [setIsPasswordModalVisible]);

  const confirm = useCallback(() => {
    orderForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  }, [orderForm, setIsPasswordModalVisible]);

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

  const handleCreateLimitOrder = async (password: string) => {
    const values = orderForm.getFieldsValue();
    let amount_to_sell, min_to_receive;
    if (isBuyOrder) {
      const sellAsset = await getAssetBySymbol(activePair.split("_")[1]);
      const buyAsset = await getAssetBySymbol(activePair.split("_")[0]);
      amount_to_sell = {
        amount: roundNum(
          values.quantity * 10 ** sellAsset.precision,
          sellAsset.precision
        ),
        asset_id: sellAsset.id,
      };

      min_to_receive = {
        amount: roundNum(
          values.total * 10 ** buyAsset.precision,
          buyAsset.precision
        ),
        asset_id: buyAsset.id,
      };
    } else {
      const sellAsset = await getAssetBySymbol(activePair.split("_")[0]);
      const buyAsset = await getAssetBySymbol(activePair.split("_")[1]);
      amount_to_sell = {
        amount: roundNum(
          values.total * 10 ** sellAsset.precision,
          sellAsset.precision
        ),
        asset_id: sellAsset.id,
      };

      min_to_receive = {
        amount: roundNum(
          values.quantity * 10 ** buyAsset.precision,
          buyAsset.precision
        ),
        asset_id: buyAsset.id,
      };
    }
    const expiration = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 365
    ).toISOString();
    const activeKey = getPrivateKey(password, "active");
    const trx = {
      type: "limit_order_create",
      params: {
        fee: { amount: 0, asset_id: defaultAsset?.id },
        seller: id,
        amount_to_sell,
        min_to_receive,
        expiration,
        fill_or_kill: false,
        extensions: [],
      },
    };
    let trxResult;

    try {
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (e) {
      console.log(e);
    }
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setIsPasswordModalVisible(false);
      resetForm();
      refreshOrderBook();
      refreshHistory();
      //setStatus();
    } else {
      setIsPasswordModalVisible(false);
      refreshOrderBook();
      refreshHistory();
      //setStatus();
    }
  };

  const formValdation = {
    price: [
      { required: true, message: "From is required" },
      { validator: validatePrice },
    ],
    quantity: [
      { required: true, message: "Amount is required" },
      { validator: validateQuantity },
    ],
    total: [
      { required: true, message: "Withdraw address is required" },
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
    handleRelationsBetweenInputs,
  };
}
