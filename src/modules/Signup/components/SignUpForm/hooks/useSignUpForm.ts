import counterpart from "counterpart";
import { ChainValidation } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import { useAccount, useCreateAccount } from "../../../../../common/hooks";
import {
  useBrowserHistoryContext,
  useUserContext,
} from "../../../../../common/providers";
import { ISignupFormData } from "../../../../../common/types";
import { CheckboxChangeEvent, Form } from "../../../../../ui/src";

import { useGeneratePassword } from "./useGeneratePassword";
import { IFormValidation, ISignUpForm } from "./useSignUpForm.types";

export function useSignUpForm(): ISignUpForm {
  const [isInputTypePassword, setIsInputTypePassword] = useState(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const { formAccountAfterConfirmation, getFullAccount } = useAccount();
  const { createAccount } = useCreateAccount();
  const { localStorageAccount, setLocalStorageAccount } = useUserContext();
  const [validUser, setValidUser] = useState<boolean>(false);
  const { handleLoginRedirect } = useBrowserHistoryContext();
  const [signUpForm] = Form.useForm();

  useEffect(() => {
    if (localStorageAccount) {
      handleLoginRedirect();
    } else {
      const password = useGeneratePassword();
      signUpForm.setFieldsValue({
        password: password,
      });
      setGeneratedPassword(password);
    }
  }, [localStorageAccount, useGeneratePassword, setGeneratedPassword]);

  const handleSignUp = async (formData: unknown) => {
    setSubmitting(true);
    const fullAccount = await createAccount(formData as ISignupFormData);
    if (fullAccount) {
      await formAccountAfterConfirmation(fullAccount);
      setLocalStorageAccount(fullAccount.account.name);
      setSubmitting(false);
    }
  };

  const handleInputType = () => {
    setIsInputTypePassword(!isInputTypePassword);
  };

  const setCheckboxValue = (e: CheckboxChangeEvent) => {
    if (e.target.id === "signUpForm_saved")
      signUpForm.setFieldsValue({
        saved: e.target.checked,
      });
    if (e.target.id === "signUpForm_confirm")
      signUpForm.setFieldsValue({
        confirm: e.target.checked,
      });
  };

  const checkPasswordMatch = (_: unknown, value: { passwordCheck: string }) => {
    if (value === signUpForm.getFieldValue("password"))
      return Promise.resolve();
    return Promise.reject(
      new Error(counterpart.translate(`field.errors.password_not_match`))
    );
  };

  const validateUsername = async (_: unknown, value: string) => {
    const fullAccount = await getFullAccount(value, false);
    if (fullAccount) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.username_taken`))
      );
    }
    const defaultErrors = ChainValidation.is_account_name_error(value);
    if (defaultErrors) {
      return Promise.reject(new Error(`${defaultErrors}`));
    }
    if (!ChainValidation.is_cheap_name(value)) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.premium_username`))
      );
    }

    setValidUser(true);
    return Promise.resolve();
  };

  const validateConfirmation = (_: unknown, value: boolean) => {
    return value
      ? Promise.resolve()
      : Promise.reject(
          new Error(counterpart.translate(`field.errors.confirmation_required`))
        );
  };

  const validateSaved = (_: unknown, value: boolean) => {
    return value
      ? Promise.resolve()
      : Promise.reject(
          new Error(counterpart.translate(`field.errors.save_your_password`))
        );
  };
  const formValidation: IFormValidation = {
    username: [
      {
        required: true,
        message: counterpart.translate(`field.errors.username_required`),
      },
      {
        pattern: new RegExp(/^([a-z])[a-z0-9]*$/),
        message: counterpart.translate(`field.errors.username_limits`),
      },
      { validator: validateUsername },
    ],
    password: [
      {
        required: true,
        message: counterpart.translate(`field.errors.password_required`),
      },
      {
        pattern: new RegExp(/^\S*$/),
        message: counterpart.translate(`field.errors.password_white_space`),
      },
      {
        min: 12,
        message: counterpart.translate(`field.errors.password_should_be_long`),
      },
    ],
    passwordCheck: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      { validator: checkPasswordMatch },
    ],
    confirm: [{ validator: validateConfirmation }],
    saved: [{ validator: validateSaved }],
  };

  return {
    validUser,
    handleSignUp,
    setCheckboxValue,
    checkPasswordMatch,
    validateUsername,
    formValidation,
    signUpForm,
    submitting,
    generatedPassword,
    isInputTypePassword,
    handleInputType,
  };
}
