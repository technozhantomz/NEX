import { CheckboxValueType } from "../../ui/src";

export type Settings = {
  advancedMode: boolean;
  darkTheme: boolean;
  defaultAsset: string;
  language: string;
  nodeAutoselect: boolean;
  notifications: {
    allow: boolean;
    additional: {
      transferToMe: boolean;
    };
    selectedNotifications: CheckboxValueType[];
  };
  walletLock: number;
};
