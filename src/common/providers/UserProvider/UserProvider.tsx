import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePeerplaysApiContext, useSettingsContext } from "..";
import { useAsset, useLocalStorage } from "../../hooks";
import { Account, Asset, FullAccount, KeyType } from "../../types";

import { UserContextType } from "./UserProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultUserState: UserContextType = {
  localStorageAccount: "",
  id: "",
  name: "",
  assets: [],
  password: "",
  account: undefined,
  keyType: "",
  updateAccount: function (id: string, name: string, assets: Asset[]): void {
    throw new Error(`Function not implemented. ${id},${name}, ${assets}`);
  },
  setAssets: function (assets: Asset[]): void {
    throw new Error(`Function not implemented. ${assets}`);
  },
  setLocalStorageAccount: function (value: string): void {
    throw new Error(`Function not implemented. ${value}`);
  },
  savePassword: function (password: string, keyType: KeyType) {
    throw new Error(`Function not implemented. ${password} ${keyType}`);
  },
  removePassword: function () {
    throw new Error(`Function not implemented.`);
  },
};

const UserContext = createContext<UserContextType>(defaultUserState);

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [localStorageAccount, setLocalStorageAccount] = useLocalStorage(
    "current_account"
  ) as [string, (value: string) => void];
  const { formAssetBalanceById } = useAsset();
  const { dbApi } = usePeerplaysApiContext();
  const { settings } = useSettingsContext();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [assets, _setAssets] = useState<Asset[]>([]);
  const [password, setPassword] = useState<string>("");
  const [keyType, setKeyType] = useState<KeyType>("");
  const passwordTimeout = useRef<NodeJS.Timeout>();
  const [account, setAccount] = useState<Account | undefined>();

  const updateAccount = useCallback(
    (
      id: string,
      name: string,
      assets: Asset[],
      account: Account | undefined
    ) => {
      setId(id);
      setName(name);
      _setAssets(assets);
      setAccount(account);
    },
    [setId, setName, _setAssets, setAccount]
  );

  const setAssets = useCallback(
    (assets: Asset[]) => {
      _setAssets(assets);
    },
    [_setAssets]
  );

  const removePassword = useCallback(() => {
    if (passwordTimeout.current) {
      clearTimeout(passwordTimeout.current);
      passwordTimeout.current = undefined;
    }
    setPassword("");
    setKeyType("");
  }, [passwordTimeout, passwordTimeout.current, setPassword, setKeyType]);

  const savePassword = useCallback(
    (password: string, keyType: KeyType) => {
      const expires = settings.walletLock;
      if (passwordTimeout.current) {
        clearTimeout(passwordTimeout.current);
        passwordTimeout.current = undefined;
      }
      if (!expires) {
        return;
      }

      const passwordExpiration = expires * 60000;

      setKeyType(keyType);
      setPassword(password);
      passwordTimeout.current = setTimeout(removePassword, passwordExpiration);
    },
    [
      setPassword,
      setKeyType,
      settings,
      settings.walletLock,
      passwordTimeout,
      passwordTimeout.current,
      removePassword,
    ]
  );

  const formInitialAccountByName = useCallback(
    async (name: string) => {
      try {
        const fullAccounts = await dbApi("get_full_accounts", [[name], true]);
        if (fullAccounts && fullAccounts.length) {
          const fullAccount: FullAccount = fullAccounts[0][1];
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
        } else {
          setLocalStorageAccount("");
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi, updateAccount, formAssetBalanceById]
  );

  const handleWalletLockChange = useCallback(() => {
    if (password !== "" && keyType !== "") {
      savePassword(password, keyType);
    }
  }, [password, keyType, savePassword]);

  useEffect(() => {
    if (localStorageAccount) {
      formInitialAccountByName(localStorageAccount);
    }
  }, [localStorageAccount]);

  useEffect(() => {
    handleWalletLockChange();
  }, [settings.walletLock]);

  return (
    <UserContext.Provider
      value={{
        id,
        name,
        assets,
        account,
        localStorageAccount,
        setLocalStorageAccount,
        password,
        keyType,
        updateAccount,
        setAssets,
        savePassword,
        removePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  return useContext<UserContextType>(UserContext);
};
