import { Form } from "antd";
// import FormFinishInfo from "rc-field-form";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { TransactionFee } from "../../../../../common/hooks/fees/useFees.types";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";

import { Swap, SwapAssetPair } from "./useSwapTab.types";

export function useSwap(): Swap {
  const [selectedAssets, setSelectedAssets] = useState<SwapAssetPair>({
    sellAsset: "TEST",
    buyAsset: "BTC",
  });
  const [assetValueInfo, setAssetValueInfo] = useState<string>("");
  const [status, upStatus] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const { getAssetBySymbol, defaultAsset } = useAsset();
  const [swapForm] = Form.useForm();
  const { id, assets } = useUserContext();
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { feeParameters } = useFees();
  const { dbApi } = usePeerplaysApiContext();

  const handleAssetChange = (value: unknown, option: any) => {
    if (option.action === "sellAsset") {
      swapForm.setFieldsValue({ sellAsset: value });
    } else {
      swapForm.setFieldsValue({ buyAsset: value });
    }
    setSelectedAssets({ ...selectedAssets, [option.action]: String(value) });
  };

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (!defaultToken) return;
    swapForm.setFieldsValue({ sellAsset: defaultToken });
    swapForm.setFieldsValue({ buyAsset: "BTC" });
    getFeeData();
    updateAssetValueInfo(defaultToken, "BTC");
  }, []);

  useEffect(() => {
    swapForm.setFieldsValue({ sellAsset: selectedAssets.sellAsset });
    swapForm.setFieldsValue({ buyAsset: selectedAssets.buyAsset });
  }, [selectedAssets]);

  const onFormFinish = (name: string, info: any) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleSwap(values.password);
      });
    }
  };

  const getFeeData = async () => {
    const rawFeeData = feeParameters.filter(
      (item) => item.name === "LIMIT_ORDER_CREATE"
    )[0];
    setFeeData({
      amount: rawFeeData?.fee,
      asset_id: "1.3.0",
    });
  };

  const handleSwap = useCallback(async (password: string) => {
    const values = swapForm.getFieldsValue();
    const sellAsset = await getAssetBySymbol(values.sellAsset);
    const buyAsset = await getAssetBySymbol(values.buyAsset);

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
    console.log(id);
    const trx = {
      type: "limit_order_create",
      params: {
        // fee: {
        //   amount: 0,
        //   asset_id: defaultAsset?.id,
        // },
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
      trxResult = await buildTrx([trx], [activeKey]);
    } catch (error) {
      console.log(error);
      setVisible(false);
    }

    if (trxResult) {
      setVisible(false);
      upStatus(
        `Your swap was completed and you received ${values.buyAmount} ${values.buyAsset} for ${values.sellAmount} ${values.sellAsset}`
      );
    }
  }, []);

  const validateSellAmount = (_: unknown, value: number) => {
    const sellAsset = swapForm.getFieldValue("sellAsset");
    const accountAsset = assets.find((asset) => asset.symbol === sellAsset);
    if (canPayFee(value, sellAsset))
      return Promise.reject(
        new Error(`Must be less then ${accountAsset?.amount}`)
      );
    const values = swapForm.getFieldsValue();
    updateAssetValueInfo(values.sellAsset, values.buyAsset, true);
    return Promise.resolve();
  };

  const validateSellAsset = (_: unknown, value: string) => {
    const values = swapForm.getFieldsValue();
    const accountAsset = assets.find((asset) => asset.symbol === value);
    if (value === swapForm.getFieldValue("buyAsset"))
      // swapForm.setFields([sellAmount : {errors:`Cannot swap same tokens`,value:values.sellAmount}])
      return Promise.reject(new Error(`Cannot swap same tokens`));
    if (accountAsset === undefined)
      return Promise.reject(new Error(`${value} not available`));
    updateAssetValueInfo(values.sellAsset, values.buyAsset, true);
    return Promise.resolve();
  };

  const validateBuyAsset = (_: unknown, value: number) => {
    const values = swapForm.getFieldsValue();
    if (value === swapForm.getFieldValue("sellAsset"))
      return Promise.reject(new Error(`Cannot swap same tokens`));
    updateAssetValueInfo(values.sellAsset, values.buyAsset, false);
    return Promise.resolve();
  };

  const validateBuyAmount = (_: unknown, value: number) => {
    const values = swapForm.getFieldsValue();
    updateAssetValueInfo(values.sellAsset, values.buyAsset, false);
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

  const formValidation = {
    sellAmount: [
      { required: true, message: "Sell amount required" },
      { validator: validateSellAmount },
    ],
    buyAmount: [
      { required: true, message: "Buy amount required" },
      { validator: validateBuyAmount },
    ],
    sellAsset: [
      { required: true, message: "Sell Asset required" },
      { validator: validateSellAsset },
    ],
    buyAsset: [
      { required: true, message: "Sell amount required" },
      { validator: validateBuyAsset },
    ],
  };

  const swapAsset = () => {
    let values = swapForm.getFieldsValue();
    swapForm.setFieldsValue({ sellAsset: values.buyAsset });
    swapForm.setFieldsValue({ buyAsset: values.sellAsset });
    swapForm.setFieldsValue({ sellAmount: values.buyAmount });
    swapForm.setFieldsValue({ buyAmount: values.sellAmount });
    values = swapForm.getFieldsValue();
    const { sellAsset, buyAsset } = selectedAssets;
    setSelectedAssets({ buyAsset: sellAsset, sellAsset: buyAsset });
    updateAssetValueInfo(values.sellAsset, values.buyAsset);
  };

  const updateAssetValueInfo = async (
    sellAsset: string,
    buyAsset: string,
    isSellAssetChanged: boolean
  ) => {
    const tickerData = await dbApi("get_ticker", [buyAsset, sellAsset]);
    const buyAssetData = await getAssetBySymbol(buyAsset);
    const sellAssetData = await getAssetBySymbol(sellAsset);
    const buyAmount = swapForm.getFieldValue("buyAmount")
      ? swapForm.getFieldValue("buyAmount")
      : 0;
    const sellAmount = swapForm.getFieldValue("sellAmount")
      ? swapForm.getFieldValue("sellAmount")
      : 0;
    const price = tickerData ? Number(tickerData?.latest) : 0;
    const sellPrice = Number(
      parseFloat(price * buyAmount + "").toFixed(buyAssetData?.precision)
    );
    const buyPrice =
      price > 0
        ? Number(
            parseFloat(sellAmount / price + "").toFixed(
              sellAssetData?.precision
            )
          )
        : 0;
    isSellAssetChanged === true
      ? swapForm.setFieldsValue({ buyAmount: buyPrice })
      : swapForm.setFieldsValue({ sellAmount: sellPrice });
    setAssetValueInfo(`${1} ${buyAsset} = ${price} ${sellAsset}`);
  };

  return {
    visible,
    onCancel,
    onFormFinish,
    confirm,
    handleAssetChange,
    swapForm,
    formValidation,
    feeData,
    swapAsset,
    status,
    assetValueInfo,
    selectedAssets,
  };
}
