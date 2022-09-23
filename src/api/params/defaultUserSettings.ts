import { UserSettings } from "../../common/types";

export const defaultUserSettings: UserSettings = {
  notifications: {
    allow: true,
    additional: {
      transferToMe: true,
    },
  },
  walletLock: 0,
  rememberMe: true,
};
