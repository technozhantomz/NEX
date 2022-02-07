import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

import CheckboxInput from "../CheckboxInput";
import GeneratedPassordInput from "../GeneratedPassordInput";
import { useGeneratePassword } from "../GeneratedPassordInput/hooks";
import InfoBar from "../InfoBar";

import { useSignUpForm } from "./hooks";

// import * as Styled from "./SignUpForm.styled";

const SignUpForm: React.FC = () => {
  const { validUser, onSignUp, formValdation, signUpForm } = useSignUpForm();
  useEffect(() => {
    signUpForm.setFieldsValue({
      password: useGeneratePassword(),
    });
  }, []);
  return (
    <Form form={signUpForm} name="signUpForm" onFinish={onSignUp}>
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
      <p>Your auto-generated password</p>
      <Form.Item name="password" validateFirst={true} validateTrigger="onBlur">
        <GeneratedPassordInput />
      </Form.Item>
      <Form.Item
        name="passwordCheck"
        rules={formValdation.passwordCheck}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        <Input.Password
          placeholder="Re-enter your auto-generated password"
          visibilityToggle={false}
        />
      </Form.Item>
      <InfoBar />
      <Form.Item name="confirm" valuePropName="confirm">
        <CheckboxInput>
          I understand Peerplays cannot recover my lost password
        </CheckboxInput>
      </Form.Item>
      <Form.Item name="saved" valuePropName="saved">
        <CheckboxInput>I have securely saved my password</CheckboxInput>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
