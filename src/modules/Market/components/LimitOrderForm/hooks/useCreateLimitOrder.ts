import { useEffect, useState } from "react";

import {
  roundNum,
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { FeeParameter } from "../../../../../common/hooks/fees/useFees.types";
import { useUserContext } from "../../../../../common/providers";
import { Form } from "../../../../../ui/src";
import { useHistory } from "../../HistoryBook/hooks/useHistory";
import { useOrderBook } from "../../OrderBook/hooks/useOrderBook";

import {
  UseCreateLimitOrderArgs,
  UseCreateLimitOrderResult,
  UserBalances,
} from "./useCreateLimitOrder.types";

export function useCreateLimitOrder({
  isBuyOrder,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
  const [visible, setVisible] = useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [userBalances, setBalances] = useState<UserBalances>({
    buyBalance: 0,
    sellBalance: 0,
  });
  const [orderForm] = Form.useForm();

  const { defaultAsset, setPrecision, getAssetBySymbol } = useAsset();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { feeParameters, findOperationFee } = useFees();
  const { localStorageAccount, assets, id } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { refreshOrderBook } = useOrderBook();
  const { refreshHistory } = useHistory();

  useEffect(() => {
    if (feeParameters.length > 0) getFees();
  }, [feeParameters, defaultAsset, localStorageAccount, assets]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    orderForm.validateFields().then(() => {
      setVisible(true);
    });
  };

  const getFees = () => {
    const feeParam = findOperationFee("limit_order_create") as FeeParameter;
    const fee = feeParam[1].fee;
    const sellBalance = assets.find(
      (asset) => asset.symbol === activePair.split("_")[0]
    );
    const buyBalance = assets.find(
      (asset) => asset.symbol === activePair.split("_")[1]
    );
    setFeeAmount(
      setPrecision(true, fee as number, defaultAsset?.precision as number)
    );
    setBalances({
      buyBalance: buyBalance ? (buyBalance.amount as number) : 0,
      sellBalance: sellBalance ? (sellBalance.amount as number) : 0,
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        setVisible(false);
        handleLimitOrder(values.password);
      });
    }
  };

  const handleLimitOrder = async (password: string) => {
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
      setVisible(false);
      resetForm();
      refreshOrderBook();
      refreshHistory();
      //setStatus();
    } else {
      setVisible(false);
      refreshOrderBook();
      refreshHistory();
      //setStatus();
    }
  };

  const resetForm = () => {
    orderForm.setFieldsValue({
      price: 0,
      quantity: 0,
      total: 0,
    });
  };

  return {
    activePair,
    orderForm,
    visible,
    feeAmount,
    userBalances,
    onCancel,
    confirm,
    onFormFinish,
  };
}
