import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import { ISignupFormData } from "../../../../../common/types";
import { useUser } from "../../../../../context";

import { IUserSignUpForm } from "./useSignUpForm.type";

export function useSignUpForm(): IUserSignUpForm {
  const { createAccount, getFullAccount } = useAccount();
  const { updateAccountData } = useUser();
  const [validUser, setValidUser] = useState(false);
  const [signUpForm] = useForm();
  const router = useRouter();

  const onSignUp = async (formData: ISignupFormData) => {
    const account = await createAccount(formData);
    updateAccountData(account);
    router.push("/dashboard");
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
    confirm: [],
    saved: [],
  };

  return {
    validUser,
    onSignUp,
    checkPasswordMatch,
    validateUsername,
    formValdation,
    signUpForm,
  };
}
