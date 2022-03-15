import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import React from "react";

import { DashboardButton } from "../../../../common/components/DashboardButton";
import { CopyIcon } from "../../../../ui/src/icons";
import { useCopyPassword } from "../../../signup/components/SignUpForm/hooks";

import * as Styled from "./KeyManagementTab.styled";

export const KeyManagementTab = (): JSX.Element => {
  return (
    <Styled.KeyManagementCard>
      <Styled.KeyManagementForm initialValues={{ remember: true }}>
        <Styled.LockWalletFormItem name="lockWallet">
          <Styled.Input placeholder="Enter password" />
        </Styled.LockWalletFormItem>

        <Styled.Text strong>Select a key to be generated:</Styled.Text>
        <Styled.SecondItem>
          <Checkbox.Group>
            <Checkbox value="Owner">Owner</Checkbox>
            <Checkbox value="Active">Active</Checkbox>
            <Checkbox value="Memo">Memo</Checkbox>
          </Checkbox.Group>
        </Styled.SecondItem>

        <Styled.BtnFormItem wrapperCol={{ offset: 1, span: 8 }}>
          <DashboardButton label="Let’s Go!" />
        </Styled.BtnFormItem>

        <Styled.Text>The owner key you requested is as follows:</Styled.Text>
        <Styled.LockWalletFormItem name="generatedKey">
          <Styled.GeneratedKeyInput
            iconRender={(visible) => (
              <div>
                <CopyIcon onClick={() => useCopyPassword("done")} />
                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            )}
          />
        </Styled.LockWalletFormItem>
      </Styled.KeyManagementForm>
    </Styled.KeyManagementCard>
  );
};
