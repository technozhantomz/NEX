import React from "react";

import {
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  Form,
  Input,
} from "../../../../ui/src";
import { CopyIcon } from "../../../../ui/src/icons";
import { InfoBar } from "../InfoBar";

import * as Styled from "./SignUpForm.styled";
import { useCopyPassword, useSignUpForm } from "./hooks";

export const SignUpForm: React.FC = () => {
  const {
    validUser,
    handleSignUp,
    setCheckboxVlaue,
    formValdation,
    signUpForm,
  } = useSignUpForm();

  return (
    <Styled.SignupForm
      form={signUpForm}
      name="signUpForm"
      onFinish={handleSignUp}
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
      <p>Your auto-generated password</p>
      <Form.Item
        name="password"
        rules={formValdation.password}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        {/* <GeneratedPassordInput /> */}
        <Styled.GeneratedPassordInput
          iconRender={(visible) => (
            <div>
              <CopyIcon
                onClick={() =>
                  useCopyPassword(signUpForm.getFieldValue("password"))
                }
              />
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
          )}
        />
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
      <Form.Item
        name="confirm"
        rules={formValdation.confirm}
        valuePropName="confirmed"
      >
        <Styled.Checkbox onChange={setCheckboxVlaue}>
          I understand Peerplays cannot recover my lost password
        </Styled.Checkbox>
      </Form.Item>
      <Form.Item name="saved" rules={formValdation.saved} valuePropName="saved">
        <Styled.Checkbox onChange={setCheckboxVlaue}>
          I have securely saved my password
        </Styled.Checkbox>
      </Form.Item>
      <Form.Item>
        <Styled.SignupFormButton type="primary" htmlType="submit">
          Create account
        </Styled.SignupFormButton>
      </Form.Item>
    </Styled.SignupForm>
  );
};
