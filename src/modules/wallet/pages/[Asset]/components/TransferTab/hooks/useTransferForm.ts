import { Form } from "antd";
import { useState } from "react";

import { useUser } from "../../../../../../../context";

import { ITransferForm, ITransferFormData } from "./useTransferForm.type";

export function useTransferForm(): ITransferForm {
  const [validFrom, setForm] = useState(false);
  const { accountData } = useUser();
  const [transferForm] = Form.useForm();

  const onSend = async (values: ITransferFormData) => {
    console.log(values);
  };

  const validateQuantity = async (_: unknown, value: number) => {
    const coin = transferForm.getFieldValue("coin");
    const accountAsset = accountData?.assets.filter(
      (asset) => asset.symbol === coin
    );
    if (accountAsset?.amount < value) return Promise.resolve();
    return Promise.reject(
      new Error(`Must be less then ${accountAsset?.amount}`)
    );
  };

  const formValdation = {
    from: [{ required: true, message: "From is required" }],
    to: [{ required: true, message: "To is required" }],
    quantity: [
      { required: true, message: "Quantity is required" },
      { validator: validateQuantity },
    ],
    coin: [{ required: true, message: "Coin is required" }],
    memo: [],
  };

  return {
    validFrom,
    transferForm,
    onSend,
    formValdation,
  };
}
