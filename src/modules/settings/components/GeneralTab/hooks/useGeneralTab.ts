import { Form } from "antd";
import { useCallback, useState } from "react";

import { useSettingsContext } from "../../../../../common/components/SettingsProvider";
import { Settings } from "../../../../../common/types/Settings";

import { GeneralTabTypes } from "./useGeneralTab.types";

export function useGeneralTab(): GeneralTabTypes {
  const { settings, setSettings } = useSettingsContext();
  const [language, setLanguage] = useState<string>(settings?.language);
  const [generalSettingForm] = Form.useForm();

  const handleAssetChange = (value: unknown) => {
    generalSettingForm.setFieldsValue({ selectedLanguage: value });
  };

  const onFormFinish = () => {
    updateSetting();
  };

  const updateSetting = useCallback(async () => {
    const values = generalSettingForm.getFieldsValue();

    const newSettings: Settings = {
      ...settings,
      language: values.selectedLanguage ? values.selectedLanguage : language,
    };
    setSettings(newSettings);
  }, []);

  return {
    onFormFinish,
    handleAssetChange,
    language,
    generalSettingForm,
  };
}
