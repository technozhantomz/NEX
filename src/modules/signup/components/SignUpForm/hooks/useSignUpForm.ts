import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import { ISignupFormData } from "../../../../../common/types";
import { useUser } from "../../../../../context";

import { useGeneratePassword } from "./useGeneratePassword";
import { IFormField, IUserSignUpForm } from "./useSignUpForm.type";

export function useSignUpForm(): IUserSignUpForm {
  const { createAccount, getFullAccount } = useAccount();
  const { accountData, updateAccountData } = useUser();
  const [validUser, setValidUser] = useState(false);
  const [signUpForm] = useForm();
  const router = useRouter();

  useEffect(() => {
    if (accountData) router.push("/dashboard");
    signUpForm.setFieldsValue({
      password: useGeneratePassword(),
    });
  }, []);

  const onSignUp = async (formData: ISignupFormData) => {
    const account = await createAccount(formData);
    updateAccountData(account);
    router.push("/dashboard");
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
    const acc = await getFullAccount(value, false);
    if (acc) return Promise.reject(new Error("Username Already taken"));
    setValidUser(true);
    return Promise.resolve();
  };

  const validateCheckbox = (_: IFormField) => {
    return signUpForm.getFieldValue(_.field)
      ? Promise.resolve()
      : Promise.reject(new Error("Confimation Required"));
  };

  const formValdation = {
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
    confirm: [{ validator: validateCheckbox }],
    saved: [{ validator: validateCheckbox }],
  };

  return {
    validUser,
    onSignUp,
    setCheckboxVlaue,
    checkPasswordMatch,
    validateUsername,
    formValdation,
    signUpForm,
  };
}
