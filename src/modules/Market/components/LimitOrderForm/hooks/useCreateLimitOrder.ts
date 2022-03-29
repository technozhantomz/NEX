import { useEffect, useState } from "react";

import { useUserContext } from "../../../../../common/components";
import { useAccount, useAsset, useFees } from "../../../../../common/hooks";
import { FeeParameter } from "../../../../../common/hooks/fees/useFees.types";
import { Form } from "../../../../../ui/src";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

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
  const { activePair } = usePairSelect();
  const { defaultAsset, setPrecision } = useAsset();
  const { feeParameters, findOperationFee } = useFees();
  const { localStorageAccount, assets } = useUserContext();

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
    console.log(isBuyOrder);
    console.log(password);
  };

  const handleValuesChange = (changedValues: any) => {
    console.log(changedValues);
  };

  return {
    activePair,
    orderForm,
    visible,
    feeAmount,
    userBalances,
    onCancel,
    confirm,
    handleValuesChange,
    onFormFinish,
  };
}
