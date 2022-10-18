import { useCallback, useState } from "react";

import { useSettingsContext } from "../../../common/providers";
import { Settings } from "../../../common/types";
import { Form } from "../../../ui/src";

import { GeneralSettingsForm, UseSettingsResult } from "./useSettings.types";

export function useSettings(): UseSettingsResult {
  const { settings, setSettings, setLocale } = useSettingsContext();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSettingChanged, _setIsSettingChanged] = useState<boolean>(false);
  const [generalSettingsForm] = Form.useForm<GeneralSettingsForm>();
  const [allowNotification, setAllowNotification] = useState<boolean>(
    settings.notifications.allow
  );

  const handleAllowNotifications = (e: any) => {
    generalSettingsForm.setFieldsValue({
      allowNotifications: e,
    });
    setAllowNotification(e);
  };

  const createNewSettings = useCallback(() => {
    const values = generalSettingsForm.getFieldsValue();
    const newSettings: Settings = {
      ...settings,
      notifications: {
        allow: values.allowNotifications,
        selectedNotifications: values.selectedNotifications,
      },
      walletLock: values.walletLockInMinutes,
      language: values.selectedLanguage,
    };

    return newSettings;
  }, [generalSettingsForm, settings]);

  const setIsSettingChanged = useCallback(
    (newSettings: Settings) => {
      const settingsChanged =
        JSON.stringify(newSettings) !== JSON.stringify(settings);
      _setIsSettingChanged(settingsChanged);
    },
    [settings, _setIsSettingChanged]
  );

  const handleValuesChange = useCallback(() => {
    const newSettings = createNewSettings();
    setIsSettingChanged(newSettings);
  }, [createNewSettings, setIsSettingChanged]);

  const updateSettings = useCallback(() => {
    const values = generalSettingsForm.getFieldsValue();
    const newSettings = createNewSettings();
    setSettings(newSettings);
    if (values.selectedLanguage) {
      setLocale(values.selectedLanguage);
    }
    setShowSuccessMessage(true);
    _setIsSettingChanged(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  }, [generalSettingsForm, setLocale, setSettings, setShowSuccessMessage]);

  return {
    updateSettings,
    generalSettingsForm,
    showSuccessMessage,
    handleAllowNotifications,
    handleValuesChange,
    isSettingChanged,
    settings,
    allowNotification,
  };
}
