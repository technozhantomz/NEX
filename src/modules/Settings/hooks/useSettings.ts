import { useCallback, useEffect, useState } from "react";

import { useSettingsContext } from "../../../common/providers";
import { Settings } from "../../../common/types";
import { CheckboxValueType, Form } from "../../../ui/src";

import { UseSettingsResult } from "./useSettings.types";

export function useSettings(): UseSettingsResult {
  const [selectedKeys, setSelectedKeys] = useState<CheckboxValueType[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<
    CheckboxValueType[]
  >([]);
  const { settings, setSettings, setLocale } = useSettingsContext();
  const [generalSettingsForm] = Form.useForm();

  const handleCheckboxChange = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      console.log(checkedValues);
      const newArray = [...selectedNotifications, ...checkedValues];
      setSelectedKeys(newArray);
    },
    [setSelectedKeys, selectedNotifications]
  );

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
              selectedNotifications: selectedKeys,
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
    selectedKeys,
  ]);

  useEffect(() => {
    setSelectedNotifications(settings.notifications.selectedNotifications);
    generalSettingsForm.setFieldsValue({
      selectedLanguage: settings.language,
      walletLockInMinutes: settings.walletLock,
      darkTheme: settings.darkTheme,
      allowNotifications: settings.notifications.allow,
      allowTransferToMeNotifications:
        settings.notifications.additional.transferToMe,
    });
  }, [settings, generalSettingsForm, setSelectedNotifications]);

  return {
    updateSettings,
    generalSettingsForm,
    showSuccessMessage,
    handleAllowNotifications,
    selectedKeys,
    handleCheckboxChange,
    selectedNotifications,
  };
}
