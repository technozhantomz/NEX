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

  const setCheckboxVlaue = (e: CheckboxChangeEvent) => {
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
    return Promise.reject(new Error("Password do not match"));
  };

  const validateUsername = async (_: unknown, value: string) => {
    const fullAccount = await getFullAccount(value, false);
    if (fullAccount) {
      return Promise.reject(new Error("Username Already taken"));
    }
    setValidUser(true);
    return Promise.resolve();
  };

  const validateConfirmation = (_: unknown, value: boolean) => {
    return value
      ? Promise.resolve()
      : Promise.reject(new Error("Confimation Required"));
  };

  const validateSaved = (_: unknown, value: boolean) => {
    return value
      ? Promise.resolve()
      : Promise.reject(new Error("Please save your password"));
  };
  const formValdation: IFormValidation = {
    username: [
      { required: true, message: "Username is required" },
      { validator: validateUsername },
    ],
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
    ],
    passwordCheck: [
      { required: true, message: "This feild is required" },
      { validator: checkPasswordMatch },
    ],
    confirm: [{ validator: validateConfirmation }],
    saved: [{ validator: validateSaved }],
  };

  return {
    validUser,
    handleSignUp,
    setCheckboxVlaue,
    checkPasswordMatch,
    validateUsername,
    formValdation,
    signUpForm,
    submitting,
    generatedPassword,
  };
}
