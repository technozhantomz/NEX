import { Form } from "antd";
import { FormFinishInfo } from "rc-field-form";
import { useEffect, useState } from "react";

import { defaultToken } from "../../../../api/params/networkparams";
import { useAccount, useFees, useTransfer } from "../../../hooks";
import { TransactionFee } from "../../../hooks/useFees.types";
import { useUserContext } from "../../UserProvider";

import { TransferForm } from "./useTransferForm.types";

export function useTransferForm(): TransferForm {
  const [status, upStatus] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<TransactionFee>({
    amount: 0,
    asset_id: "1.3.0",
  });
  const { getAccountByName, formAccountBalancesByName } = useAccount();
  const { handleTransfer } = useTransfer();
  const { localStorageAccount, assets } = useUserContext();
  const { getFees, feeCalculator } = useFees();
  const [transferForm] = Form.useForm();

  useEffect(() => {
    if (localStorageAccount !== null) {
      getFeeData();
      transferForm.setFieldsValue({ from: localStorageAccount });
    }
  }, [localStorageAccount, assets]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    transferForm.validateFields().then(() => {
      setVisible(true);
    });
  };

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        sendTransfer(values.password);
      });
    }
  };

  const getFeeData = async () => {
    const rawFeeData = (await getFees()).filter(
      (item) => item.name === "TRANSFER"
    )[0];
    setFeeData({
      amount: rawFeeData.fee,
      asset_id: "1.3.0",
    });
  };

  const sendTransfer = async (password: string) => {
    const values = transferForm.getFieldsValue();
    const trxResult = await handleTransfer(transferForm, password);
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setVisible(false);
      upStatus(
        `Successfully Transfered ${values.amount} ${values.coin} to ${values.to}`
      );
    }
  };

  const validateFrom = async (_: unknown, value: string) => {
    if (value !== localStorageAccount)
      return Promise.reject(new Error("Not your Account"));
    return Promise.resolve();
  };

  const validateTo = async (_: unknown, value: string) => {
    const acc = await getAccountByName(value);
    if (value === localStorageAccount)
      return Promise.reject(new Error("Can not send to yourself"));
    if (acc === undefined) return Promise.reject(new Error("User not found"));
    return Promise.resolve();
  };

  const validateQuantity = async (_: unknown, value: number) => {
    const coin = transferForm.getFieldValue("coin");
    const accountAsset = assets.find((asset) => asset.symbol === coin);
    if (canPayFee(value, feeData?.amount)) return Promise.resolve();
    return Promise.reject(
      new Error(`Must be less then ${accountAsset ? accountAsset.amount : ""}`)
    );
  };

  const validateMemo = async (_: unknown, value: string) => {
    const updatedFee = await feeCalculator.transfer(value);
    const sendAmount = transferForm.getFieldValue("amount");
    setFeeData({ amount: updatedFee, asset_id: "1.3.0" });
    if (canPayFee(sendAmount, updatedFee)) return Promise.resolve();
    return Promise.reject(new Error(`Insufficient Funds`));
  };

  const canPayFee = (
    amount: number,
    feeAmount: number
  ): boolean | undefined => {
    const coin = transferForm.getFieldValue("coin");
    const sendAsset = assets.find((asset) => asset.symbol === coin);
    const feeAsset = assets.find((asset) => asset.symbol === defaultToken);
    if (feeAsset?.amount !== undefined && sendAsset?.amount !== undefined) {
      if (coin === defaultToken) {
        return amount + feeAmount > sendAsset?.amount;
      }
      return feeAsset.amount > feeAmount;
    }
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
    amount: [
      { required: true, message: "Quantity is required" },
      { validator: validateQuantity },
    ],
    coin: [{ required: true, message: "Coin is required" }],
    memo: [{ validator: validateMemo }],
  };

  return {
    status,
    visible,
    feeData,
    transferForm,
    formValdation,
    confirm,
    onCancel,
    onFormFinish,
  };
}
