import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAsset, useLocalStorage } from "../../hooks";
import { Asset, FullAccount } from "../../types";
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
  password: "",
  updateAccount: function (id: string, name: string, assets: Asset[]): void {
    throw new Error(`Function not implemented. ${id},${name}, ${assets}`);
  },
  setAssets: function (assets: Asset[]): void {
    throw new Error(`Function not implemented. ${assets}`);
  },
  setPassword: function (password: string) {
    throw new Error(`Function not implemented. ${password}`);
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
  const { dbApi } = usePeerplaysApiContext();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [assets, _setAssets] = useState<Asset[]>([]);
  // should add lock time functionality
  const [password, _setPassword] = useState<string>("");

  const updateAccount = useCallback(
    (id: string, name: string, assets: Asset[]) => {
      setId(id);
      setName(name);
      _setAssets(assets);
    },
    [setId, setName, _setAssets]
  );

  const setAssets = useCallback(
    (assets: Asset[]) => {
      _setAssets(assets);
    },
    [_setAssets]
  );

  // should implement lock time functionality
  const setPassword = useCallback(
    (password: string) => {
      _setPassword(password);
    },
    [_setPassword]
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

          updateAccount(
            fullAccount.account.id,
            fullAccount.account.name,
            assets
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
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        id,
        name,
        assets,
        localStorageAccount,
        setLocalStorageAccount,
        password,
        updateAccount,
        setAssets,
        setPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  return useContext<UserContextType>(UserContext);
};
