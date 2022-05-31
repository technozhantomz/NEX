import counterpart from "counterpart";
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
    setCheckboxValue,
    formValidation,
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
        rules={formValidation.username}
        validateFirst={true}
        validateTrigger="onChange"
      >
        <Input
          placeholder={counterpart.translate(`field.placeholder.user_name`)}
          suffix={validUser ? <CheckOutlined /> : ""}
        />
      </Styled.UsernameFormItem>
      <Styled.Label>
        {counterpart.translate(`field.labels.auto_generated_password`)}
      </Styled.Label>
      <Styled.PasswordFormItem
        name="password"
        rules={formValidation.password}
        validateFirst={true}
        validateTrigger="onChange"
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
        rules={formValidation.passwordCheck}
        validateFirst={true}
        validateTrigger="onChange"
      >
        <Input.Password
          placeholder={counterpart.translate(
            `field.placeholder.re_enter_password`
          )}
          visibilityToggle={false}
        />
      </Styled.PasswordCheckFormItem>
      <InfoBar password={generatedPassword} />
      <Styled.ConfirmFormItem
        name="confirm"
        rules={formValidation.confirm}
        valuePropName="confirmed"
        className="checkbox-item"
      >
        <Styled.Checkbox onChange={setCheckboxValue}>
          <p className="checkbox-text">
            {counterpart.translate(
              `field.checkBoxes.cannot_recover_my_lost_password`
            )}
          </p>
        </Styled.Checkbox>
      </Styled.ConfirmFormItem>
      <Styled.SavedFormItem
        name="saved"
        rules={formValidation.saved}
        valuePropName="saved"
        className="checkbox-item"
      >
        <Styled.Checkbox onChange={setCheckboxValue}>
          <p className="checkbox-text">
            {counterpart.translate(
              `field.checkBoxes.securely_saved_my_password`
            )}
          </p>
        </Styled.Checkbox>
      </Styled.SavedFormItem>
      <div>
        <Styled.SignupFormButton
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          {counterpart.translate(`buttons.create_account`)}
        </Styled.SignupFormButton>
      </div>
    </Styled.SignupForm>
  );
};
