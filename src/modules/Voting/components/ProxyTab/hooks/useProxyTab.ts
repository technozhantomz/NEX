import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { DEFAULT_PROXY_ID, defaultToken } from "../../../../../api/params";
import {
  useAccount,
  useTransactionBuilder,
  useUpdateAccountTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Account, Proxy, Transaction } from "../../../../../common/types";

import { UseProxyTab } from "./useProxyTab.types";

type Args = {
  serverProxy: Proxy;
  totalGpos: number;
  getProxyAccount: (proxyId: string) => Promise<void>;
};

export function useProxyTab({
  serverProxy,
  totalGpos,
  getProxyAccount,
}: Args): UseProxyTab {
  const [localProxy, setLocalProxy] = useState<Proxy>({ ...serverProxy });
  const [searchError, setSearchError] = useState<boolean>(false);
  const [updateAccountFee, setUpdateAccountFee] = useState<number>(0);
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [pendingTransaction, setPendingTransaction] = useState<Transaction>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedAccount, setSearchedAccount] = useState<Account | undefined>();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [isPublishable, setIsPublishable] = useState<boolean>(false);
  const [isSameAccount, setIsSameAccount] = useState<boolean>(false);

  const { id, assets, name, localStorageAccount } = useUserContext();
  const {
    getAccountByName,
    getFullAccount,
    getPrivateKey,
    formAccountBalancesByName,
  } = useAccount();
  const { buildUpdateAccountTransaction } =
    useUpdateAccountTransactionBuilder();
  const { getTrxFee, buildTrx } = useTransactionBuilder();

  const searchChange = useCallback(
    async (inputEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(inputEvent.target.value);
      const account = await getAccountByName(inputEvent.target.value);
      if (account) {
        if (account.name === localStorageAccount) {
          setIsSameAccount(true);
          setSearchError(true);
        } else {
          setSearchedAccount(account);
          setIsSameAccount(false);
          setSearchError(false);
        }
      } else {
        setIsSameAccount(false);
        setSearchError(true);
      }
    },
    [
      getAccountByName,
      setSearchedAccount,
      setSearchError,
      setSearchValue,
      setIsSameAccount,
    ]
  );

  const getUpdateAccountTrx = useCallback(async () => {
    const fullAccount = await getFullAccount(localStorageAccount, false);
    if (fullAccount !== undefined && id) {
      const new_options = fullAccount.account.options;
      new_options.voting_account =
        localProxy && localProxy.id ? localProxy.id : DEFAULT_PROXY_ID;
      const trx = buildUpdateAccountTransaction(
        {
          new_options,
          extensions: { value: { update_last_voting_time: true } },
        },
        id
      );
      setPendingTransaction(trx);
      return trx;
    }
  }, [
    getFullAccount,
    localStorageAccount,
    id,
    localProxy,
    localProxy.id,
    localProxy.name,
    buildUpdateAccountTransaction,
    setPendingTransaction,
  ]);

  const checkIsPublishable = useCallback(
    (serverProxy: Proxy, localProxy: Proxy) => {
      if (serverProxy.id === localProxy.id) {
        setIsPublishable(false);
      } else {
        setIsPublishable(true);
      }
    },
    [setIsPublishable]
  );

  const getUpdateAccountFee = useCallback(async () => {
    const trx = await getUpdateAccountTrx();
    if (trx !== undefined) {
      const fee = await getTrxFee([trx]);
      setUpdateAccountFee(fee);
    }
  }, [getUpdateAccountTrx, getTrxFee, setUpdateAccountFee]);

  const handlePublishChanges = useCallback(
    async (password: string) => {
      const userDefaultAsset = assets.find(
        (asset) => asset.symbol === defaultToken
      );
      if (
        userDefaultAsset === undefined ||
        (userDefaultAsset.amount as number) < updateAccountFee
      ) {
        setTransactionErrorMessage("Insufficient balance to pay the fee.");
        return;
      }
      if (totalGpos <= 0) {
        setTransactionErrorMessage("You need to Vest some GPOS balance first");
      } else {
        setTransactionErrorMessage("");
        const activeKey = getPrivateKey(password, "active");
        let trxResult;
        try {
          setLoadingTransaction(true);
          trxResult = await buildTrx([pendingTransaction], [activeKey]);
          setLoadingTransaction(false);
        } catch (error) {
          console.log(error);
          setTransactionErrorMessage("Unable to process the transaction!");
          setLoadingTransaction(false);
        }
        if (trxResult) {
          formAccountBalancesByName(localStorageAccount);
          await getProxyAccount(localProxy.id);
          setIsPublishable(false);
          setTransactionErrorMessage("");
          setTransactionSuccessMessage(
            "You have successfully published your proxy"
          );
          setLoadingTransaction(false);
        } else {
          setTransactionErrorMessage("Unable to process the transaction!");
          setLoadingTransaction(false);
        }
      }
    },
    [
      assets,
      defaultToken,
      updateAccountFee,
      setTransactionErrorMessage,
      totalGpos,
      getPrivateKey,
      setLoadingTransaction,
      buildTrx,
      pendingTransaction,
      formAccountBalancesByName,
      getProxyAccount,
      localProxy,
      localProxy.id,
      localProxy.name,
    ]
  );

  const addProxy = useCallback(
    (account: Account) => {
      if (account) {
        const localProxy: Proxy = { name: account.name, id: account.id };
        setLocalProxy(localProxy);
        setSearchedAccount(undefined);
        setSearchError(false);
        setSearchValue("");
        checkIsPublishable(serverProxy, localProxy);
      } else {
        setSearchError(true);
      }
    },
    [setSearchError, setLocalProxy, serverProxy, serverProxy.id, setSearchValue]
  );

  const removeProxy = useCallback(() => {
    const localProxy: Proxy = {
      name: "",
      id: DEFAULT_PROXY_ID,
    };
    setLocalProxy(localProxy);
    checkIsPublishable(serverProxy, localProxy);
  }, [setLocalProxy, DEFAULT_PROXY_ID, serverProxy, serverProxy.id]);

  const resetChanges = useCallback(() => {
    setLocalProxy({ ...serverProxy });
    setIsPublishable(false);
  }, [setLocalProxy, serverProxy, serverProxy.id, setIsPublishable]);

  useEffect(() => {
    getUpdateAccountFee();
  }, [getUpdateAccountFee]);

  useEffect(() => {
    setLocalProxy({ ...serverProxy });
  }, [serverProxy, serverProxy.id, serverProxy.name]);

  return {
    name,
    searchError,
    searchedAccount,
    updateAccountFee,
    loadingTransaction,
    transactionErrorMessage,
    transactionSuccessMessage,
    addProxy,
    removeProxy,
    searchChange,
    handlePublishChanges,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    localProxy,
    isPublishable,
    resetChanges,
    searchValue,
    isSameAccount,
  };
}
