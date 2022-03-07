import { Form } from "antd";
import { FormFinishInfo } from "rc-field-form";
import { useEffect, useState } from "react";

import { useAccount, useFees, useTransfer } from "../../../hooks";
import { TransactionFee } from "../../../hooks/useFees.types";
import { SidechainAcccount } from "../../../types";
import { useUserContext } from "../../UserProvider";

import { WithdrawForm } from "./useWithdrawForm.types";

export function useWithdrawForm(): WithdrawForm {
  const [status, upStatus] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [bitcoinAccount, setBitcoinsAccount] = useState<SidechainAcccount>();
  const [visible, setVisible] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { formAccountBalancesByName } = useAccount();
  const { handleTransfer } = useTransfer();
  const { localStorageAccount, assets, sidechainAcccounts } = useUserContext();
  const { getFees } = useFees();
  const [withdrawForm] = Form.useForm();

  useEffect(() => {
    if (localStorageAccount !== null) {
      getFeeData();
      setLoggedIn(true);
      //withdrawForm.setFieldsValue({ from: localStorageAccount });
      if (sidechainAcccounts && sidechainAcccounts.length > 0) {
        const bitcoinAccount = sidechainAcccounts.find(
          (act) => act.sidechain === "bitcoin"
        );
        setBitcoinsAccount(bitcoinAccount);
        withdrawForm.setFieldsValue({
          withdrawAddress: bitcoinAccount?.withdraw_address,
        });
      }
    }
  }, [localStorageAccount, assets, sidechainAcccounts]);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    withdrawForm.validateFields().then(() => {
      setVisible(true);
    });
  };

  const handleAssetChange = (value: string) => {
    withdrawForm.setFieldsValue({ asset: value });
    console.log(withdrawForm.getFieldsValue());
  };

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleWithdraw(values.password);
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

  const handleWithdraw = async (password: string) => {
    const amount = withdrawForm.getFieldValue("amount");
    const trxResult = await handleTransfer(
      withdrawForm,
      password,
      "btc-withdraw"
    );
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setVisible(false);
      upStatus(`Successfully withdrew ${amount}`);
    }
  };

  const validateAmount = async (_: unknown, value: number) => {
    const formAsset = withdrawForm.getFieldValue("asset")
      ? withdrawForm.getFieldValue("asset")
      : "BTC";
    const accountAsset = assets.find((asset) => asset.symbol === formAsset);
    if (accountAsset === undefined) {
      return Promise.reject(new Error(`No ${formAsset} available`));
    }
    if (accountAsset.amount > Number(value)) return Promise.resolve();
    return Promise.reject(
      new Error(`Must be less then ${accountAsset ? accountAsset.amount : ""}`)
    );
  };

  const validateWithdrawAddress = async (_: unknown, value: string) => {
    const withdrawAddress = bitcoinAccount?.withdraw_address;
    if (withdrawAddress === value) return Promise.resolve();
    return Promise.reject(
      new Error(`Current withdraw address is ${withdrawAddress}`)
    );
  };

  const formValdation = {
    asset: [],
    amount: [
      { required: true, message: "Amount is required" },
      { validator: validateAmount },
    ],
    withdrawAddress: [
      { required: true, message: "" },
      { validator: validateWithdrawAddress },
    ],
  };

  return {
    status,
    loggedIn,
    visible,
    feeData,
    withdrawForm,
    formValdation,
    confirm,
    onCancel,
    onFormFinish,
    handleAssetChange,
  };
}
