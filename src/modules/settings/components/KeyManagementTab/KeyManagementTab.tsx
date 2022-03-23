import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import React from "react";

import { usePasswordForm } from "../../../../common/components/PasswordModal/hooks";
import { useCopyText } from "../../../../common/hooks";
import { CardFormButton } from "../../../../ui/src";
import { CopyIcon } from "../../../../ui/src/icons";

import * as Styled from "./KeyManagementTab.styled";
import { useKeyManagementTab } from "./hooks/useKeyManagementTab";

export const KeyManagementTab = (): JSX.Element => {
  const { updateSetting, KeyManagementForm, requestedKey, formValdation } =
    useKeyManagementTab();

  const { validatePassword } = usePasswordForm();

  return (
    <Styled.KeyManagementCard>
      <Styled.KeyManagementForm.Provider onFormFinish={updateSetting}>
        <Styled.KeyManagementForm
          form={KeyManagementForm}
          name="KeyManagementForm"
        >
          <Styled.LockWalletFormItem
            name="password"
            rules={[{ validator: validatePassword }]}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.Input placeholder="Enter password" />
          </Styled.LockWalletFormItem>

          <Styled.Text strong>Select a key to be generated:</Styled.Text>
          <Styled.SecondItem
            name="roles"
            rules={formValdation.selectRole}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Radio.Group>
              <Radio value="active">Active</Radio>
              <Radio value="owner">Owner</Radio>
              <Radio value="memo">Memo</Radio>
            </Radio.Group>
          </Styled.SecondItem>

          <Styled.BtnFormItem wrapperCol={{ offset: 1, span: 8 }}>
            <CardFormButton type="primary" htmlType="submit">
              Let’s Go!
            </CardFormButton>
          </Styled.BtnFormItem>

          {requestedKey && (
            <Styled.Text>
              The owner key you requested is as follows:
            </Styled.Text>
          )}
          {requestedKey && (
            <div>
              <Styled.GeneratedKeyInput
                value={requestedKey}
                iconRender={(visible) => (
                  <div>
                    <CopyIcon onClick={() => useCopyText(requestedKey)} />
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </div>
                )}
              />
            </div>
          )}
        </Styled.KeyManagementForm>
      </Styled.KeyManagementForm.Provider>
    </Styled.KeyManagementCard>
  );
};
