import * as bitcoin from "bitcoinjs-lib";
import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import {
  BITCOIN_ASSET_SYMBOL,
  defaultToken,
  SON_ACCOUNT_NAME,
  testnetCheck,
} from "../../../../api/params";
import { utils } from "../../../../api/utils";
import { Form } from "../../../../ui/src";
import {
  useAccount,
  useAsset,
  useFees,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
  useTransferTransactionBuilder,
} from "../../../hooks";
import { useAssetsContext, useUserContext } from "../../../providers";
import { Account, SignerKey, Transaction } from "../../../types";

import { UseWithdrawFormResult, WithdrawForm } from "./useWithdrawForm.types";

const NETWORK = testnetCheck ? bitcoin.networks.regtest : undefined;
const BITCOIN_MIN_WITHDRAWAL = 0.001;

export function useWithdrawForm(asset: string): UseWithdrawFormResult {
  const [withdrawFee, setWithdrawFee] = useState<number>(0);
  const [selectedAsset, setSelectedAsset] = useState<string>(asset);
  const [selectedAssetPrecission, _setSelectedAssetPrecission] =
    useState<number>(8);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [withdrawAddress, setWithdrawAddress] = useState<string>("");
  const [withdrawPublicKey, setWithdrawPublicKey] = useState<string>("");
  const [isSonNetworkOk, setIsSonNetworkOk] = useState<boolean>();
  const [userBalance, _setUserBalance] = useState<number>(0);
  const [btcTransferFee, setBtcTransferFee] = useState<number>(0.0003);

  const { limitByPrecision } = useAsset();
  const { sidechainAssets } = useAssetsContext();
  const { getSonNetworkStatus, sonAccount } = useSonNetwork();
  const {
    bitcoinSidechainAccount,
    sidechainAccounts,
    hasBTCDepositAddress,
    loadingSidechainAccounts,
    getSidechainAccounts,
  } = useUserContext();
  const { getAccountByName, formAccountBalancesByName } = useAccount();
  const { account, localStorageAccount, assets, id } = useUserContext();
  const { buildTrx, getTrxFee } = useTransactionBuilder();
  const { calculateTransferFee } = useFees();
  const { buildTransferTransaction } = useTransferTransactionBuilder();
  const { buildAddingSidechainTransaction, buildDeletingSidechainTransaction } =
    useSidechainTransactionBuilder();
  const [withdrawForm] = Form.useForm<WithdrawForm>();

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.amount) {
      const selectedSidechainAsset = sidechainAssets.find(
        (asset) => asset?.symbol === selectedAsset
      );

      const amount = limitByPrecision(
        changedValues.amount,
        selectedSidechainAsset?.precision
      );
      withdrawForm.setFieldsValue({
        amount: amount,
      });
    }
  };

  const handleAssetChange = useCallback(
    (value: unknown) => {
      setSelectedAsset(String(value));
      withdrawForm.setFieldsValue({
        amount: "0",
      });
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
        : ((await getAccountByName(SON_ACCOUNT_NAME)) as Account);
      const asset = assets.filter((asset) => asset.symbol === selectedAsset)[0];

      let memo = "";
      if (selectedAsset !== BITCOIN_ASSET_SYMBOL) {
        memo = values.withdrawAddress;
      }
      const trx = buildTransferTransaction(
        from,
        to,
        asset,
        values.amount,
        memo
      );
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
          setWithdrawFee(fee);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [buildWithdrawFormTransaction, getTrxFee, setWithdrawFee]);

  const handleWithdraw = async (signerKey: SignerKey) => {
    setTransactionErrorMessage("");
    setLoadingTransaction(true);
    const values = withdrawForm.getFieldsValue();
    const btcSidechainAddressesChanged =
      values.withdrawAddress !== bitcoinSidechainAccount?.withdraw_address ||
      values.withdrawPublicKey !== bitcoinSidechainAccount?.withdraw_public_key;

    if (
      selectedAsset === BITCOIN_ASSET_SYMBOL &&
      btcSidechainAddressesChanged
    ) {
      const transactions: Transaction[] = [];
      const deleteTrx = buildDeletingSidechainTransaction(
        id,
        bitcoinSidechainAccount?.id as string,
        id,
        "bitcoin"
      );
      transactions.push(deleteTrx);
      const addTrx = buildAddingSidechainTransaction(
        id,
        id,
        bitcoinSidechainAccount?.deposit_public_key as string,
        values.withdrawPublicKey,
        values.withdrawAddress,
        "bitcoin"
      );
      transactions.push(addTrx);

      try {
        const updateSidechainsTrxResult = await buildTrx(
          [...transactions],
          [signerKey]
        );
        if (!updateSidechainsTrxResult) {
          setTransactionErrorMessage(
            counterpart.translate(`field.errors.transaction_unable`)
          );
          setLoadingTransaction(false);
          return;
        }
        await getSidechainAccounts(id);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
        return;
      }
    }

    try {
      const trx = await buildWithdrawFormTransaction();
      const trxResult = await buildTrx([trx], [signerKey]);
      if (!trxResult) {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      } else {
        formAccountBalancesByName(localStorageAccount);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.successfully_withdrawn`, {
            symbol: selectedAsset,
            withdrawAmount: amount,
          })
        );
        withdrawForm.setFieldsValue({
          amount: "0",
        });
        setLoadingTransaction(false);
      }
    } catch (e) {
      console.log(e);
      setTransactionErrorMessage(
        counterpart.translate(`field.errors.transaction_unable`)
      );
      setLoadingTransaction(false);
    }
  };

  const setUserBalance = useCallback(() => {
    if (assets && assets.length > 0) {
      const userAsset = assets.find((asset) => asset.symbol === selectedAsset);

      if (userAsset) {
        _setUserBalance(userAsset.amount as number);
      } else {
        _setUserBalance(0);
      }
    }
  }, [assets, selectedAsset, _setUserBalance]);

  const setSelectedAssetPrecission = useCallback(() => {
    if (sidechainAssets && sidechainAssets.length > 0) {
      const selectedsidechainAsset = sidechainAssets.find(
        (asset) => asset?.symbol === selectedAsset
      );

      if (selectedsidechainAsset) {
        _setSelectedAssetPrecission(selectedsidechainAsset.precision);
      }
    }
  }, [selectedAsset, sidechainAssets, _setSelectedAssetPrecission]);

  const validateAmount = async (_: unknown, value: string) => {
    const accountAsset = assets.find((asset) => asset.symbol === selectedAsset);
    const accountDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    setAmount(value);
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.amount_should_greater`))
      );
    }
    if (Number(value) < BITCOIN_MIN_WITHDRAWAL) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.amount_should_greater_than`, {
            amount: BITCOIN_MIN_WITHDRAWAL,
          })
        )
      );
    }
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
    if ((accountDefaultAsset.amount as number) < withdrawFee) {
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
      if (
        value.length !== 66 ||
        (value.slice(0, 2) !== "03" && value.slice(0, 2) !== "02")
      ) {
        setWithdrawPublicKey("");
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.invalid_bitcoin_public_key`, {
              network: testnetCheck ? "regtest" : "mainnet",
            })
          )
        );
      }
      setWithdrawPublicKey(value);
      return Promise.resolve();
    }
    return Promise.reject(new Error(""));
  };

  const validateBtcWithdrawAddress = (value: string) => {
    let error = "";
    if (!loadingSidechainAccounts) {
      if (withdrawPublicKey === "") {
        error = counterpart.translate(`field.errors.first_valid_public_key`);
        return error;
      } else {
        const pubkey = Buffer.from(withdrawPublicKey, "hex");
        try {
          const { address } = bitcoin.payments.p2pkh({
            pubkey,
            network: NETWORK,
          });
          if (address !== value) {
            error = counterpart.translate(`field.errors.not_match_address`);
            return error;
          }
        } catch (e) {
          console.log(e);
          error = counterpart.translate(`field.errors.first_valid_public_key`);
          return error;
        }
      }
      return error;
    }
    error = counterpart.translate(`field.errors.loading_sidechain_accounts`);
    return error;
  };

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
    if (selectedAsset === BITCOIN_ASSET_SYMBOL) {
      const error = validateBtcWithdrawAddress(value);
      if (error !== "") {
        return Promise.reject(new Error(error));
      } else {
        return Promise.resolve();
      }
    } else {
      if (!utils.validateGrapheneAccountName(value)) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.invalid_withdraw_hive_address`)
          )
        );
      }
      await setWithdrawFeeWithMemo();
      return Promise.resolve();
    }
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
      setWithdrawFee(withdrawFee);
    }
  }, [assets, calculateTransferFee]);

  useEffect(() => {
    if (
      selectedAsset === BITCOIN_ASSET_SYMBOL &&
      !loadingSidechainAccounts &&
      bitcoinSidechainAccount &&
      hasBTCDepositAddress
    ) {
      withdrawForm.setFieldsValue({
        withdrawAddress: bitcoinSidechainAccount?.withdraw_address,
        withdrawPublicKey: bitcoinSidechainAccount?.withdraw_public_key,
      });
      setWithdrawPublicKey(bitcoinSidechainAccount?.withdraw_public_key);
      setWithdrawAddress(bitcoinSidechainAccount?.withdraw_address);
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

  useEffect(() => {
    setUserBalance();
  }, [setUserBalance]);

  useEffect(() => {
    setSelectedAssetPrecission();
  }, [setSelectedAssetPrecission]);

  return {
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
    amount,
    withdrawAddress,
    userBalance,
    withdrawFee,
    btcTransferFee,
    setBtcTransferFee,
    selectedAssetPrecission,
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  };
}
