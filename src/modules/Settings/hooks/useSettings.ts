import { useCallback, useEffect, useState } from "react";

import {
  useSettingsContext,
  useUserSettingsContext,
} from "../../../common/providers";
import { Settings, UserSettings } from "../../../common/types";
import { Form } from "../../../ui/src";

import { UseSettingsResult } from "./useSettings.types";

export function useSettings(): UseSettingsResult {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { settings, setSettings, setLocale } = useSettingsContext();
  const { userSettings, setUserSettings } = useUserSettingsContext();
  const [generalSettingsForm] = Form.useForm();

  const handleAllowNotifications = (e: any) => {
    if (!e.target.checked) {
      generalSettingsForm.setFieldsValue({
        allowTransferToMeNotifications: false,
      });
    }
  };

  const updateSettings = useCallback(() => {
    const values = generalSettingsForm.getFieldsValue();

    const newSettings: Settings = {
      ...settings,
      language: values.selectedLanguage
        ? values.selectedLanguage
        : settings.language,
    };
    const newUserSettings: UserSettings = {
      ...userSettings,
      notifications:
        values.allowNotifications !== undefined
          ? {
              allow: values.allowNotifications,
              additional: {
                transferToMe: values.allowTransferToMeNotifications,
              },
            }
          : userSettings.notifications,
      walletLock: values.walletLockInMinutes
        ? values.walletLockInMinutes
        : userSettings.walletLock,
    };
    setSettings(newSettings);
    setUserSettings(newUserSettings);
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
    userSettings,
    setUserSettings,
  ]);

  useEffect(() => {
    generalSettingsForm.setFieldsValue({
      selectedLanguage: settings.language,
      allowNotifications: userSettings.notifications.allow,
      allowTransferToMeNotifications:
        userSettings.notifications.additional.transferToMe,
    });
  }, [settings, userSettings, generalSettingsForm]);

  return {
    updateSettings,
    generalSettingsForm,
    showSuccessMessage,
    handleAllowNotifications,
  };
}
