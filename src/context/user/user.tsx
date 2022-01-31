import React, { createContext, useContext, useState } from "react";

import { Props } from "../../interfaces";

// import { getFullAccount } from "./helper";
import { IAccountData, IUser, IUserSettings } from "./userTypes";

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

  const updateUserSettings = (userSettings: IUserSettings) => {
    setUserSettings(userSettings);
  };

  const updateAccountData = (accountData: IAccountData) => {
    setAccountData(accountData);
  };

  // const loginUser = (loginFormData: ILoginFormData) => {
  //   // const fullAcc = getFullAccount(loginFormData.username, false);
  //   // console.log(fullAcc);
  // };
  // const logoutUser = () => {};
  // const signupUser = () => {};

  return (
    <UserContext.Provider
      value={{
        accountData,
        userSettings,
        updateUserSettings,
        updateAccountData,
        // loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUser => {
  return useContext<IUser>(UserContext);
};
