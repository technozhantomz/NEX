import { Form } from "antd";
import { useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useFees,
} from "../../../../../../../common/hooks";
import { IFee } from "../../../../../../../common/hooks/fees/useFees.type";
import { IFullAccount } from "../../../../../../../common/types";
import { useUser } from "../../../../../../../context";

import { ITransferForm, ITransferFormData } from "./useTransferForm.type";

export function useTransferForm(): ITransferForm {
  const [validFrom, setValidForm] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<IFee>();
  const [toFullAcc, setToFullAcc] = useState<IFullAccount | undefined>(
    undefined
  );
  const { getFullAccount, formAccount } = useAccount();
  const { accountData } = useUser();
  const { getFees } = useFees();
  const [transferForm] = Form.useForm();
  const { setPrecision } = useAsset();

  useEffect(() => {
    getFeeData();
  }, []);

  const getFeeData = async () => {
    const feeData = (await getFees()).filter(
      (item) => item.name === "TRANSFER"
    )[0];
    setFeeData(feeData);
  };

  const onSend = async (values: ITransferFormData) => {
    transferForm.validateFields().then(async () => {
      console.log(values);
    });
  };

  const validateFrom = (_: unknown, value: string) => {
    if (value !== accountData?.name)
      return Promise.reject(new Error("Not your Account"));
    return Promise.resolve();
  };

  const validateTo = async (_: unknown, value: string) => {
    const acc = await getFullAccount(value, false);
    if (value === accountData?.name)
      return Promise.reject(new Error("Can not send to yourself"));
    if (acc === undefined) return Promise.reject(new Error("User not found"));
    return Promise.resolve();
  };

  const validateQuantity = async (_: unknown, value: number) => {
    const coin = transferForm.getFieldValue("coin");
    const accountAsset = accountData?.assets.filter(
      (asset) => asset.symbol === coin
    );
    const accountBalance = accountAsset
      ? setPrecision(true, accountAsset[0].amount, accountAsset[0].precision)
      : undefined;
    if (accountBalance !== undefined && accountBalance > value + feeData.fee)
      return Promise.resolve();
    return Promise.reject(
      new Error(
        `Must be less then ${accountAsset ? accountAsset[0].amount : ""}`
      )
    );
  };

  const formValdation = {
    from: [
      { required: true, message: "From is required" },
      { validator: validateFrom },
    ],
    to: [
      { required: true, message: "To is required" },
      { validator: validateTo },
    ],
    quantity: [
      { required: true, message: "Quantity is required" },
      { validator: validateQuantity },
    ],
    coin: [{ required: true, message: "Coin is required" }],
    memo: [],
  };

  return {
    validFrom,
    feeData,
    transferForm,
    onSend,
    formValdation,
  };
}
