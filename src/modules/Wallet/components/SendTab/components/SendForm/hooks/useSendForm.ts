import counterpart from "counterpart";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

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
  useAccount,
  useAsset,
  useFees,
  useSonNetwork,
  useTransactionBuilder,
  useTransferTransactionBuilder,
} from "../../../../../../../common/hooks";
import { useUserContext } from "../../../../../../../common/providers";
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

  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<
    string | undefined
  >(assetSymbol);
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>();
  const [toAccount, setToAccount] = useState<Account>();
  const [fromAccount, setFromAccount] = useState<Account>();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [isSonNetworkOk, setIsSonNetworkOk] = useState<boolean>();
  const [selectedAssetPrecission, _setSelectedAssetPrecission] =
    useState<number>(5);
  const [btcTransferFee, _setBtcTransferFee] = useState<number>(0.0003);
  const afterTransactionModalClose = useRef<() => void>();

  const assetBlockchains: {
    [assetSymbol: string]: string[];
  } = {
    BTC: [defaultNetwork, BITCOIN_NETWORK],
    HIVE: [defaultNetwork, HIVE_NETWORK],
    HBD: [defaultNetwork, HIVE_NETWORK],
  };
  const blockchains = assetSymbol
    ? assetBlockchains[assetSymbol]
      ? assetBlockchains[assetSymbol]
      : [defaultNetwork]
    : [];

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

  const handleValuesChange = useCallback(
    (changedValues: any) => {
      if (changedValues.amount !== undefined) {
        let amount = limitByPrecision(
          changedValues.amount,
          selectedAsset?.precision
        );
        sendForm.setFieldsValue({
          amount: amount,
        });
        amount = amount ? amount : "0";
        setAmount(amount);
      }
      afterTransactionModalClose.current = undefined;
    },
    [limitByPrecision, selectedAsset, sendForm, setAmount]
  );

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
          selectedAsset as Asset,
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
      selectedAsset,
    ]
  );

  const setFeeWithMemo = useCallback(
    async (to: string, memo: string) => {
      console.log("to", to);
      console.log("memo", memo);
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

  const send = useCallback(
    async (signerKey: SignerKey) => {
      setTransactionErrorMessage("");
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
        setLoadingTransaction(true);
        const trx = await buildSendFormTransaction(_to, _memo);
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        afterTransactionModalClose.current = () => {
          sendForm.resetFields();
        };
        formAccountBalancesByName(localStorageAccount);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.successfully_transferred`, {
            amount: values.amount,
            asset: values.asset,
            to: values.to,
          })
        );
        setLoadingTransaction(false);
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      setTransactionErrorMessage,
      sendForm,
      setLoadingTransaction,
      buildSendFormTransaction,
      buildTrx,
      localStorageAccount,
      formAccountBalancesByName,
      setTransactionSuccessMessage,
      selectedBlockchain,
      defaultNetwork,
      SON_ACCOUNT_NAME,
      HIVE_NETWORK,
    ]
  );

  const setSelectedAssetPrecission = useCallback(() => {
    if (selectedAsset) {
      _setSelectedAssetPrecission(selectedAsset.precision);
    }
  }, [selectedAsset, _setSelectedAssetPrecission]);

  /*********  Validation Funcations ***************/
  const validateChainAndAssetSelection = () => {
    if (!selectedAssetSymbol) {
      return counterpart.translate(`field.errors.first_select_asset`);
    }
    if (!selectedBlockchain) {
      return counterpart.translate(`field.errors.first_select_blockchain`);
    }
    return undefined;
  };

  const commonlyValidateAmount = (value: string) => {
    const selectionError = validateChainAndAssetSelection();
    if (selectionError) {
      return selectionError;
    }
    if (Number(value) <= 0) {
      return counterpart.translate(`field.errors.amount_should_greater`);
    }
    if (!selectedAsset) {
      return counterpart.translate(`field.errors.balance_not_enough`);
    }
    return undefined;
  };
  const validateDefaultAssetAmount = (value: string) => {
    const total = Number(value) + feeAmount;
    if ((selectedAsset?.amount as number) < total) {
      return counterpart.translate(`field.errors.balance_not_enough`);
    }
    return undefined;
  };
  const validateSideBlockchainsAmount = (value: string) => {
    if ((selectedAsset?.amount as number) < Number(value)) {
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
      selectedAssetSymbol === BITCOIN_ASSET_SYMBOL &&
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
    const commonErrorMessage = commonlyValidateAmount(value);
    if (commonErrorMessage) {
      return Promise.reject(new Error(commonErrorMessage));
    }

    const isDefaultAsset = selectedAssetSymbol === defaultToken;
    if (isDefaultAsset) {
      const defaultAssetError = validateDefaultAssetAmount(value);
      if (defaultAssetError) {
        return Promise.reject(new Error(defaultAssetError));
      }
      return Promise.resolve();
    } else {
      const sideBlockchainsError = validateSideBlockchainsAmount(value);
      if (sideBlockchainsError) {
        return Promise.reject(new Error(sideBlockchainsError));
      }
      return Promise.resolve();
    }
  };

  const validateToInPeerplays = async (value: string) => {
    let errorMessage = "";
    const acc = await getAccountByName(value);

    if (value === localStorageAccount) {
      errorMessage = counterpart.translate(`field.errors.cannot_send_yourself`);
      return errorMessage;
    }
    if (!acc) {
      errorMessage = counterpart.translate(`field.errors.user_not_found`);
      return errorMessage;
    }
    if (
      sonAccount &&
      (acc.id === sonAccount.id || acc.name === sonAccount.name)
    ) {
      errorMessage = counterpart.translate(
        `field.errors.choose_another_blockchain`
      );
      return errorMessage;
    }
    setToAccount(acc);
    return errorMessage;
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
      : "";
  };
  const validateToInHive = async (value: string) => {
    const isValid = utils.validateGrapheneAccountName(value);
    if (!isValid) {
      return counterpart.translate(
        `field.errors.invalid_withdraw_hive_address`
      );
    }
    try {
      await setFeeWithMemo(SON_ACCOUNT_NAME, value);
    } catch (e) {
      console.log(e);
    }
    return undefined;
  };
  const validateTo = async (_: unknown, value: string) => {
    const selectionError = validateChainAndAssetSelection();
    if (selectionError) {
      return Promise.reject(new Error(selectionError));
    }

    if (selectedBlockchain === defaultNetwork) {
      const errorMessage = await validateToInPeerplays(value);
      return errorMessage
        ? Promise.reject(new Error(errorMessage))
        : Promise.resolve();
    } else {
      setToAccount(sonAccount);
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
        const hiveError = await validateToInHive(value);
        return hiveError
          ? Promise.reject(new Error(hiveError))
          : Promise.resolve();
      }
    }
  };

  const validateMemo = async (_: unknown, value: string) => {
    console.log("ghasem");
    const { to } = sendForm.getFieldsValue();
    if (value) {
      await setFeeWithMemo(to, value);
    }
    return Promise.resolve();
  };

  const formValdation = {
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
    memo: [{ validator: validateMemo }],
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
    const transferFee = calculateTransferFee("");
    if (transferFee) {
      setFeeAmount(transferFee);
    }
  }, [setFeeAmount, calculateTransferFee, selectedAsset, selectedBlockchain]);

  useEffect(() => {
    if (!assetSymbol || assetSymbol === "") {
      setSelectedAssetSymbol("");
      setSelectedBlockchain(undefined);
      sendForm.resetFields();
    } else {
      setSelectedAssetSymbol(assetSymbol);
      setSelectedBlockchain(undefined);
      sendForm.setFieldsValue({
        asset: assetSymbol,
        blockchain: undefined,
        amount: undefined,
        to: undefined,
        memo: undefined,
      });
    }
  }, [assetSymbol]);

  useEffect(() => {
    setSelectedAsset(assets.find((asset) => asset.symbol === assetSymbol));
  }, [assetSymbol, assets, assets.length]);

  useEffect(() => {
    setSelectedAssetPrecission();
  }, [setSelectedAssetPrecission]);

  return {
    assets,
    onAssetChange,
    assetBlockchains: blockchains,
    sendForm,
    selectedAssetSymbol,
    selectedAsset,
    handleValuesChange,
    onBlockchainChange,
    selectedBlockchain,
    formValdation,
    feeAmount,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    send,
    amount,
    localStorageAccount,
    toAccount: sendForm.getFieldsValue().to,
    selectedAssetPrecission,
    btcTransferFee,
    afterTransactionModalClose: afterTransactionModalClose.current,
  };
}
