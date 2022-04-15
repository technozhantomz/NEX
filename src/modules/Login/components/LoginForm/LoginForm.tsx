import React from "react";

import { CheckOutlined, Form, Input } from "../../../../ui/src";

import * as Styled from "./LoginForm.styled";
import { useLoginForm } from "./hooks";

export const LoginForm: React.FC = () => {
  const { validUser, loginForm, handleLogin, formValdation, submitting } =
    useLoginForm();
  return (
    <Styled.LoginForm
      form={loginForm}
      name="loginForm"
      onFinish={handleLogin}
      size="large"
    >
      <Form.Item
        name="username"
        rules={formValdation.username}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        <Input
          placeholder="Enter username"
          suffix={validUser ? <CheckOutlined /> : ""}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={formValdation.password}
        validateFirst={true}
        validateTrigger="onSubmit"
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Styled.LoginButtonContainer className="form-button">
        <Styled.LoginButton
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          Log in
        </Styled.LoginButton>
      </Styled.LoginButtonContainer>
    </Styled.LoginForm>
  );
};
