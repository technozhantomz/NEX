import React from "react";

import { DashboardButton } from "../../../../common/components/DashboardButton";

import * as Styled from "./SecurityTab.styled";

export const SecurityTab = (): JSX.Element => {
  return (
    <Styled.SecuritySettingsCard>
      <Styled.SecurityTabForm initialValues={{ remember: true }}>
        <Styled.LockWalletLabel strong>Lock Wallet</Styled.LockWalletLabel>
        <Styled.LockWalletFormItem name="lockWallet">
          <Styled.Select defaultValue="1">
            <Styled.Option value="1">30 minutes </Styled.Option>
            <Styled.Option value="2">60 minutes</Styled.Option>
          </Styled.Select>
        </Styled.LockWalletFormItem>

        <Styled.BtnFormItem wrapperCol={{ offset: 20, span: 24 }}>
          <DashboardButton label="Save" />
        </Styled.BtnFormItem>
      </Styled.SecurityTabForm>
    </Styled.SecuritySettingsCard>
  );
};
