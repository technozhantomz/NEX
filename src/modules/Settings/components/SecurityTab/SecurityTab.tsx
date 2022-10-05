import counterpart from "counterpart";
import React from "react";

import { useSettingsContext } from "../../../../common/providers";
import { useSettings } from "../../hooks";

import * as Styled from "./SecurityTab.styled";

export const SecurityTab = (): JSX.Element => {
  const { generalSettingsForm, updateSettings, showSuccessMessage } =
    useSettings();
  const { settings } = useSettingsContext();

  const walletLockInMinutes = ["0", "30", "60", "90", "180", "210"];

  return (
    <Styled.SecuritySettingsCard>
      <Styled.SecurityTabForm
        form={generalSettingsForm}
        name="generalSettingForm"
        onFinish={updateSettings}
        initialValues={{ walletLockInMinutes: settings.walletLock }}
      >
        <Styled.LabelText>
          {counterpart.translate(`field.labels.lock_wallet`)}
        </Styled.LabelText>
        <Styled.LockWalletFormItem name="walletLockInMinutes">
          <Styled.Select>
            {walletLockInMinutes.map((e, i) => (
              <Styled.Option value={e} key={i}>
                {e} {counterpart.translate(`field.options.lock_wallet`)}
              </Styled.Option>
            ))}
          </Styled.Select>
        </Styled.LockWalletFormItem>
        {showSuccessMessage && (
          <Styled.LabelText type="success">
            {counterpart.translate(`field.labels.setting_saved`)}
          </Styled.LabelText>
        )}
        <Styled.BtnDiv>
          <Styled.SaveButton type="primary" htmlType="submit">
            {counterpart.translate(`buttons.save`)}
          </Styled.SaveButton>
        </Styled.BtnDiv>
      </Styled.SecurityTabForm>
    </Styled.SecuritySettingsCard>
  );
};
