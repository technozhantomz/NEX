import React from "react";

import { CopyButton } from "../../../../common/components";
import {
  CheckOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  Input,
} from "../../../../ui/src";
import { InfoBar } from "../InfoBar";

import * as Styled from "./SignUpForm.styled";
import { useSignUpForm } from "./hooks";

export const SignUpForm: React.FC = () => {
  const {
    validUser,
    handleSignUp,
    setCheckboxVlaue,
    formValdation,
    signUpForm,
    submitting,
    generatedPassword,
    isInputTypePassword,
    handleInputType,
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
        <Styled.GeneratedPassordInput
          type={isInputTypePassword ? "password" : "text"}
          suffix={
            <div>
              <CopyButton
                copyValue={signUpForm.getFieldValue("password")}
              ></CopyButton>
              {isInputTypePassword ? (
                <EyeInvisibleOutlined onClick={handleInputType} />
              ) : (
                <EyeOutlined onClick={handleInputType} />
              )}
            </div>
          }
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
