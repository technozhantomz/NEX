import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAsset, useLocalStorage, useSidechainAccounts } from "../../hooks";
import { Asset, FullAccount, SidechainAcccount } from "../../types";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";

import { UserContextType } from "./UserProvider.types";

interface Props {
  children: React.ReactNode;
}

const defaultUserState: UserContextType = {
  localStorageAccount: "",
  id: "",
  name: "",
  assets: [],
  sidechainAcccounts: [],
  isAccountLocked: true,
  updateAccount: function (
    id: string,
    name: string,
    assets: Asset[],
    sidechainAcccounts: SidechainAcccount[]
  ): void {
    throw new Error(
      `Function not implemented. ${id},${name}, ${assets}, ${sidechainAcccounts}`
    );
  },
  setAssets: function (assets: Asset[]): void {
    throw new Error(`Function not implemented. ${assets}`);
  },
  setSidechainAcccounts: function (
    sidechainAcccounts: SidechainAcccount[]
  ): void {
    throw new Error(`Function not implemented. ${sidechainAcccounts}`);
  },
  setIsAccountLocked: function (isAccountLocked: boolean) {
    throw new Error(`Function not implemented. ${isAccountLocked}`);
  },
  setLocalStorageAccount: function (value: string): void {
    throw new Error(`Function not implemented. ${value}`);
  },
};

const UserContext = createContext<UserContextType>(defaultUserState);

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [localStorageAccount, setLocalStorageAccount] = useLocalStorage(
    "currentAccount"
  ) as [string, (value: string) => void];
  const { formAssetBalanceById } = useAsset();
  const { getSidechainAccounts } = useSidechainAccounts();
  const { dbApi } = usePeerplaysApiContext();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [assets, _setAssets] = useState<Asset[]>([]);
  const [sidechainAcccounts, _setSidechainAcccounts] = useState<
    SidechainAcccount[]
  >([]);
  const [isAccountLocked, _setIsAccountLocked] = useState<boolean>(true);

  const updateAccount = useCallback(
    (
      id: string,
      name: string,
      assets: Asset[],
      sidechainAcccounts: SidechainAcccount[]
    ) => {
      setId(id);
      setName(name);
      _setAssets(assets);
      _setSidechainAcccounts(sidechainAcccounts);
    },
    [setId, setName, _setAssets]
  );

  const setAssets = useCallback(
    (assets: Asset[]) => {
      _setAssets(assets);
    },
    [_setAssets]
  );

  const setSidechainAcccounts = useCallback(
    (sidechainAcccounts: SidechainAcccount[]) => {
      _setSidechainAcccounts(sidechainAcccounts);
    },
    [_setSidechainAcccounts]
  );

  const setIsAccountLocked = useCallback(
    (isAccountLocked: boolean) => {
      _setIsAccountLocked(isAccountLocked);
    },
    [_setIsAccountLocked]
  );

  const formInitialAccountByName = useCallback(
    async (name: string) => {
      try {
        const fullAccount: FullAccount = await dbApi("get_full_accounts", [
          [name],
          true,
        ]).then((e: any) => (e.length ? e[0][1] : undefined));
        if (fullAccount) {
          const assets: Asset[] = await Promise.all(
            fullAccount.balances.map((balance) => {
              return formAssetBalanceById(balance.asset_type, balance.balance);
            })
          );
          const sidechainAcccounts: SidechainAcccount[] =
            await getSidechainAccounts(fullAccount.account.id);
          updateAccount(
            fullAccount.account.id,
            fullAccount.account.name,
            assets,
            sidechainAcccounts
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi, updateAccount, formAssetBalanceById]
  );

  useEffect(() => {
    if (localStorageAccount) {
      formInitialAccountByName(localStorageAccount);
      setTimeout(() => {
        formInitialAccountByName(localStorageAccount);
      }, 30.0 * 1000);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        id,
        name,
        assets,
        sidechainAcccounts,
        localStorageAccount,
        setLocalStorageAccount,
        isAccountLocked,
        updateAccount,
        setAssets,
        setSidechainAcccounts,
        setIsAccountLocked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  return useContext<UserContextType>(UserContext);
};
