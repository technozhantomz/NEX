import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

import { useLoginForm } from "./hooks";

const LoginForm: React.FC = () => {
  const { validUser, loginForm, onLogin, formValdation } = useLoginForm();

  return (
    <Form form={loginForm} name="loginForm" onFinish={onLogin}>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
