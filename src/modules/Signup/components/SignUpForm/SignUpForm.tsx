import React from "react";

import {
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
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
    submitting,
    generatedPassword,
  } = useSignUpForm();

  return (
    <Styled.SignupForm
      form={signUpForm}
      name="signUpForm"
      onFinish={handleSignUp}
      size="large"
    >
      <Styled.UsernameFormItem
        name="username"
        rules={formValdation.username}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        <Input
          placeholder="Enter username"
          suffix={validUser ? <CheckOutlined /> : ""}
        />
      </Styled.UsernameFormItem>
      <Styled.Label>Your auto-generated password</Styled.Label>
      <Styled.PasswordFormItem
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
      </Styled.PasswordFormItem>
      <Styled.PasswordCheckFormItem
        name="passwordCheck"
        rules={formValdation.passwordCheck}
        validateFirst={true}
        validateTrigger="onBlur"
      >
        <Input.Password
          placeholder="Re-enter your auto-generated password"
          visibilityToggle={false}
        />
      </Styled.PasswordCheckFormItem>
      <InfoBar password={generatedPassword} />
      <Styled.ConfirmFormItem
        name="confirm"
        rules={formValdation.confirm}
        valuePropName="confirmed"
        className="checkbox-item"
      >
        <Styled.Checkbox onChange={setCheckboxVlaue}>
          <p className="checkbox-text">
            I understand Peerplays cannot recover my lost password
          </p>
        </Styled.Checkbox>
      </Styled.ConfirmFormItem>
      <Styled.SavedFormItem
        name="saved"
        rules={formValdation.saved}
        valuePropName="saved"
        className="checkbox-item"
      >
        <Styled.Checkbox onChange={setCheckboxVlaue}>
          <p className="checkbox-text">I have securely saved my password</p>
        </Styled.Checkbox>
      </Styled.SavedFormItem>
      <div>
        <Styled.SignupFormButton
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          Create account
        </Styled.SignupFormButton>
      </div>
    </Styled.SignupForm>
  );
};
