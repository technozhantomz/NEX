import { Login, PrivateKey } from "peerplaysjs-lib";
import { useCallback, useState } from "react";

import { useAsset, useSidechainAccounts } from "..";
import { defaultToken } from "../../../api/params";
import { usePeerplaysApiContext } from "../../components/PeerplaysApiProvider";
import { useUserContext } from "../../components/UserProvider";
import { Account, Asset, FullAccount, UserKey } from "../../types";

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
  const { getSidechainAccounts } = useSidechainAccounts();

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

  const getAccountByName = useCallback(
    async (name: string) => {
      try {
        const account: Account = await dbApi("get_account_by_name", [name]);
        return account;
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const removeAccount = useCallback(() => {
    updateAccount("", "", [], []);
    setIsAccountLocked(true);
    setLocalStorageAccount("");
  }, [updateAccount, setIsAccountLocked, setLocalStorageAccount]);

  const formAccountAfterConfirmation = useCallback(
    async (fullAccount: FullAccount) => {
      try {
        setLoading(true);
        const assets: Asset[] = await Promise.all(
          fullAccount.balances.map((balance) => {
            return formAssetBalanceById(balance.asset_type, balance.balance);
          })
        );
        const sidechainAcccounts = await getSidechainAccounts(
          fullAccount.account.id
        );
        updateAccount(
          fullAccount.account.id,
          fullAccount.account.name,
          assets,
          sidechainAcccounts
        );
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
          const sidechainAcccounts = await getSidechainAccounts(
            fullAccount.account.id
          );
          updateAccount(
            fullAccount.account.id,
            fullAccount.account.name,
            assets,
            sidechainAcccounts
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

  const validateAccountPassword = useCallback(
    (password: string, account: Account) => {
      const roles = ["active", "owner", "memo"];
      let checkPassword = false;
      let fromWif = "";

      try {
        fromWif = PrivateKey.fromWif(password);
      } catch (e) {
        console.log(e);
      }

      const keys = Login.generateKeys(account.name, password, roles);

      for (const role of roles) {
        const privKey = fromWif ? fromWif : keys.privKeys[role];
        const pubKey = privKey.toPublicKey().toString(defaultToken);
        let key = "";

        if (role !== "memo") {
          const permission = account[role as keyof Account] as UserKey;
          key = permission.key_auths[0][0];
        } else {
          key = account.options.memo_key;
        }
        if (key === pubKey) {
          checkPassword = true;
          break;
        }
      }
      return checkPassword;
    },
    []
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
    validateAccountPassword,
  };
}
