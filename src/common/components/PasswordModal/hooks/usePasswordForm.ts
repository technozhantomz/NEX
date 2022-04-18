import { useEffect, useRef } from "react";

import { Form, FormInstance } from "../../../../ui/src";
import { useAccount } from "../../../hooks";
import { useUserContext } from "../../../providers";

import { IPasswordForm, IUsePasswordForm } from "./usePasswordForm.types";

export function usePasswordForm(): IUsePasswordForm {
  const { localStorageAccount } = useUserContext();
  const [passwordModalForm] = Form.useForm();
  const { getAccountByName, validateAccountPassword } = useAccount();

  const useResetFormOnCloseModal = (
    form: FormInstance<IPasswordForm>,
    visible: boolean
  ) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
      prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
      if (!visible && prevVisible) {
        form.resetFields();
      }
    }, [visible]);
  };

  const validatePassword = async (_: unknown, value: string) => {
    const account = await getAccountByName(localStorageAccount);
    let checkPassword = false;
    if (account) {
      checkPassword = validateAccountPassword(value, account);
    }
    if (!checkPassword) return Promise.reject(new Error("Password incorrect"));
    return Promise.resolve();
  };

  return {
    validatePassword,
    useResetFormOnCloseModal,
    passwordModalForm,
  };
}
