import { CheckboxValueType, FormInstance } from "../../../ui/src";

export type UseSettingsResult = {
  updateSettings: () => void;
  generalSettingsForm: FormInstance<GeneralSettingsForm>;
  showSuccessMessage: boolean;
  handleAllowNotifications: (e: any) => void;
  handleCheckboxChange: (checkedValues: CheckboxValueType[]) => void;
};

export type GeneralSettingsForm = {
  selectedLanguage: string;
  allowNotifications: boolean;
  allowTransferToMeNotifications: boolean;
  walletLockInMinutes: number;
};
