import { useCallback, useState } from "react";

import { usePeerplaysApi } from "../components/PeerplaysApi";
import { Asset } from "../types";
import { FullAccount } from "../types/Account";

import { useAsset, useLocalStorage } from ".";

export function useAccount(): {
  name: string;
  id: string;
  assets: Asset[];
  formAccountByName: (name: string, subscription: boolean) => Promise<void>;
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  loading: boolean;
  formAccountBalancesByName: (name: string) => Promise<void>;
} {
  const [localStorageAccount, setLocalStorageAccount] = useLocalStorage(
    "currentAccount"
  ) as [string, (value: string) => void];
  const { formAssetBalanceById } = useAsset();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { dbApi } = usePeerplaysApi();

  const formAccountByName = useCallback(
    async (name: string, subscription: boolean) => {
      try {
        setLoading(true);
        const fullAccount: FullAccount = await dbApi("get_full_accounts", [
          [name],
          subscription,
        ]);
        setId(fullAccount.account.id);
        setName(fullAccount.account.name);
        const assets: Asset[] = await Promise.all(
          fullAccount.balances.map((balance) => {
            return formAssetBalanceById(balance.asset_type, balance.balance);
          })
        );
        setAssets(assets);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    },
    [dbApi, setId, setName, formAssetBalanceById, setAssets, setLoading]
  );

  const formAccountBalancesByName = useCallback(async (name: string) => {
    const balances = await dbApi("get_account_balances", [name, []]);
    const assets: Asset[] = await Promise.all(
      balances.map((balance: { amount: number; asset_id: string }) => {
        return formAssetBalanceById(balance.asset_id, balance.amount);
      })
    );
    setAssets(assets);
  }, []);

  return {
    loading,
    id,
    name,
    assets,
    localStorageAccount,
    setLocalStorageAccount,
    formAccountByName,
    formAccountBalancesByName,
  };
}
