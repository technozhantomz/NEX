import { Form } from "antd";
import { useCallback, useState } from "react";

import { useSettingsContext } from "../../../../common/components/SettingsProvider";
import { Settings } from "../../../../common/types/Settings";

import { GeneralTabTypes } from "./useGeneralTab.types";

export function useGeneralTab(): GeneralTabTypes {
  const [successMsg, setSuccessMsg] = useState(false);
  const { settings, setSettings, setLocale } = useSettingsContext();
  const [generalSettingForm] = Form.useForm();
  const notification = settings?.notifications;
  const language = settings?.language;
  const walletLockTime = settings?.walletLock;

  const handleLanguageChange = (value: unknown) => {
    generalSettingForm.setFieldsValue({ selectedLanguage: value });
  };

  const handleNotificationCheckbox = (checked: boolean) => {
    generalSettingForm.setFieldsValue({ isEnableTransfer: checked });
  };

  const handleLockWallet = (value: unknown) => {
    generalSettingForm.setFieldsValue({ lockWalletTime: value });
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
    setLocale(values.selectedLanguage);
    setSettings(newSettings);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2000);
  }, []);

  const updateWalletLockSetting = useCallback(async () => {
    const values = generalSettingForm.getFieldsValue();

    const newSettings: Settings = {
      ...settings,
      walletLock: values.lockWalletTime
        ? values.lockWalletTime
        : walletLockTime,
    };
    setSettings(newSettings);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2000);
  }, []);

  return {
    updateSetting,
    handleLanguageChange,
    language,
    generalSettingForm,
    handleNotificationCheckbox,
    notification,
    handleLockWallet,
    walletLockTime,
    updateWalletLockSetting,
    successMsg,
  };
}
