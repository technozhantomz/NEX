import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAppSettingsContext, usePeerplaysApiContext } from "..";
import { useAsset, useLocalStorage, useSessionStorage } from "../../hooks";
import {
  Account,
  Asset,
  BitcoinSidechainAccounts,
  FullAccount,
  KeyType,
  SidechainAccount,
} from "../../types";

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
  hasBTCDepositAddress: false,
  hasBTCWithdrawPublicKey: false,
  bitcoinSidechainAccounts: undefined,
  setBitcoinSidechainAccounts: function (value: BitcoinSidechainAccounts) {
    throw new Error(`Function not implemented. ${value},`);
  },
  getSidechainAccounts: function (accountId: string) {
    throw new Error(`Function not implemented. ${accountId},`);
  },
  sidechainAccounts: [],
  bitcoinSidechainAccount: undefined,
  loadingSidechainAccounts: true,
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
  const { settings } = useAppSettingsContext();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [assets, _setAssets] = useState<Asset[]>([]);
  const [password, setPassword] = useState<string>("");
  const [keyType, setKeyType] = useState<KeyType>("");
  const passwordTimeout = useRef<NodeJS.Timeout>();
  const [account, setAccount] = useState<Account | undefined>();
  const [sidechainAccounts, setSidechainAccounts] = useState<
    SidechainAccount[]
  >([]);
  const [bitcoinSidechainAccount, setBitcoinSidechainAccount] =
    useState<SidechainAccount>();
  const [loadingSidechainAccounts, setLoadingSidechainAccounts] =
    useState<boolean>(true);
  const [hasBTCDepositAddress, setHasBTCDepositAddress] =
    useState<boolean>(false);
  const [hasBTCWithdrawPublicKey, setHasBTCWithdrawPublicKey] =
    useState<boolean>(false);
  const [bitcoinSidechainAccounts, setBitcoinSidechainAccounts] =
    useSessionStorage("bitcoinSidechainAccounts") as [
      BitcoinSidechainAccounts,
      (value: BitcoinSidechainAccounts) => void
    ];

  const getSidechainAccounts = useCallback(
    async (accountId: string) => {
      try {
        setLoadingSidechainAccounts(true);
        const accounts = (await dbApi("get_sidechain_addresses_by_account", [
          accountId,
        ])) as SidechainAccount[];
        setSidechainAccounts(accounts);
        if (accounts && accounts.length) {
          const bitcoinSidechain = accounts.find(
            (account) => account.sidechain === "bitcoin"
          );
          if (bitcoinSidechain) {
            setBitcoinSidechainAccount(bitcoinSidechain);
            if (
              bitcoinSidechain.deposit_address &&
              bitcoinSidechain.deposit_address !== ""
            ) {
              setHasBTCDepositAddress(true);
            }
            if (
              bitcoinSidechain.withdraw_public_key &&
              bitcoinSidechain.withdraw_public_key !== ""
            ) {
              setHasBTCWithdrawPublicKey(true);
            }
          }
        }
        setLoadingSidechainAccounts(false);
      } catch (e) {
        console.log(e);
        setLoadingSidechainAccounts(false);
      }
    },
    [
      dbApi,
      setSidechainAccounts,
      setHasBTCDepositAddress,
      setLoadingSidechainAccounts,
      setHasBTCWithdrawPublicKey,
      setBitcoinSidechainAccount,
    ]
  );

  const updateSidechainAccounts = useCallback(
    (
      sidechainAccounts: SidechainAccount[],
      bitcoinSidechainAccount: SidechainAccount | undefined,
      hasBTCDepositAddress: boolean,
      hasBTCWithdrawPublicKey: boolean
    ) => {
      setSidechainAccounts(sidechainAccounts);
      setBitcoinSidechainAccount(bitcoinSidechainAccount);
      setHasBTCDepositAddress(hasBTCDepositAddress);
      setHasBTCWithdrawPublicKey(hasBTCWithdrawPublicKey);
    },
    [
      setSidechainAccounts,
      setBitcoinSidechainAccount,
      setHasBTCDepositAddress,
      setHasBTCWithdrawPublicKey,
    ]
  );

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

  useEffect(() => {
    if (id !== null && id !== "") {
      getSidechainAccounts(id);
    } else {
      updateSidechainAccounts([], undefined, false, false);
    }
  }, [id, getSidechainAccounts]);

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
        hasBTCDepositAddress,
        hasBTCWithdrawPublicKey,
        getSidechainAccounts,
        loadingSidechainAccounts,
        sidechainAccounts,
        bitcoinSidechainAccount,
        bitcoinSidechainAccounts,
        setBitcoinSidechainAccounts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  return useContext<UserContextType>(UserContext);
};
