import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAsset, useLocalStorage } from "../../hooks";
import { Asset, FullAccount, Vote } from "../../types";
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
  votes: [],
  isAccountLocked: true,
  updateAccount: function (
    id: string,
    name: string,
    assets: Asset[],
    votes: Vote[]
  ): void {
    throw new Error(
      `Function not implemented. ${id},${name}, ${assets}, ${votes}`
    );
  },
  setAssets: function (assets: Asset[]): void {
    throw new Error(`Function not implemented. ${assets}`);
  },
  setVotes: function (votes: Vote[]): void {
    throw new Error(`Function not implemented. ${votes}`);
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
  const { dbApi } = usePeerplaysApiContext();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [assets, _setAssets] = useState<Asset[]>([]);
  const [votes, _setVotes] = useState<Vote[]>([]);
  const [isAccountLocked, _setIsAccountLocked] = useState<boolean>(true);

  const updateAccount = useCallback(
    (id: string, name: string, assets: Asset[], votes: Vote[]) => {
      setId(id);
      setName(name);
      _setAssets(assets);
      _setVotes(votes);
    },
    [setId, setName, _setAssets, _setVotes]
  );

  const setAssets = useCallback(
    (assets: Asset[]) => {
      _setAssets(assets);
    },
    [_setAssets]
  );

  const setVotes = useCallback(
    (votes: Vote[]) => {
      _setVotes(votes);
    },
    [_setVotes]
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

          console.log(fullAccount);

          const votes: Vote[] = await dbApi("lookup_vote_ids", [
            //fullAccount.account.options.votes,
            ["1:0", "1:1"],
            false,
          ]).then((e: any) =>
            e.length
              ? e.map((v: Vote) => {
                  return v;
                })
              : undefined
          );

          console.log(votes);

          updateAccount(
            fullAccount.account.id,
            fullAccount.account.name,
            assets,
            votes
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
        votes,
        localStorageAccount,
        setLocalStorageAccount,
        isAccountLocked,
        updateAccount,
        setAssets,
        setVotes,
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
