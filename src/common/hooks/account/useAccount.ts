import { Login, PrivateKey } from "peerplaysjs-lib";
import { useCallback, useState } from "react";

import { useAsset } from "..";
import { defaultToken } from "../../../api/params";
import { usePeerplaysApiContext, useUserContext } from "../../providers";
import {
  Account,
  Asset,
  FullAccount,
  KeyType,
  Permissions,
  WhaleVaultPubKeys,
  WitnessAccount,
} from "../../types";

import { UseAccountResult } from "./useAccount.types";

export function useAccount(): UseAccountResult {
  const {
    localStorageAccount,
    updateAccount,
    setAssets,
    savePassword,
    removePassword,
    setLocalStorageAccount,
    setBitcoinSidechainAccounts,
  } = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { formAssetBalanceById } = useAsset();
  const { dbApi, whaleVaultInstance } = usePeerplaysApiContext();

  const getFullAccount = useCallback(
    async (name: string, subscription: boolean) => {
      try {
        const fullAccounts = await dbApi("get_full_accounts", [
          [name],
          subscription,
        ]);
        if (fullAccounts && fullAccounts.length) {
          return fullAccounts[0][1] as FullAccount;
        } else {
          return undefined;
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const getAccounts = useCallback(
    async (idsOrNames: string[]) => {
      try {
        const accounts: (Account | undefined)[] = await dbApi("get_accounts", [
          idsOrNames,
        ]);
        return accounts;
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
    updateAccount("", "", [], undefined);
    removePassword();
    setLocalStorageAccount("");
    setBitcoinSidechainAccounts(undefined);
  }, [updateAccount, removePassword, setLocalStorageAccount]);

  const formAccountAfterConfirmation = useCallback(
    async (fullAccount: FullAccount, password: string, keyType: KeyType) => {
      try {
        setLoading(true);
        const assets = await Promise.all(
          fullAccount.balances.map((balance) => {
            return formAssetBalanceById(balance.asset_type, balance.balance);
          })
        );
        updateAccount(
          fullAccount.account.id,
          fullAccount.account.name,
          assets.filter((asset) => asset !== undefined) as Asset[],
          fullAccount.account
        );
        savePassword(password, keyType);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [updateAccount, formAssetBalanceById, setLoading, savePassword]
  );

  const formAccountByName = useCallback(
    async (name: string, subscription: boolean) => {
      try {
        setLoading(true);
        const fullAccount = await getFullAccount(name, subscription);
        if (fullAccount) {
          const assets = await Promise.all(
            fullAccount.balances.map((balance) => {
              return formAssetBalanceById(balance.asset_type, balance.balance);
            })
          );
          updateAccount(
            fullAccount.account.id,
            fullAccount.account.name,
            assets.filter((asset) => asset !== undefined) as Asset[],
            fullAccount.account
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

  const getPrivateKey = useCallback((password: string, role: string): any => {
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
  }, []);

  const validateAccountPassword = useCallback(
    (password: string, account: Account) => {
      const roles = ["active", "owner", "memo"];
      let checkPassword = false;
      let keyType: KeyType = "";
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
        let userKeys: string[] = [];
        if (role !== "memo") {
          const permission = account[role as keyof Account] as Permissions;
          userKeys = permission.key_auths.map((key_auth) => key_auth[0]);
        } else {
          userKeys = [account.options.memo_key];
        }
        if (userKeys.includes(pubKey)) {
          checkPassword = true;
          keyType = fromWif ? (role as KeyType) : "password";
          break;
        }
      }
      return { checkPassword, keyType };
    },
    []
  );

  const getUserNameById = useCallback(
    async (id: string): Promise<string> => {
      const activeUser = await getAccountByName(localStorageAccount);
      if (activeUser?.id === id) {
        return activeUser?.name;
      }

      let userID = id;

      if (id.includes("1.6.")) {
        const witness: WitnessAccount = (
          await dbApi("get_witnesses", [[id]])
        )[0];
        userID = witness.witness_account;
      }

      const user: Account = (await dbApi("get_accounts", [[userID]]))[0];
      return user.name;
    },
    [localStorageAccount, getAccountByName]
  );

  const getUserNamesByIds = useCallback(
    async (ids: string[]) => {
      const names = [...ids];
      const witnessesIds = ids.filter((id) => id.includes("1.6."));
      let witnesses: WitnessAccount[] = [];
      let witnessesAccounts: Account[] = [];
      const accountIds = ids.filter((id) => !id.includes("1.6."));
      const accounts: Account[] = await dbApi("get_accounts", [accountIds]);
      if (witnessesIds.length > 0) {
        witnesses = await dbApi("get_witnesses", [witnessesIds]);
        witnessesAccounts = await dbApi("get_accounts", [
          witnesses.map((wit) => wit.witness_account),
        ]);
      }
      const activeUser = await getAccountByName(localStorageAccount);
      const activeUserId = activeUser?.id ?? "";
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        if (activeUserId === id) {
          names[i] = activeUserId;
          continue;
        }
        if (id.includes("1.6.")) {
          const witness = witnesses.find(
            (wit) => wit.id === id
          ) as WitnessAccount;
          const witnessAccount = witnessesAccounts.find(
            (account) => account.id === witness.witness_account
          ) as Account;
          names[i] = witnessAccount.name;
          continue;
        }
        names[i] = (
          accounts.find((account) => account.id === id) as Account
        ).name;
      }

      return names;
    },
    [getAccountByName, localStorageAccount]
  );

  const validateWhaleVaultPubKeys = useCallback(
    (pubkeys: WhaleVaultPubKeys, account: Account, keyType?: KeyType) => {
      let isValid = false;

      let { activePubkey, memoPubkey } = pubkeys;
      if (!keyType || keyType === "active") {
        if (activePubkey) {
          activePubkey = activePubkey
            .slice(0, 4)
            .includes(defaultToken as string)
            ? activePubkey
            : activePubkey.replace("KSH", defaultToken as string);
          const accountActiveKey = account.active.key_auths[0][0];
          if (accountActiveKey === activePubkey) {
            isValid = true;
            return isValid;
          }
        }
      }
      if (!keyType || keyType === "memo") {
        if (memoPubkey) {
          memoPubkey = memoPubkey.slice(0, 4).includes(defaultToken as string)
            ? memoPubkey
            : memoPubkey.replace("KSH", defaultToken as string);
          const accountMemoKey = account.options.memo_key;
          if (accountMemoKey === memoPubkey) {
            isValid = true;
            return isValid;
          }
        }
      }
      return isValid;
    },
    [defaultToken]
  );

  const _validateUseWhaleVault = useCallback(
    async (account: Account, keyType?: KeyType) => {
      let response = "";
      let isValid = false;
      if (whaleVaultInstance) {
        try {
          const res = await whaleVaultInstance.promiseRequestPubKeys(
            "homepesa",
            `ksh:${account.name}`
          );
          if (res.success) {
            const pubKeys = res.result[`ppy:${account.name}`];
            if (Object.keys(pubKeys).length) {
              const isValidKeys = validateWhaleVaultPubKeys(
                pubKeys,
                account,
                keyType
              );
              if (!isValidKeys) {
                response = "field.errors.wrong_whalevault_keys";
              } else {
                isValid = true;
              }
            } else {
              response = "field.errors.not_added_to_whalevault";
            }
          } else {
            response = "field.errors.whalevault_connection_error";
          }
        } catch (e) {
          console.log(e);
          response = "field.errors.whalevault_connection_error";
        }
      } else {
        response = "field.errors.whalevault_not_installed";
      }
      return { response, isValid };
    },
    [whaleVaultInstance, validateWhaleVaultPubKeys]
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
    getUserNameById,
    validateWhaleVaultPubKeys,
    _validateUseWhaleVault,
    getAccounts,
    getUserNamesByIds,
  };
}
