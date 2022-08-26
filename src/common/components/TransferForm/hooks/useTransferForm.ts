import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../api/params/networkparams";
import { Form } from "../../../../ui/src";
import {
  useAccount,
  useAsset,
  useFees,
  useSonNetwork,
  useTransactionBuilder,
  useTransferTransactionBuilder,
} from "../../../hooks";
import { useUserContext } from "../../../providers";
import { Account } from "../../../types";

import { TransferForm, UseTransferFormResult } from "./useTransferForm.types";

export function useTransferForm(): UseTransferFormResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [toAccount, setToAccount] = useState<Account>();
  const [fromAccount, setFromAccount] = useState<Account>();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();

  const { limitByPrecision } = useAsset();
  const { localStorageAccount, assets } = useUserContext();
  const { buildTrx, getTrxFee } = useTransactionBuilder();
  const { calculateTransferFee } = useFees();
  const { buildTransferTransaction } = useTransferTransactionBuilder();
  const { sonAccount, getSonNetworkStatus } = useSonNetwork();
  const [transferForm] = Form.useForm<TransferForm>();

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.amount) {
      const selectedAsset = transferForm.getFieldValue("asset");
      const selectedAccountAsset = assets.find(
        (asset) => asset.symbol === selectedAsset
      );

      const amount = limitByPrecision(
        changedValues.amount,
        selectedAccountAsset?.precision
      );
      transferForm.setFieldsValue({
        amount: amount,
      });
    }
  };

  const buildTransferFormTransaction = useCallback(async () => {
    const values = transferForm.getFieldsValue();
    try {
      const from = (
        fromAccount ? fromAccount : await getAccountByName(values.from)
      ) as Account;
      const to = (
        toAccount ? toAccount : await getAccountByName(values.to)
      ) as Account;
      const asset = assets.filter((asset) => asset.symbol === values.asset)[0];
      const trx = buildTransferTransaction(
        from,
        to,
        asset,
        values.amount,
        values.memo
      );
      return trx;
    } catch (e) {
      console.log(e);
    }
  }, [
    transferForm,
    fromAccount,
    toAccount,
    assets,
    buildTransferTransaction,
    getAccountByName,
  ]);

  const setTransferFeeWithMemo = useCallback(async () => {
    const trx = await buildTransferFormTransaction();
    if (trx !== undefined) {
      const fee = await getTrxFee([trx]);
      if (fee !== undefined) {
        setFeeAmount(fee);
      }
    }
  }, [buildTransferFormTransaction, getTrxFee, setFeeAmount]);

  const transfer = async (password: string) => {
    setTransactionErrorMessage("");
    const values = transferForm.getFieldsValue();

    const activeKey = getPrivateKey(password, "active");

    let trxResult;
    try {
      setLoadingTransaction(true);
      const trx = await buildTransferFormTransaction();
      trxResult = await buildTrx([trx], [activeKey]);
    } catch (e) {
      console.log(e);
      setTransactionErrorMessage(
        counterpart.translate(`field.errors.transaction_unable`)
      );
      setLoadingTransaction(false);
    }
    if (trxResult) {
      formAccountBalancesByName(localStorageAccount);
      setTransactionErrorMessage("");
      setTransactionSuccessMessage(
        counterpart.translate(`field.success.successfully_transferred`, {
          amount: values.amount,
          asset: values.asset,
          to: values.to,
        })
      );
      transferForm.resetFields();
      setLoadingTransaction(false);
    } else {
      setTransactionErrorMessage(
        counterpart.translate(`field.errors.transaction_unable`)
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

  const validateAmount = async (_: unknown, value: string) => {
    const selectedAsset = transferForm.getFieldValue("asset");
    const isDefaultAsset = selectedAsset === defaultToken;
    const selectedAccountAsset = assets.find(
      (asset) => asset.symbol === selectedAsset
    );
    setAmount(Number(value));

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
      if ((selectedAccountAsset.amount as number) < Number(value)) {
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
      return Promise.resolve();
    }
  };

  const validateMemo = async (_: unknown) => {
    await setTransferFeeWithMemo();
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

  useEffect(() => {
    const transferFee = calculateTransferFee("");
    if (transferFee) {
      setFeeAmount(transferFee);
    }
    transferForm.setFieldsValue({ from: localStorageAccount });
  }, [localStorageAccount, calculateTransferFee, assets]);

  return {
    feeAmount,
    transferForm,
    formValdation,
    handleValuesChange,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    transfer,
    loadingTransaction,
    toAccount,
    amount,
  };
}
