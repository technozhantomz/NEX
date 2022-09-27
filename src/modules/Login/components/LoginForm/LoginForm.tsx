import counterpart from "counterpart";
import React from "react";

import { Checkbox, Form, Input, Option, Select } from "../../../../ui/src";

import * as Styled from "./LoginForm.styled";
import { useLoginForm } from "./hooks";

export const LoginForm: React.FC = () => {
  const {
    loginForm,
    handleLogin,
    formValdation,
    onChangeUseWhalevault,
    submitting,
    useWhalevault,
  } = useLoginForm();
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
        walletLock: 0,
        useWhalevault: false,
      }}
    >
      <Form.Item
        name="username"
        rules={formValdation.username}
        validateFirst={true}
        validateTrigger={["onChange", "onSubmit"]}
      >
        <Input
          placeholder={counterpart.translate(`field.placeholder.user_name`)}
        />
      </Form.Item>
      {!useWhalevault ? (
        <>
          <Form.Item
            name="password"
            rules={formValdation.password}
            validateFirst={true}
            validateTrigger="onSubmit"
          >
            <Input.Password
              placeholder={counterpart.translate(
                `field.placeholder.master_password_private_key`
              )}
            />
          </Form.Item>
          <Styled.WalletLockLabel>
            {counterpart.translate(`field.labels.wallet_lock`)}
          </Styled.WalletLockLabel>
          <Form.Item name="walletLock">
            <Select>
              {walletLockInMinutes.map((min) => (
                <Option value={min}>{min}</Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ) : (
        ""
      )}
      <Form.Item name="useWhalevault">
        <Checkbox onChange={onChangeUseWhalevault}>
          Use WhaleVault extension
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
