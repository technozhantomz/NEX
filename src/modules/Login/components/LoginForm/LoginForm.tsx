import counterpart from "counterpart";
import React from "react";

import { Form, Input } from "../../../../ui/src";

import * as Styled from "./LoginForm.styled";
import { useLoginForm } from "./hooks";

export const LoginForm: React.FC = () => {
  const { loginForm, handleLogin, formValdation, submitting } = useLoginForm();
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
        validateTrigger={["onChange", "onSubmit"]}
      >
        <Input
          placeholder={counterpart.translate(`field.placeholder.user_name`)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={formValdation.password}
        validateFirst={true}
        validateTrigger="onSubmit"
      >
        <Input.Password
          placeholder={counterpart.translate(`field.placeholder.password`)}
        />
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
