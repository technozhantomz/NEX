import counterpart from "counterpart";
import React from "react";

import { useSettingsContext } from "../../../../common/providers";
import { Checkbox, Form, Input, Option, Select } from "../../../../ui/src";

import * as Styled from "./LoginForm.styled";
import { useLoginForm } from "./hooks";

export const LoginForm: React.FC = () => {
  const {
    loginForm,
    handleLogin,
    formValdation,
    onChangeUseWhaleVault,
    onChangeWalletLock,
    submitting,
    useWhaleVault,
  } = useLoginForm();
  const { settings } = useSettingsContext();
  const walletLockInMinutes = ["0", "30", "60", "90", "180", "210"];

  return (
    <Styled.LoginForm
      form={loginForm}
      name="loginForm"
      onFinish={handleLogin}
      size="large"
      initialValues={{
        username: "",
        password: "",
        walletLock: settings.walletLock,
        useWhaleVault: false,
      }}
    >
      <Form.Item
        name="username"
        rules={formValdation.username}
        validateFirst={true}
        validateTrigger={["onChange", "onSubmit"]}
      >
        <Input
          autoComplete="new-password"
          placeholder={counterpart.translate(`field.placeholder.user_name`)}
        />
      </Form.Item>
      {!useWhaleVault ? (
        <>
          <Form.Item
            name="password"
            rules={formValdation.password}
            validateFirst={true}
            validateTrigger="onSubmit"
          >
            <Input.Password
              autoComplete="new-password"
              placeholder={counterpart.translate(
                `field.placeholder.master_password_private_key`
              )}
            />
          </Form.Item>
          <Styled.WalletLockLabel>
            {counterpart.translate(`field.labels.wallet_lock`)}
          </Styled.WalletLockLabel>
          <Form.Item name="walletLock">
            <Select onChange={onChangeWalletLock}>
              {walletLockInMinutes.map((min) => (
                <Option key={min} value={min}>
                  {min}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ) : (
        ""
      )}
      <Form.Item
        rules={formValdation.useWhaleVault}
        validateFirst={true}
        validateTrigger={["onChange", "onSubmit"]}
        name="useWhaleVault"
        className="checkbox"
      >
        <Checkbox onChange={onChangeUseWhaleVault}>
          {counterpart.translate(`field.labels.use_whalevault`)}
        </Checkbox>
      </Form.Item>

      <Styled.LoginButtonContainer className="form-button">
        <Styled.LoginButton
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          {counterpart.translate(`buttons.login`)}
        </Styled.LoginButton>
      </Styled.LoginButtonContainer>
    </Styled.LoginForm>
  );
};
