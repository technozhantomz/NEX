/** @format */

import { Form } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import { FormFinishInfo } from "rc-field-form";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params/networkparams";
import { useUserContext } from "../../../../../common/components/UserProvider";
import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../common/hooks/";
import { TransactionFee } from "../../../../../common/hooks/useFees.types";

import { Swap } from "./useSwapTab.types";

export function useSwap(): Swap {
  const [visible, setVisible] = useState<boolean>(false);
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const { getAssetBySymbol } = useAsset();
  const [swapForm] = Form.useForm();
  const { id, assets } = useUserContext();
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { getFees } = useFees();

  const handleAssetChange = (value: unknown) => {
    if (value.label._owner.pendingProps.id === "swapForm_sellAsset") {
      swapForm.setFieldsValue({ sellAsset: value.value });
    } else {
      swapForm.setFieldsValue({ buyAsset: value.value });
    }
    console.log(swapForm.getFieldsValue());
  };

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setVisible(true);
  };

  useEffect(() => {
    swapForm.setFieldsValue({ sellAsset: "BTC" });
    swapForm.setFieldsValue({ buyAsset: "BTC" });
    getFeeData();
  }, []);

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleSwap(values.password);
      });
    }
  };

  const getFeeData = async () => {
    const rawFeeData = (await getFees()).filter(
      (item) => item.name === "LIMIT ORDER CREATE"
    )[0];
    setFeeData({
      amount: rawFeeData.fee,
      asset_id: "1.3.0",
    });
  };

  const handleSwap = useCallback(async (password: string) => {
    const values = swapForm.getFieldsValue();
    const sellAsset = await getAssetBySymbol(values.sellAsset);
    const buyAsset = await getAssetBySymbol(values.buyAsset);

    console.log(values);
    const activeKey = getPrivateKey(password, "active");

    const amount_to_sell = {
      amount: values.sellAmount,
      asset_id: sellAsset.id,
    };

    const min_to_receive = {
      amount: values.buyAmount,
      asset_id: buyAsset.id,
    };

    const expiration = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24 * 365
    ).toISOString();

    const trx = {
      type: "limit_order_create",
      params: {
        fee: {
          amount: 0,
          asset_id: "1.3.0",
        },
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
      console.log(trx);
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (error) {
      console.log(error);
      setVisible(false);
    }

    if (trxResult) {
      setVisible(false);
    }
  }, []);

  const validateSellAmount = (_: unknown, value: number) => {
    const sellAsset = swapForm.getFieldValue("sellAsset");
    const accountAsset = assets.find((asset) => asset.symbol === sellAsset);
    if (canPayFee(value, sellAsset))
      return Promise.reject(
        new Error(`Must be less then ${accountAsset?.amount}`)
      );
    return Promise.resolve();
  };

  const canPayFee = (
    amount: number,
    assetSymbol: string
  ): boolean | undefined => {
    const sellAsset = assets.find((asset) => asset.symbol === assetSymbol);
    const feeAsset = assets.find((asset) => asset.symbol === defaultToken);
    if (feeAsset?.amount !== undefined && sellAsset?.amount !== undefined) {
      if (assetSymbol === defaultToken) {
        return amount + feeData?.amount > sellAsset?.amount;
      }
      return feeAsset.amount > feeData?.amount;
    }
  };

  const validateSellAsset = (_: unknown, value: string) => {
    const accountAsset = assets.find((asset) => asset.symbol === value);
    if (accountAsset === undefined)
      return Promise.reject(new Error(`${value} not available`));
    return Promise.resolve();
  };

  // const validateBuyAsset = (_: unknown, value: number) => {};

  const formValdation = {
    sellAmount: [
      { required: true, message: "Sell amount required" },
      { validator: validateSellAmount },
    ],
    buyAmount: [{ required: true, message: "Buy amount required" }],
    sellAsset: [
      { required: true, message: "Sell Asset required" },
      { validator: validateSellAsset },
    ],
    buyAsset: [
      { required: true, message: "Sell amount required" },
      // { validator: validateBuyAsset },
    ],
  };

  return {
    visible,
    onCancel,
    onFormFinish,
    confirm,
    handleAssetChange,
    swapForm,
    formValdation,
    feeData,
  };
}
