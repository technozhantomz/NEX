import React, { createContext, useContext, useState } from "react";

import { Props } from "../../interfaces";

import { IUser, IUserSettings } from "./userTypes";

const defaultUserState = {
  userSettings: {
    advancedSettings: false,
  },
};

const UserContext = createContext<IUser>(defaultUserState);

export const UserProvider = ({ children }: Props): JSX.Element => {
  const [userSettings, setUser] = useState<IUserSettings>({
    advancedSettings: false,
  });

  const updateUserSettings = (userSettings: IUserSettings) => {
    setUser(userSettings);
  };

  //   useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ userSettings, updateUserSettings }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUser => {
  return useContext<IUser>(UserContext);
};
