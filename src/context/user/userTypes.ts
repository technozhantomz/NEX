import { IAccountData } from "../../common/types";

export interface IUser {
  accountData?: IAccountData;
  userSettings: IUserSettings;
  updateUserSettings?: (userSettings: IUserSettings) => void;
  updateAccountData?: (accountData: IAccountData) => void;
}

export interface IUserSettings {
  advancedSettings: boolean;
}
