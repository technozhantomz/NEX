import { FormInstance } from "antd/lib/form";

export type GeneralTabTypes = {
  onFormFinish: () => void;
  handleAssetChange: ((value: unknown) => void) | undefined;
  language: string;
  generalSettingForm: FormInstance<GeneralSettingFormData>;
};

export type GeneralSettingFormData = {
  selectedLanguage: string;
  isEnableTransfer: string;
};
