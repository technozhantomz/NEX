import { Login, PrivateKey } from "peerplaysjs-lib";
import { useCallback, useState } from "react";

import { useAsset } from "..";
import { usePeerplaysApiContext } from "../../components/PeerplaysApiProvider";
import { useUserContext } from "../../components/UserProvider";
import { Asset } from "../../types";
import { Account, FullAccount } from "../../types/Account";

import { UseAccountResult } from "./useAccount.types";

export function useAccount(): UseAccountResult {
  const {
    localStorageAccount,
    updateAccount,
    setAssets,
    setIsAccountLocked,
    setLocalStorageAccount,
  } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { formAssetBalanceById } = useAsset();

  const { dbApi } = usePeerplaysApiContext();

  const getFullAccount = useCallback(
    async (name: string, subscription: boolean) => {
      try {
        const fullAccount: FullAccount = await dbApi("get_full_accounts", [
          [name],
          subscription,
        ]).then((e: any) => (e.length ? e[0][1] : undefined));
        return fullAccount;
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const removeAccount = useCallback(() => {
    updateAccount("", "", []);
    setIsAccountLocked(true);
    setLocalStorageAccount("");
  }, [updateAccount, setIsAccountLocked, setLocalStorageAccount]);

  const getAccountByName = useCallback(async (name: string) => {
    const account = await dbApi("get_account_by_name", [name])
      .then((e: Account) => e)
      .catch(() => false);
    return account;
  }, []);

  const getPrivateKey = useCallback(
    (password: string, role: string): string => {
      let fromWif = "";

      try {
        fromWif = PrivateKey.fromWif(password);
      } catch (e) {
        console.error(e);
      }

      return fromWif
        ? fromWif
        : Login.generateKeys(localStorageAccount, password, [role]).privKeys[
            role
          ];
    },
    []
  );

  const formAccountAfterConfirmation = useCallback(
    async (fullAccount: FullAccount) => {
      try {
        setLoading(true);
        const assets: Asset[] = await Promise.all(
          fullAccount.balances.map((balance) => {
            return formAssetBalanceById(balance.asset_type, balance.balance);
          })
        );
        updateAccount(fullAccount.account.id, fullAccount.account.name, assets);
        setIsAccountLocked(false);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [updateAccount, setIsAccountLocked, formAssetBalanceById, setLoading]
  );

  const formAccountByName = useCallback(
    async (name: string, subscription: boolean) => {
      try {
        setLoading(true);
        const fullAccount = await getFullAccount(name, subscription);
        if (fullAccount) {
          const assets: Asset[] = await Promise.all(
            fullAccount.balances.map((balance) => {
              return formAssetBalanceById(balance.asset_type, balance.balance);
            })
          );
          updateAccount(
            fullAccount.account.id,
            fullAccount.account.name,
            assets
          );
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    },
    [dbApi, updateAccount, formAssetBalanceById, setLoading]
  );

  const formAccountBalancesByName = useCallback(
    async (name: string) => {
      const balances = await dbApi("get_account_balances", [name, []]);
      const assets: Asset[] = await Promise.all(
        balances.map((balance: { amount: number; asset_id: string }) => {
          return formAssetBalanceById(balance.asset_id, balance.amount);
        })
      );
      setAssets(assets);
    },
    [dbApi, setAssets, formAssetBalanceById]
  );

  return {
    formAccountByName,
    loading,
    formAccountBalancesByName,
    getFullAccount,
    getAccountByName,
    getPrivateKey,
    formAccountAfterConfirmation,
    removeAccount,
  };
}
