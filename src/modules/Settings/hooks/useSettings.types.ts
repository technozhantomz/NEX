import { Settings } from "../../../common/types";
import { CheckboxValueType, FormInstance } from "../../../ui/src";

export type UseSettingsResult = {
  updateSettings: () => void;
  generalSettingsForm: FormInstance<GeneralSettingsForm>;
  showSuccessMessage: boolean;
  handleAllowNotifications: (e: any) => void;
  handleValuesChange: () => void;
  isSettingChanged: boolean;
  settings: Settings;
  allowNotification: boolean;
};

export type GeneralSettingsForm = {
  selectedLanguage: string;
  allowNotifications: boolean;
  walletLockInMinutes: number;
  selectedNotifications: CheckboxValueType[];
};
