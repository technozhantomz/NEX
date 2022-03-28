import React from "react";

import { useGeneralTab } from "../hooks/useGeneralTab";

import * as Styled from "./SecurityTab.styled";

export const SecurityTab = (): JSX.Element => {
  const {
    updateWalletLockSetting,
    handleLockWallet,
    walletLockTime,
    generalSettingForm,
    successMsg,
  } = useGeneralTab();

  const TimeList = ["0", "30", "60", "90", "180", "210"];

  return (
    <Styled.SecuritySettingsCard>
      <Styled.SecurityTabForm.Provider onFormFinish={updateWalletLockSetting}>
        <Styled.SecurityTabForm
          form={generalSettingForm}
          name="generalSettingForm"
        >
          <Styled.LockWalletLabel strong>Lock Wallet</Styled.LockWalletLabel>
          <Styled.LockWalletFormItem name="lockWalletTime">
            <Styled.Select
              onChange={handleLockWallet}
              defaultValue={walletLockTime}
            >
              {TimeList.map((e, i) => (
                <Styled.Option value={e} key={i}>
                  {e} minutes{" "}
                </Styled.Option>
              ))}
            </Styled.Select>
          </Styled.LockWalletFormItem>
          {successMsg && (
            <Styled.SuccessText type="success" strong>
              Setting saved!
            </Styled.SuccessText>
          )}
          <Styled.Button type="primary" htmlType="submit">
            Save
          </Styled.Button>
        </Styled.SecurityTabForm>
      </Styled.SecurityTabForm.Provider>
    </Styled.SecuritySettingsCard>
  );
};
