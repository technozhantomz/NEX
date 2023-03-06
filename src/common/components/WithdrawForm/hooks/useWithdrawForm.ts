//done
import * as bitcoin from "bitcoinjs-lib";
import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  BITCOIN_ASSET_SYMBOL,
  defaultToken,
  SON_ACCOUNT_NAME,
  testnetCheck,
} from "../../../../api/params";
import { utils } from "../../../../api/utils";
import { Form } from "../../../../ui/src";
import {
  TransactionMessageActionType,
  useAccount,
  useAsset,
  useFees,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
  useTransactionMessage,
  useTransferTransactionBuilder,
} from "../../../hooks";
import { useAssetsContext, useUserContext } from "../../../providers";
import { Account, SignerKey, Transaction } from "../../../types";

import { UseWithdrawFormResult, WithdrawForm } from "./useWithdrawForm.types";

const NETWORK = testnetCheck ? bitcoin.networks.regtest : undefined;
const BITCOIN_MIN_WITHDRAWAL = 0.001;

export function useWithdrawForm(asset: string): UseWithdrawFormResult {
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
  const {
    buildAddingBitcoinSidechainTransaction,
    buildDeletingBitcoinSidechainTransaction,
  } = useSidechainTransactionBuilder();
  const [withdrawForm] = Form.useForm<WithdrawForm>();
  const { transactionMessageState, dispatchTransactionMessage } =
    useTransactionMessage();

  const [withdrawFee, setWithdrawFee] = useState<number>(0);
  const [selectedAsset, setSelectedAsset] = useState<string>(asset);
  const [amount, setAmount] = useState<string>("0");
  const [isSonNetworkOk, setIsSonNetworkOk] = useState<boolean>();
  const [btcTransferFee, setBtcTransferFee] = useState<number>(0.0003);
  const userBalance = useMemo(() => {
    if (assets && assets.length > 0) {
      const userAsset = assets.find((asset) => asset.symbol === selectedAsset);
      return userAsset ? (userAsset.amount as number) : 0;
    } else {
      return 0;
    }
  }, [assets, selectedAsset]);
  const selectedAssetPrecision = useMemo(() => {
    if (sidechainAssets && sidechainAssets.length > 0) {
      const selectedsidechainAsset = sidechainAssets.find(
        (asset) => asset?.symbol === selectedAsset
      );
      return selectedsidechainAsset ? selectedsidechainAsset.precision : 8;
    } else {
      return 8;
    }
  }, [selectedAsset, sidechainAssets]);

  const handleValuesChange = (changedValues: { amount?: string }) => {
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
      const withdrawFormValues: { [segment: string]: string | undefined } = {
        amount: "0",
      };
      if (String(value) === BITCOIN_ASSET_SYMBOL) {
        withdrawFormValues["withdrawAddress"] =
          bitcoinSidechainAccount?.withdraw_address;
        withdrawFormValues["withdrawPublicKey"] =
          bitcoinSidechainAccount?.withdraw_public_key;
      } else {
        withdrawFormValues["withdrawAddress"] = "";
      }
      setSelectedAsset(String(value));
      withdrawForm.setFieldsValue(withdrawFormValues);
    },
    [
      setSelectedAsset,
      BITCOIN_ASSET_SYMBOL,
      bitcoinSidechainAccount,
      withdrawForm,
    ]
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
    dispatchTransactionMessage({
      type: TransactionMessageActionType.CLEAR,
    });
    dispatchTransactionMessage({
      type: TransactionMessageActionType.LOADING,
    });
    const values = withdrawForm.getFieldsValue();
    const btcSidechainAddressesChanged =
      values.withdrawAddress !== bitcoinSidechainAccount?.withdraw_address ||
      values.withdrawPublicKey !== bitcoinSidechainAccount?.withdraw_public_key;

    if (
      selectedAsset === BITCOIN_ASSET_SYMBOL &&
      btcSidechainAddressesChanged
    ) {
      const transactions: Transaction[] = [];
      const deleteTrx = buildDeletingBitcoinSidechainTransaction(
        id,
        bitcoinSidechainAccount?.id as string,
        id
      );
      transactions.push(deleteTrx);
      const addTrx = buildAddingBitcoinSidechainTransaction(
        id,
        id,
        bitcoinSidechainAccount?.deposit_public_key as string,
        values.withdrawPublicKey,
        values.withdrawAddress
      );
      transactions.push(addTrx);

      try {
        const updateSidechainsTrxResult = await buildTrx(
          [...transactions],
          [signerKey]
        );
        if (!updateSidechainsTrxResult) {
          dispatchTransactionMessage({
            type: TransactionMessageActionType.LOADED_ERROR,
            message: counterpart.translate(`field.errors.transaction_unable`),
          });
          return;
        }
        await getSidechainAccounts(id);
      } catch (e) {
        console.log(e);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
        return;
      }
    }

    try {
      const trx = await buildWithdrawFormTransaction();
      const trxResult = await buildTrx([trx], [signerKey]);
      if (!trxResult) {
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      } else {
        formAccountBalancesByName(localStorageAccount);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_SUCCESS,
          message: counterpart.translate(
            `field.success.successfully_withdrawn`,
            {
              symbol: selectedAsset,
              withdrawAmount: amount,
            }
          ),
        });
        withdrawForm.setFieldsValue({
          amount: "0",
        });
      }
    } catch (e) {
      console.log(e);
      dispatchTransactionMessage({
        type: TransactionMessageActionType.LOADED_ERROR,
        message: counterpart.translate(`field.errors.transaction_unable`),
      });
    }
  };

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
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.invalid_bitcoin_public_key`, {
              network: testnetCheck ? "regtest" : "mainnet",
            })
          )
        );
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error(""));
  };

  const validateBtcWithdrawAddress = (value: string) => {
    let error = "";
    const { withdrawPublicKey } = withdrawForm.getFieldsValue();
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
    if (selectedAsset === BITCOIN_ASSET_SYMBOL) {
      const error = validateBtcWithdrawAddress(value);
      if (error !== "") {
        return Promise.reject(new Error(error));
      } else {
        return Promise.resolve();
      }
    } else {
      const { isValid, error } = utils.validateHiveAccount(value);
      if (!isValid) {
        return Promise.reject(new Error(error));
      }
      await setWithdrawFeeWithMemo();
      return Promise.resolve();
    }
  };

  const formValidation = {
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

  useEffect(() => {
    let ignore = false;
    async function checkSonNetwork() {
      setIsSonNetworkOk(undefined);
      const sidechain = utils.getSidechainFromAssetSymbol(
        selectedAsset.toUpperCase()
      );
      const sonNetworkStatus = await getSonNetworkStatus(sidechain);
      if (!ignore) {
        setIsSonNetworkOk(sonNetworkStatus.isSonNetworkOk);
      }
    }
    checkSonNetwork();
    return () => {
      ignore = true;
    };
  }, [getSonNetworkStatus, selectedAsset]);

  useEffect(() => {
    const withdrawFee = calculateTransferFee("");
    if (withdrawFee) {
      setWithdrawFee(withdrawFee);
    }
  }, [calculateTransferFee]);

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
    }
  }, [
    loadingSidechainAccounts,
    sidechainAccounts,
    bitcoinSidechainAccount,
    hasBTCDepositAddress,
  ]);

  return {
    withdrawForm,
    formValidation,
    handleValuesChange,
    selectedAsset,
    handleAssetChange,
    transactionMessageState,
    dispatchTransactionMessage,
    handleWithdraw,
    amount,
    userBalance,
    withdrawFee,
    btcTransferFee,
    setBtcTransferFee,
    selectedAssetPrecision,
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  };
}
