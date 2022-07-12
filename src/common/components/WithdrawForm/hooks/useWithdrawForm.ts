import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../api/params";
import { Form } from "../../../../ui/src";
import {
  roundNum,
  useAccount,
  useFees,
  useSidechainAccounts,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
  useTransferTransactionBuilder,
} from "../../../hooks";
import { useUserContext } from "../../../providers";
import { Account } from "../../../types";

import { UseWithdrawFormResult } from "./useWithdrawForm.types";

export function useWithdrawForm(asset: string): UseWithdrawFormResult {
  const [selectedAsset, setSelectedAsset] = useState<string>(asset);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [withdrawAddress, setWithdrawAddress] = useState<string>("");
  const [isSonNetworkOk, setIsSonNetworkOk] = useState<boolean>();

  const { getSonNetworkStatus, sonAccount } = useSonNetwork();
  const {
    bitcoinSidechainAccount,
    sidechainAccounts,
    hasBTCDepositAddress,
    loadingSidechainAccounts,
    getSidechainAccounts,
  } = useSidechainAccounts();
  const { getAccountByName, getPrivateKey, formAccountBalancesByName } =
    useAccount();
  const { account, localStorageAccount, assets, id } = useUserContext();
  const { buildTrx, getTrxFee } = useTransactionBuilder();
  const { calculateTransferFee } = useFees();
  const { buildTransferTransaction } = useTransferTransactionBuilder();
  const {
    buildAddingBitcoinSidechainTransaction,
    buildDeletingBitcoinSidechainTransaction,
  } = useSidechainTransactionBuilder();
  const [withdrawForm] = Form.useForm();

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.amount) {
      const selectedAccountAsset = assets.find(
        (asset) => asset.symbol === selectedAsset
      );

      if (
        selectedAccountAsset &&
        changedValues.amount > 0 &&
        changedValues.amount.split(".")[1]?.length >
          selectedAccountAsset.precision
      ) {
        withdrawForm.setFieldsValue({
          amount: roundNum(
            changedValues.amount,
            selectedAccountAsset.precision
          ),
        });
      }
    }
  };

  const handleAssetChange = useCallback(
    (value: unknown) => {
      setSelectedAsset(value as string);
    },
    [setSelectedAsset]
  );

  const buildWithdrawFormTransaction = useCallback(async () => {
    const values = withdrawForm.getFieldsValue();
    try {
      const from = (
        account ? account : await getAccountByName(localStorageAccount)
      ) as Account;
      const to = sonAccount
        ? sonAccount
        : ((await getAccountByName("son-account")) as Account);
      const asset = assets.filter((asset) => asset.symbol === selectedAsset)[0];

      let memo = "";
      if (selectedAsset === "BTC") {
        memo = "";
      } else {
        memo = values.withdrawAddress;
      }
      const trx = buildTransferTransaction(from, to, memo, asset, quantity);
      return trx;
    } catch (e) {
      console.log(e);
    }
  }, [
    withdrawForm,
    account,
    sonAccount,
    localStorageAccount,
    assets,
    selectedAsset,
    buildTransferTransaction,
    getAccountByName,
  ]);

  const setWithdrawFeeWithMemo = useCallback(async () => {
    try {
      const trx = await buildWithdrawFormTransaction();
      if (trx !== undefined) {
        const fee = await getTrxFee([trx]);
        if (fee !== undefined) {
          setFeeAmount(fee);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [buildWithdrawFormTransaction, getTrxFee, setFeeAmount]);

  const handleWithdraw = async (password: string) => {
    setTransactionErrorMessage("");
    const values = withdrawForm.getFieldsValue();
    const activeKey = getPrivateKey(password, "active");

    try {
      setLoadingTransaction(true);
      if (selectedAsset === "BTC") {
        if (
          values.withdrawAddress !==
            bitcoinSidechainAccount?.withdraw_address ||
          values.withdrawPublicKey !==
            bitcoinSidechainAccount?.withdraw_public_key
        ) {
          const deleteTrx = buildDeletingBitcoinSidechainTransaction(
            id,
            bitcoinSidechainAccount?.id as string,
            id
          );

          const deleteTrxResult = await buildTrx([deleteTrx], [activeKey]);
          if (deleteTrxResult) {
            const addTrx = buildAddingBitcoinSidechainTransaction(
              id,
              id,
              bitcoinSidechainAccount?.deposit_public_key as string,
              values.withdrawPublicKey,
              values.withdrawAddress
            );

            const addTrxResult = await buildTrx([addTrx], [activeKey]);
            if (!addTrxResult) {
              setTransactionErrorMessage(
                counterpart.translate(`field.errors.transaction_unable`)
              );
              setLoadingTransaction(false);
              await getSidechainAccounts(id);
              return;
            }
            await getSidechainAccounts(id);
          } else {
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.transaction_unable`)
            );
            setLoadingTransaction(false);
            return;
          }
        }
      }

      const trx = await buildWithdrawFormTransaction();
      const trxResult = await buildTrx([trx], [activeKey]);
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          `${counterpart.translate(`field.success.successfully_withdraw`)} ${
            values.amount
          }`
        );
        withdrawForm.resetFields();
        setLoadingTransaction(false);
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
    } catch (e) {
      await getSidechainAccounts(id);
      console.log(e);
      setTransactionErrorMessage(
        counterpart.translate(`field.errors.transaction_unable`)
      );
      setLoadingTransaction(false);
    }
  };

  const validateAmount = async (_: unknown, value: number) => {
    const accountAsset = assets.find((asset) => asset.symbol === selectedAsset);
    const accountDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    setQuantity(value);

    if (!accountAsset) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.balance_not_enough`))
      );
    }
    if ((accountAsset.amount as number) < Number(value)) {
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
  };

  const validateFrom = async (_: unknown, value: string) => {
    if (value !== localStorageAccount)
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.not_your_account`))
      );
    return Promise.resolve();
  };

  // we need bitcoin address validation
  const validateWithdrawAddress = async (_: unknown, value: string) => {
    if (isSonNetworkOk === undefined) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.checking_sons_status`))
      );
    } else {
      if (!isSonNetworkOk) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.sons_not_available`))
        );
      }
    }
    setWithdrawAddress(value);
    if (selectedAsset === "BTC") {
      if (!loadingSidechainAccounts) {
        if (!hasBTCDepositAddress) {
          return Promise.reject(
            new Error(
              counterpart.translate(
                `field.errors.first_generate_bitcoin_address`
              )
            )
          );
        }
        return Promise.resolve();
      }
      return Promise.reject(new Error(""));
    } else {
      await setWithdrawFeeWithMemo();
      return Promise.resolve();
    }
  };

  // we need bitcoin pub key validation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validateWithdrawPublicKey = async (_: unknown, value: string) => {
    if (isSonNetworkOk === undefined) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.checking_sons_status`))
      );
    } else {
      if (!isSonNetworkOk) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.sons_not_available`))
        );
      }
    }
    if (!loadingSidechainAccounts) {
      if (!hasBTCDepositAddress) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.first_generate_bitcoin_address`)
          )
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error(""));
  };

  const formValdation = {
    from: [
      {
        required: true,
        message: counterpart.translate(`field.errors.from_required`),
      },
      { validator: validateFrom },
    ],
    amount: [
      {
        required: true,
        message: counterpart.translate(`field.errors.amount_required`),
      },
      { validator: validateAmount },
    ],
    withdrawAddress: [
      {
        required: true,
        message: counterpart.translate(`field.errors.withdraw_add_required`),
      },
      { validator: validateWithdrawAddress },
    ],
    withdrawPublicKey: [
      {
        required: true,
        message: counterpart.translate(
          `field.errors.withdraw_pub_key_required`
        ),
      },
      { validator: validateWithdrawPublicKey },
    ],
  };

  const checkSonNetwork = useCallback(async () => {
    try {
      const sonNetworkStatus = await getSonNetworkStatus();
      setIsSonNetworkOk(sonNetworkStatus.isSonNetworkOk);
    } catch (e) {
      console.log(e);
      setIsSonNetworkOk(false);
    }
  }, [getSonNetworkStatus, setIsSonNetworkOk]);

  useEffect(() => {
    checkSonNetwork();
  }, [checkSonNetwork]);

  useEffect(() => {
    const withdrawFee = calculateTransferFee("");
    if (withdrawFee) {
      setFeeAmount(withdrawFee);
    }
  }, [assets, calculateTransferFee]);

  useEffect(() => {
    if (
      selectedAsset === "BTC" &&
      !loadingSidechainAccounts &&
      bitcoinSidechainAccount &&
      hasBTCDepositAddress
    ) {
      withdrawForm.setFieldsValue({
        withdrawAddress: bitcoinSidechainAccount?.withdraw_address,
        withdrawPublicKey: bitcoinSidechainAccount?.withdraw_public_key,
      });
    } else {
      withdrawForm.setFieldsValue({
        withdrawAddress: "",
      });
    }
  }, [
    loadingSidechainAccounts,
    sidechainAccounts,
    bitcoinSidechainAccount,
    selectedAsset,
  ]);

  return {
    feeAmount,
    withdrawForm,
    formValdation,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    handleWithdraw,
    loadingTransaction,
    quantity,
    withdrawAddress,
  };
}
