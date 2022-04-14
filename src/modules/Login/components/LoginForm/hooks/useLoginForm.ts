import { useEffect, useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import {
  useBrowserHistoryContext,
  useUserContext,
} from "../../../../../common/providers";
import { FullAccount } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import { ILoginForm } from "./useLoginForm.types";

export function useLoginForm(): ILoginForm {
  const [submitting, setSubmitting] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [temporaryFullAccount, setTemporaryFullAccount] = useState<
    FullAccount | undefined
  >(undefined);
  const {
    getFullAccount,
    formAccountAfterConfirmation,
    validateAccountPassword,
  } = useAccount();
  const { localStorageAccount, setLocalStorageAccount } = useUserContext();
  const { handleLoginRedirect } = useBrowserHistoryContext();
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (localStorageAccount) {
      handleLoginRedirect();
    }
  }, [localStorageAccount]);

  const handleLogin = async () => {
    setSubmitting(true);
    loginForm.validateFields().then(async () => {
      if (temporaryFullAccount) {
        await formAccountAfterConfirmation(temporaryFullAccount);
        setLocalStorageAccount(temporaryFullAccount.account.name);
      }
      setSubmitting(false);
    });
  };

  const validateUsername = async (_: unknown, value: string) => {
    const fullAccount = await getFullAccount(value, false);
    if (!fullAccount) {
      return Promise.reject(new Error("User not found"));
    }
    setTemporaryFullAccount(fullAccount);
    setValidUser(true);
    return Promise.resolve();
  };

  const validatePassword = (_: unknown, value: string) => {
    if (temporaryFullAccount) {
      const account = temporaryFullAccount.account;
      const checkPassword = validateAccountPassword(value, account);
      if (!checkPassword)
        return Promise.reject(new Error("Password incorrect"));
    }

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
      { validator: validatePassword },
    ],
  };

  return {
    validUser,
    loginForm,
    handleLogin,
    formValdation,
    submitting,
  };
}
