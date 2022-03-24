import { FormInstance } from "antd/lib/form";

export type GeneralTabTypes = {
  updateSetting: () => void;
  handleLanguageChange: ((value: unknown) => void) | undefined;
  language: string;
  generalSettingForm: FormInstance<GeneralSettingFormData>;
  handleNotificationCheckbox: (checked: boolean) => void;
  notification: boolean;
  handleLockWallet: ((value: unknown) => void) | undefined;
  walletLockTime: number;
  updateWalletLockSetting: () => void;
  successMsg: boolean;
};

export type GeneralSettingFormData = {
  selectedLanguage: string;
  isEnableTransfer: string;
  lockWalletTime: number;
};
