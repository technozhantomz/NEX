import { FormInstance } from "../../../ui/src";

export type UseSettingsResult = {
  updateSettings: () => void;
  generalSettingsForm: FormInstance<GeneralSettingsForm>;
  showSuccessMessage: boolean;
  handleAllowNotifications: (e: any) => void;
};

export type GeneralSettingsForm = {
  selectedLanguage: string;
  allowNotifications: boolean;
  allowTransferToMeNotifications: boolean;
  walletLockInMinutes: number;
};
