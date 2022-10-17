import { useCallback, useEffect, useState } from "react";

import { useSettingsContext } from "../../../common/providers";
import { Settings } from "../../../common/types";
import { CheckboxValueType, Form } from "../../../ui/src";

import { UseSettingsResult } from "./useSettings.types";

export function useSettings(): UseSettingsResult {
  const [selectedKeys, setSelectedKeys] = useState<CheckboxValueType[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [_isSettingChanged, setIsSettingChanged] = useState(true);
  const { settings, setSettings, setLocale } = useSettingsContext();
  const [generalSettingsForm] = Form.useForm();

  const handleCheckboxChange = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      setSelectedKeys(checkedValues);
    },
    [setSelectedKeys]
  );

  const handleAllowNotifications = (e: any) => {
    if (!e) {
      generalSettingsForm.setFieldsValue({
        allowTransferToMeNotifications: false,
      });
    }
  };

  const handleNewSettings = useCallback(
    (values, isSubmitButtonClicked) => {
      const newSettings: Settings = {
        ...settings,
        notifications:
          values.allowNotifications !== undefined
            ? {
                allow: values.allowNotifications,
                additional: {},
                selectedNotifications: isSubmitButtonClicked
                  ? selectedKeys
                  : values.selectNotifications.sort(),
              }
            : settings.notifications,
        walletLock: values.walletLockInMinutes
          ? values.walletLockInMinutes
          : settings.walletLock,
        language: values.selectedLanguage
          ? values.selectedLanguage
          : settings.language,
      };

      return newSettings;
    },
    [selectedKeys]
  );

  const updateSettings = useCallback(() => {
    const values = generalSettingsForm.getFieldsValue();
    const newSettings = handleNewSettings(values, true);
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
    handleNewSettings,
  ]);

  const isSettingsChanged = useCallback(
    (newSettings) => {
      const valueChange =
        JSON.stringify(newSettings) === JSON.stringify(settings);
      return valueChange;
    },
    [settings]
  );

  const handleValuesChange = useCallback(() => {
    const values = generalSettingsForm.getFieldsValue();
    const newSettings = handleNewSettings(values, false);
    const isSettingChanged = isSettingsChanged(newSettings);

    setIsSettingChanged(isSettingChanged);
  }, [
    generalSettingsForm,
    setIsSettingChanged,
    isSettingsChanged,
    handleNewSettings,
  ]);

  useEffect(() => {
    setSelectedKeys(settings.notifications.selectedNotifications);
    generalSettingsForm.setFieldsValue({
      selectedLanguage: settings.language,
      walletLockInMinutes: settings.walletLock,
      darkTheme: settings.darkTheme,
      allowNotifications: settings.notifications.allow,
      selectNotifications: settings.notifications.selectedNotifications,
    });
  }, [settings, generalSettingsForm, setSelectedKeys]);

  return {
    updateSettings,
    generalSettingsForm,
    showSuccessMessage,
    handleAllowNotifications,
    handleCheckboxChange,
    handleValuesChange,
    _isSettingChanged,
  };
}
