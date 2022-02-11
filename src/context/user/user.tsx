import React, { createContext, useContext, useEffect, useState } from "react";

import { editStorage, getStorage } from "../../api/utils/storage";
import { useLocalStorage } from "../../common/hooks";
import { Cache, IAccountData } from "../../common/types";

import { IUser, IUserSettings } from "./userTypes";

const defaultUserState = {
  userSettings: {
    advancedSettings: false,
    notificationSettings: true,
  },
};

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<IUser>(defaultUserState);

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [accountData, setAccountData] = useState<IAccountData>();
  const [userSettings, setUserSettings] = useState<IUserSettings>({
    advancedSettings: getStorage("settings").advancedMode,
    notificationSettings: getStorage("settings").notifications,
  });
  const [jsonCache, setJsonCache] = useLocalStorage("cache");

  const updateUserSettings = (key: string, value: boolean) => {
    const settings = getStorage("settings");
    if (key === "advancedSettings") {
      settings.advancedMode = value;
      userSettings.advancedSettings = value;
    }
    if (key === "notificationSettings") {
      settings.notifications = value;
      userSettings.notificationSettings = value;
    }
    setUserSettings(userSettings);
    editStorage("settings", settings);
  };

  const updateAccountData = (accountData: IAccountData) => {
    const cache = jsonCache as Cache;
    setAccountData(accountData);
    setJsonCache({
      created: cache.created,
      accounts: cache.accounts,
      assets: cache.assets,
      userAccount: accountData,
    });
  };

  const logoutUser = () => {
    const cache = jsonCache as Cache;
    const settings = getStorage("settings");
    settings.advancedMode = false;
    settings.notifications = true;
    userSettings.advancedSettings = false;
    userSettings.notificationSettings = true;
    setUserSettings(userSettings);
    editStorage("settings", settings);
    setAccountData(undefined);
    setJsonCache({
      created: cache.created,
      accounts: cache.accounts,
      assets: cache.assets,
      userAccount: undefined,
    });
  };

  useEffect(() => {
    const cache = jsonCache as Cache;
    if (cache.userAccount != undefined) setAccountData(cache.userAccount);
  }, [accountData]);

  return (
    <UserContext.Provider
      value={{
        accountData,
        userSettings,
        updateUserSettings,
        updateAccountData,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUser => {
  return useContext<IUser>(UserContext);
};
