import { IAccountData } from "../../common/types";

export interface IUser {
  accountData?: IAccountData;
  userSettings: IUserSettings;
  updateUserSettings?: (key: string, value: boolean) => void;
  updateAccountData?: (accountData: IAccountData) => void;
  logoutUser?: () => void;
}

export interface IUserSettings {
  advancedSettings: boolean;
  notificationSettings: boolean;
}
