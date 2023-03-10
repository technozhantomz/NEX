//done
import counterpart from "counterpart";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  BITCOIN_ASSET_SYMBOL,
  BITCOIN_NETWORK,
  defaultNetwork,
  defaultToken,
  HIVE_NETWORK,
  SON_ACCOUNT_NAME,
} from "../../../../../../../api/params";
import { utils } from "../../../../../../../api/utils";
import {
  TransactionMessageActionType,
  useAccount,
  useAsset,
  useFees,
  useSonNetwork,
  useTransactionBuilder,
  useTransactionMessage,
  useTransferTransactionBuilder,
} from "../../../../../../../common/hooks";
import {
  useAssetsContext,
  useUserContext,
} from "../../../../../../../common/providers";
import { Account, Asset, SignerKey } from "../../../../../../../common/types";
import { Form } from "../../../../../../../ui/src";

import { SendForm, UseSendFormResult } from "./useSendForm.types";

type Args = {
  assetSymbol?: string;
};
const BITCOIN_MIN_WITHDRAWAL = 0.001;

export function useSendForm({ assetSymbol }: Args): UseSendFormResult {
  const router = useRouter();
  const { assets } = useUserContext();
  const [sendForm] = Form.useForm<SendForm>();
  const { limitByPrecision } = useAsset();
  const { localStorageAccount, bitcoinSidechainAccount, hasBTCDepositAddress } =
    useUserContext();
  const { formAccountBalancesByName, getAccountByName } = useAccount();
  const { sonAccount, getSonNetworkStatus } = useSonNetwork();
  const { calculateTransferFee } = useFees();
  const { buildTransferTransaction } = useTransferTransactionBuilder();
  const { buildTrx, getTrxFee } = useTransactionBuilder();
  const { transactionMessageState, dispatchTransactionMessage } =
    useTransactionMessage();
  const { sidechainAssets } = useAssetsContext();

  const [selectedBlockchain, setSelectedBlockchain] = useState<string>();
  const [toAccount, setToAccount] = useState<Account>();
  const [fromAccount, setFromAccount] = useState<Account>();

  const [amount, setAmount] = useState<string>("0");
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [isSonNetworkOk, setIsSonNetworkOk] = useState<boolean>();
  const [btcTransferFee, _setBtcTransferFee] = useState<number>(0.0003);
  const afterTransactionModalClose = useRef<() => void>();

  const userAsset = useMemo(() => {
    return assets.find((asset) => asset.symbol === assetSymbol);
  }, [assetSymbol, assets, assets.length]);
  const selectedAssetPrecision = useMemo(() => {
    return userAsset ? userAsset.precision : 5;
  }, [userAsset]);

  const selectedAssetBlockchains = useMemo(() => {
    if (assetSymbol) {
      return utils.getAssetBlockchains(assetSymbol);
    } else {
      return [];
    }
  }, [assetSymbol]);

  const [prevAssetSymbol, setPrevAssetSymbol] = useState<string | undefined>(
    assetSymbol
  );
  if (prevAssetSymbol !== assetSymbol) {
    setPrevAssetSymbol(assetSymbol);
    setSelectedBlockchain(undefined);
    setAmount("0");
    setToAccount(undefined);
  }

  const buildSendFormTransaction = useCallback(
    async (_to: string, _memo: string) => {
      const { amount } = sendForm.getFieldsValue();
      try {
        const from = (
          fromAccount
            ? fromAccount
            : await getAccountByName(localStorageAccount)
        ) as Account;
        if (!fromAccount) {
          setFromAccount(from);
        }
        const to = (
          !toAccount || toAccount.name !== _to
            ? await getAccountByName(_to)
            : toAccount
        ) as Account;
        const trx = buildTransferTransaction(
          from,
          to,
          userAsset as Asset,
          amount,
          _memo
        );
        return trx;
      } catch (e) {
        console.log(e);
      }
    },
    [
      sendForm,
      fromAccount,
      getAccountByName,
      localStorageAccount,
      setFromAccount,
      toAccount,
      buildTransferTransaction,
      userAsset,
    ]
  );

  const setFeeWithMemo = useCallback(
    async (to: string, memo: string) => {
      const trx = await buildSendFormTransaction(to, memo);
      if (trx !== undefined) {
        const fee = await getTrxFee([trx]);
        if (fee !== undefined) {
          setFeeAmount(fee);
        }
      }
    },
    [buildSendFormTransaction, getTrxFee, setFeeAmount]
  );

  // Event handlers functions
  const onAssetChange = useCallback(
    (value: unknown) => {
      router.push(`/wallet/${value}?tab=send`);
    },
    [router]
  );
  const onBlockchainChange = useCallback(
    (value: unknown) => {
      setSelectedBlockchain(value as string);
      if (value !== defaultNetwork) {
        sendForm.setFieldsValue({
          memo: undefined,
        });
      }
      if (value === BITCOIN_NETWORK && hasBTCDepositAddress) {
        sendForm.setFieldsValue({
          to: bitcoinSidechainAccount?.withdraw_address,
        });
      } else {
        sendForm.setFieldsValue({
          to: undefined,
        });
      }
    },
    [
      setSelectedBlockchain,
      hasBTCDepositAddress,
      sendForm,
      bitcoinSidechainAccount,
    ]
  );

  const handleAmountChange = useCallback(
    (amount: string) => {
      let modifiedAmount = limitByPrecision(amount, selectedAssetPrecision);
      sendForm.setFieldsValue({
        amount: modifiedAmount,
      });
      modifiedAmount = modifiedAmount ? modifiedAmount : "0";
      setAmount(modifiedAmount);
    },
    [limitByPrecision, selectedAssetPrecision, sendForm, setAmount]
  );
  const handleToChange = useCallback(
    async (to: string) => {
      if (selectedBlockchain === defaultNetwork) {
        const toAccount = await getAccountByName(to);
        setToAccount(toAccount);
        const { memo } = sendForm.getFieldsValue();
        if (memo && toAccount) {
          await setFeeWithMemo(toAccount.name, memo);
        }
      } else {
        setToAccount(sonAccount);
        if (selectedBlockchain === HIVE_NETWORK) {
          await setFeeWithMemo(SON_ACCOUNT_NAME, to);
        }
      }
    },
    [
      selectedBlockchain,
      defaultNetwork,
      getAccountByName,
      setToAccount,
      sendForm,
      sonAccount,
      HIVE_NETWORK,
      setFeeWithMemo,
      SON_ACCOUNT_NAME,
    ]
  );
  const handleMemoChange = useCallback(
    async (memo: string) => {
      if (toAccount) {
        await setFeeWithMemo(toAccount.name, memo);
      }
    },
    [setFeeWithMemo, toAccount]
  );
  const handleValuesChange = useCallback(
    async (changedValues: any) => {
      if (changedValues.amount !== undefined) {
        handleAmountChange(changedValues.amount);
      } else if (changedValues.to !== undefined) {
        await handleToChange(changedValues.to);
      } else if (changedValues.memo !== undefined) {
        await handleMemoChange(changedValues.memo);
      }
      afterTransactionModalClose.current = undefined;
    },
    [handleAmountChange, handleToChange, handleMemoChange]
  );

  const send = useCallback(
    async (signerKey: SignerKey) => {
      dispatchTransactionMessage({
        type: TransactionMessageActionType.CLEAR,
      });
      const values = sendForm.getFieldsValue();
      let _to = "";
      let _memo = "";
      if (selectedBlockchain === defaultNetwork) {
        _to = values.to;
        _memo = values.memo ? values.memo : "";
      } else {
        _to = SON_ACCOUNT_NAME;
        if (selectedBlockchain === HIVE_NETWORK) {
          _memo = values.to;
        }
      }
      let trxResult;
      try {
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADING,
        });
        const trx = await buildSendFormTransaction(_to, _memo);
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (e) {
        console.log(e);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
      if (trxResult) {
        afterTransactionModalClose.current = () => {
          sendForm.resetFields();
        };
        formAccountBalancesByName(localStorageAccount);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_SUCCESS,
          message: counterpart.translate(
            `field.success.successfully_transferred`,
            {
              amount: values.amount,
              asset: values.asset,
              to: values.to,
            }
          ),
        });
      } else {
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
    },
    [
      dispatchTransactionMessage,
      sendForm,
      buildSendFormTransaction,
      buildTrx,
      localStorageAccount,
      formAccountBalancesByName,
      selectedBlockchain,
      defaultNetwork,
      SON_ACCOUNT_NAME,
      HIVE_NETWORK,
    ]
  );

  /*********  Validation Functions ***************/
  const validateChainAndAssetSelection = () => {
    if (!prevAssetSymbol) {
      return counterpart.translate(`field.errors.first_select_asset`);
    }
    if (!selectedBlockchain) {
      return counterpart.translate(`field.errors.first_select_blockchain`);
    }
    return undefined;
  };

  const validateAllAssetsAmount = (value: string) => {
    const selectionError = validateChainAndAssetSelection();
    if (selectionError) {
      return selectionError;
    }
    if (Number(value) <= 0) {
      return counterpart.translate(`field.errors.amount_should_greater`);
    }
    if (!userAsset) {
      return counterpart.translate(`field.errors.balance_not_enough`);
    }
    return undefined;
  };
  const validateDefaultAssetAmount = (value: string) => {
    const total = Number(value) + feeAmount;
    if ((userAsset?.amount as number) < total) {
      return counterpart.translate(`field.errors.balance_not_enough`);
    }
    return undefined;
  };
  const validateSideAssetsAmount = (value: string) => {
    if ((userAsset?.amount as number) < Number(value)) {
      return counterpart.translate(`field.errors.balance_not_enough`);
    }

    const accountDefaultAsset = assets.find(
      (asset) => asset.symbol === defaultToken
    );
    if (
      !accountDefaultAsset ||
      (accountDefaultAsset.amount as number) < feeAmount
    ) {
      return counterpart.translate(`field.errors.balance_not_enough_to_pay`);
    }

    if (
      prevAssetSymbol === BITCOIN_ASSET_SYMBOL &&
      selectedBlockchain === BITCOIN_NETWORK
    ) {
      if (Number(value) < BITCOIN_MIN_WITHDRAWAL) {
        return counterpart.translate(
          `field.errors.amount_should_greater_than`,
          {
            amount: BITCOIN_MIN_WITHDRAWAL,
          }
        );
      }
    }

    return undefined;
  };
  const validateAmount = async (_: unknown, value: string) => {
    const commonErrorMessage = validateAllAssetsAmount(value);
    if (commonErrorMessage) {
      return Promise.reject(new Error(commonErrorMessage));
    }

    const isDefaultAsset = prevAssetSymbol === defaultToken;
    if (isDefaultAsset) {
      const defaultAssetError = validateDefaultAssetAmount(value);
      if (defaultAssetError) {
        return Promise.reject(new Error(defaultAssetError));
      }
      return Promise.resolve();
    } else {
      const sideBlockchainsError = validateSideAssetsAmount(value);
      if (sideBlockchainsError) {
        return Promise.reject(new Error(sideBlockchainsError));
      }
      return Promise.resolve();
    }
  };

  const validateToInPeerplays = (value: string) => {
    if (value === localStorageAccount) {
      return counterpart.translate(`field.errors.cannot_send_yourself`);
    }
    if (!toAccount) {
      return counterpart.translate(`field.errors.user_not_found`);
    }
    if (
      sonAccount &&
      (toAccount.id === sonAccount.id || toAccount.name === sonAccount.name)
    ) {
      return counterpart.translate(`field.errors.choose_another_blockchain`);
    }
    return undefined;
  };
  const validateSonStatus = () => {
    if (isSonNetworkOk === undefined) {
      return counterpart.translate(`field.errors.checking_sons_status`);
    } else {
      if (!isSonNetworkOk) {
        return counterpart.translate(`field.errors.sons_not_available`);
      }
      return undefined;
    }
  };
  const validateToInBitcoin = () => {
    return !hasBTCDepositAddress
      ? counterpart.translate(`field.errors.first_generate_deposit_addresses`)
      : undefined;
  };
  const validateToInHive = (value: string) => {
    const { isValid, error } = utils.validateHiveAccount(value);
    if (!isValid) {
      return error as string;
    }

    return undefined;
  };
  const validateTo = async (_: unknown, value: string) => {
    const selectionError = validateChainAndAssetSelection();
    if (selectionError) {
      return Promise.reject(new Error(selectionError));
    }

    if (selectedBlockchain === defaultNetwork) {
      const errorMessage = validateToInPeerplays(value);
      return errorMessage
        ? Promise.reject(new Error(errorMessage))
        : Promise.resolve();
    } else {
      const sonCheckError = validateSonStatus();
      if (sonCheckError) {
        return Promise.reject(new Error(sonCheckError));
      }

      if (selectedBlockchain === BITCOIN_NETWORK) {
        const bitcoinError = validateToInBitcoin();
        return bitcoinError
          ? Promise.reject(new Error(bitcoinError))
          : Promise.resolve();
      } else {
        const hiveError = validateToInHive(value);
        return hiveError
          ? Promise.reject(new Error(hiveError))
          : Promise.resolve();
      }
    }
  };

  const formValidation = {
    asset: [
      {
        required: true,
        message: counterpart.translate(`field.errors.asset_required`),
      },
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
    blockchain: [
      {
        required: true,
        message: counterpart.translate(`field.errors.blockchain_required`),
      },
    ],
  };

  useEffect(() => {
    let ignore = false;
    async function checkSonNetwork() {
      const isSidechainAsset =
        sidechainAssets.find(
          (sidechainAsset) => sidechainAsset?.symbol === assetSymbol
        ) !== undefined;
      const isSidechainSelected =
        selectedBlockchain && selectedBlockchain !== defaultNetwork;
      if (assetSymbol && isSidechainAsset && isSidechainSelected) {
        setIsSonNetworkOk(undefined);
        const sidechain = utils.getSidechainFromAssetSymbol(
          assetSymbol.toUpperCase()
        );
        const sonNetworkStatus = await getSonNetworkStatus(sidechain);
        if (!ignore) {
          setIsSonNetworkOk(sonNetworkStatus.isSonNetworkOk);
        }
      }
    }
    checkSonNetwork();
    return () => {
      ignore = true;
    };
  }, [getSonNetworkStatus, setIsSonNetworkOk, assetSymbol, selectedBlockchain]);

  useEffect(() => {
    const transferFee = calculateTransferFee("");
    if (transferFee) {
      setFeeAmount(transferFee);
    }
  }, [setFeeAmount, calculateTransferFee, userAsset, selectedBlockchain]);

  // done
  useEffect(() => {
    sendForm.setFieldsValue({
      asset: assetSymbol,
      blockchain: undefined,
      amount: undefined,
      to: undefined,
      memo: undefined,
    });
  }, [prevAssetSymbol]);

  return {
    assets,
    onAssetChange,
    assetBlockchains: selectedAssetBlockchains,
    sendForm,
    selectedAssetSymbol: prevAssetSymbol,
    userAsset,
    handleValuesChange,
    onBlockchainChange,
    selectedBlockchain,
    formValidation,
    feeAmount,
    transactionMessageState,
    dispatchTransactionMessage,
    send,
    amount,
    localStorageAccount,
    toAccount: sendForm.getFieldsValue().to,
    selectedAssetPrecision,
    btcTransferFee,
    afterTransactionModalClose: afterTransactionModalClose.current,
  };
}
