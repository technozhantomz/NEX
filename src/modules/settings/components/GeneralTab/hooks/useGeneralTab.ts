import { Form } from "antd";
import { useCallback } from "react";

import { useSettingsContext } from "../../../../../common/components/SettingsProvider";
import { Settings } from "../../../../../common/types/Settings";

import { GeneralTabTypes } from "./useGeneralTab.types";

export function useGeneralTab(): GeneralTabTypes {
  const { settings, setSettings } = useSettingsContext();
  const [generalSettingForm] = Form.useForm();
  const notification = settings?.notifications;
  const language = settings?.language;

  const handleLanguageChange = (value: unknown) => {
    generalSettingForm.setFieldsValue({ selectedLanguage: value });
  };

  const handleNotificationCheckbox = (checked: boolean) => {
    generalSettingForm.setFieldsValue({ isEnableTransfer: checked });
  };

  const onFormFinish = () => {
    updateSetting();
  };

  const updateSetting = useCallback(async () => {
    const values = generalSettingForm.getFieldsValue();

    const newSettings: Settings = {
      ...settings,
      language: values.selectedLanguage ? values.selectedLanguage : language,
      notifications:
        values.isEnableTransfer === undefined
          ? notification
          : values.isEnableTransfer,
    };
    setSettings(newSettings);
  }, []);

  return {
    onFormFinish,
    handleLanguageChange,
    language,
    generalSettingForm,
    handleNotificationCheckbox,
    notification,
  };
}
