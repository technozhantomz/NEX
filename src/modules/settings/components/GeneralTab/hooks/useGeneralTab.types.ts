import { FormInstance } from "antd/lib/form";

export type GeneralTabTypes = {
  onFormFinish: () => void;
  handleLanguageChange: ((value: unknown) => void) | undefined;
  language: string;
  generalSettingForm: FormInstance<GeneralSettingFormData>;
  handleNotificationCheckbox: (checked: boolean) => void;
  notification: boolean;
};

export type GeneralSettingFormData = {
  selectedLanguage: string;
  isEnableTransfer: string;
};
