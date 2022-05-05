import { useCallback, useEffect, useState } from "react";

import { useSettingsContext } from "../../../common/providers";
import { Settings } from "../../../common/types";
import { Form } from "../../../ui/src";

import { UseSettingsResult } from "./useSettings.types";

export function useSettings(): UseSettingsResult {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { settings, setSettings, setLocale } = useSettingsContext();
  const [generalSettingsForm] = Form.useForm();

  useEffect(() => {
    generalSettingsForm.setFieldsValue({
      selectedLanguage: settings.language,
      allowNotifications: settings.notifications.allow,
      allowTransferToMeNotifications:
        settings.notifications.additional.transferToMe,
    });
  }, [settings, setSettings]);

  const handleAllowNotifications = (e: any) => {
    if (!e.target.checked) {
      generalSettingsForm.setFieldsValue({
        allowTransferToMeNotifications: false,
      });
    }
  };

  const updateSettings = useCallback(async () => {
    const values = generalSettingsForm.getFieldsValue();

    const newSettings: Settings = {
      ...settings,
      language: values.selectedLanguage
        ? values.selectedLanguage
        : settings.language,
      notifications:
        values.allowNotifications !== undefined
          ? {
              allow: values.allowNotifications,
              additional: {
                transferToMe: values.allowTransferToMeNotifications,
              },
            }
          : settings.notifications,
      walletLock: values.walletLockInMinutes
        ? values.walletLockInMinutes
        : settings.walletLock,
    };
    if (values.selectedLanguage) {
      setLocale(values.selectedLanguage);
    }
    setSettings(newSettings);
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

  return {
    updateSettings,
    generalSettingsForm,
    showSuccessMessage,
    handleAllowNotifications,
  };
}
