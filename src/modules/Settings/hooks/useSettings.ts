import { useCallback, useEffect, useState } from "react";

import { useSettingsContext } from "../../../common/providers";
import { Settings } from "../../../common/types";
import { Form } from "../../../ui/src";

import { UseSettingsResult } from "./useSettings.types";

export function useSettings(): UseSettingsResult {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { settings, setSettings, setLocale } = useSettingsContext();
  const [generalSettingsForm] = Form.useForm();

  const handleAllowNotifications = (e: any) => {
    if (!e) {
      generalSettingsForm.setFieldsValue({
        allowTransferToMeNotifications: false,
      });
    }
  };

  const updateSettings = useCallback(() => {
    const values = generalSettingsForm.getFieldsValue();

    const newSettings: Settings = {
      ...settings,
      notifications:
        values.allowNotifications !== undefined
          ? {
              allow: values.allowNotifications,
              additional: {
                transferToMe: settings.notifications.allow
                  ? values.allowTransferToMeNotifications
                  : false,
              },
            }
          : settings.notifications,
      walletLock: values.walletLockInMinutes
        ? values.walletLockInMinutes
        : settings.walletLock,
      language: values.selectedLanguage
        ? values.selectedLanguage
        : settings.language,
      darkTheme: values.darkTheme,
    };

    setSettings(newSettings);
    if (values.selectedLanguage) {
      setLocale(values.selectedLanguage);
    }

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  }, [
    settings,
    generalSettingsForm,
    setLocale,
    setSettings,
    setShowSuccessMessage,
  ]);

  useEffect(() => {
    generalSettingsForm.setFieldsValue({
      selectedLanguage: settings.language,
      walletLockInMinutes: settings.walletLock,
      darkTheme: settings.darkTheme,
      allowNotifications: settings.notifications.allow,
      allowTransferToMeNotifications:
        settings.notifications.additional.transferToMe,
    });
  }, [settings, generalSettingsForm]);

  return {
    updateSettings,
    generalSettingsForm,
    showSuccessMessage,
    handleAllowNotifications,
  };
}
