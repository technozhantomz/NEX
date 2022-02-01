import React, { createContext, useContext, useEffect, useState } from "react";

import { useLocalStorage } from "../../common/hooks";
import { Cache, IAccountData } from "../../common/types";
import { Props } from "../../modules/peerplaysApi/peerplaysApiProvider.types";

import { IUser, IUserSettings } from "./userTypes";

const defaultUserState = {
  userSettings: {
    advancedSettings: false,
  },
};

const UserContext = createContext<IUser>(defaultUserState);

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [accountData, setAccountData] = useState<IAccountData>();
  const [userSettings, setUserSettings] = useState<IUserSettings>({
    advancedSettings: false,
  });
  const [jsonCache, setJsonCache] = useLocalStorage("cache");

  const updateUserSettings = (userSettings: IUserSettings) => {
    setUserSettings(userSettings);
  };

  const updateAccountData = (accountData: IAccountData) => {
    const cache = jsonCache as Cache;
    setAccountData(accountData);
    setJsonCache(
      JSON.stringify({
        created: cache.created,
        accounts: cache.accounts,
        assets: cache.assets,
        userSettings: accountData,
      })
    );
  };

  useEffect(() => {
    const cache = jsonCache as Cache;
    if (cache.userAccount != undefined) setAccountData(cache.userAccount);
  }, []);

  return (
    <UserContext.Provider
      value={{
        accountData,
        userSettings,
        updateUserSettings,
        updateAccountData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUser => {
  return useContext<IUser>(UserContext);
};
