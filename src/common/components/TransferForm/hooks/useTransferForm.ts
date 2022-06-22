import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { defaultToken } from "../../../../api/params/networkparams";
import { Form } from "../../../../ui/src";
import {
  roundNum,
  useAccount,
  useFees,
  useSonNetwork,
  useTransactionBuilder,
  useTransferTransactionBuilder,
} from "../../../hooks";
import { useUserContext } from "../../../providers";
import { Account } from "../../../types";

import { UseTransferFormResult } from "./useTransferForm.types";

export function useTransferForm(): UseTransferFormResult {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [toAccount, setToAccount] = useState<Account>();
  const [fromAccount, setFromAccount] = useState<Account>();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { localStorageAccount, assets } = useUserContext();
  const { buildTrx } = useTransactionBuilder();
  const { calculateTransferFee } = useFees();
  const { buildTransferTransaction } = useTransferTransactionBuilder();
  const { sonAccount, getSonNetworkStatus } = useSonNetwork();
  const [transferForm] = Form.useForm();

  useEffect(() => {
    const transferFee = calculateTransferFee(
      transferForm.getFieldValue("memo")
    );
    if (transferFee) {
      setFeeAmount(transferFee);
    }
    transferForm.setFieldsValue({ from: localStorageAccount });
  }, [localStorageAccount, calculateTransferFee, assets]);

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const confirm = () => {
    transferForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        transfer(values.password);
      });
    }
  };

  const handleValuesChange = (changedValues: any) => {
    setStatus("");
    if (changedValues.amount) {
      if (changedValues.amount < 0) {
        transferForm.setFieldsValue({ amount: 0 });
      } else {
        const selectedAsset = transferForm.getFieldValue("asset");
        const selectedAccountAsset = assets.find(
          (asset) => asset.symbol === selectedAsset
        );

        if (selectedAccountAsset && changedValues.amount > 0) {
          transferForm.setFieldsValue({
            amount: roundNum(
              changedValues.amount,
              selectedAccountAsset.precision
            ),
          });
        }
      }
    }
  };

  const transfer = async (password: string) => {
    setTransactionErrorMessage("");
    setSubmittingPassword(true);
    const values = transferForm.getFieldsValue();
    const from = (
      fromAccount ? fromAccount : await getAccountByName(values.from)
    ) as Account;
    const to = (
      toAccount ? toAccount : await getAccountByName(values.to)
    ) as Account;
    const activeKey = getPrivateKey(password, "active");
    const asset = assets.filter((asset) => asset.symbol === values.asset)[0];
    const trx = buildTransferTransaction(
      from,
      to,
      values.memo,
      asset,
      password,
      values.amount
    );
    let trxResult;
    try {
      setLoadingTransaction(true);
      trxResult = await buildTrx([trx], [activeKey]);
    } catch (e) {
      console.log(e);
      setSubmittingPassword(false);
      setLoadingTransaction(false);
    }
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setIsPasswordModalVisible(false);
      setTransactionErrorMessage("");
      setTransactionSuccessMessage(
        counterpart.translate(`field.success.successfully_transferred`, {
          amount: values.amount,
          asset: values.asset,
          to: values.to,
        })
      );
      setSubmittingPassword(false);
      transferForm.resetFields();
      setLoadingTransaction(false);
    } else {
      setIsPasswordModalVisible(false);
      setSubmittingPassword(false);
      setTransactionErrorMessage(
        counterpart.translate(`field.errors.server_error`)
      );
      setLoadingTransaction(false);
    }
  };

  const validateFrom = async (_: unknown, value: string) => {
    if (value !== localStorageAccount)
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.not_your_account`))
      );
    setFromAccount(await getAccountByName(value));
    return Promise.resolve();
  };

  const validateTo = async (_: unknown, value: string) => {
    const acc = await getAccountByName(value);
    if (value === localStorageAccount) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.cannot_send_yourself`))
      );
    }
    if (!acc) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.user_not_found`))
      );
    }
    if (
      sonAccount &&
      (acc.id === sonAccount.id || acc.name === sonAccount.name)
    ) {
      const sonNetworkStatus = await getSonNetworkStatus();
      if (!sonNetworkStatus.isSonNetworkOk) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.sons_not_available`))
        );
      }
    }
    setToAccount(acc);
    return Promise.resolve();
  };

  const validateAmount = async (_: unknown, value: number) => {
    const selectedAsset = transferForm.getFieldValue("asset");
    const isDefaultAsset = selectedAsset === defaultToken;
    const selectedAccountAsset = assets.find(
      (asset) => asset.symbol === selectedAsset
    );
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.amount_should_greater`))
      );
    }
    if (!selectedAccountAsset) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.balance_not_enough`))
      );
    }

    if (isDefaultAsset) {
      const total = Number(value) + feeAmount;
      if ((selectedAccountAsset.amount as number) < total) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
      return Promise.resolve();
    } else {
      const accountDefaultAsset = assets.find(
        (asset) => asset.symbol === defaultToken
      );
      if ((selectedAccountAsset.amount as number) < value) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
      if (!accountDefaultAsset) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.balance_not_enough_to_pay`)
          )
        );
      }
      if ((accountDefaultAsset.amount as number) < feeAmount) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.balance_not_enough_to_pay`)
          )
        );
      }
      setQuantity(value);
      return Promise.resolve();
    }
  };

  const validateMemo = async (_: unknown, value: string) => {
    const updatedFee = calculateTransferFee(value);
    if (updatedFee) {
      setFeeAmount(updatedFee);
    }
    return Promise.resolve();
  };

  const formValdation = {
    from: [
      {
        required: true,
        message: counterpart.translate(`field.errors.from_required`),
      },
      { validator: validateFrom },
    ],
    to: [
      {
        required: true,
        message: counterpart.translate(`field.errors.to_required`),
      },
      { validator: validateTo },
    ],
    amount: [
      {
        required: true,
        message: counterpart.translate(`field.errors.amount_required`),
      },
      { validator: validateAmount },
    ],
    asset: [
      {
        required: true,
        message: counterpart.translate(`field.errors.asset_required`),
      },
    ],
    memo: [{ validator: validateMemo }],
  };

  return {
    status,
    isPasswordModalVisible,
    feeAmount,
    transferForm,
    formValdation,
    confirm,
    handlePasswordModalCancel,
    onFormFinish,
    handleValuesChange,
    submittingPassword,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    transfer,
    loadingTransaction,
    toAccount,
    quantity,
  };
}
