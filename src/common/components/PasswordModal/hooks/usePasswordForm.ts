import counterpart from "counterpart";
import { useEffect, useRef } from "react";

import { Form, FormInstance } from "../../../../ui/src";
import { useAccount } from "../../../hooks";
import { useUserContext } from "../../../providers";

import { IPasswordForm, IUsePasswordForm } from "./usePasswordForm.types";

export function usePasswordForm(): IUsePasswordForm {
  const { account } = useUserContext();
  const [passwordModalForm] = Form.useForm();
  const { validateAccountPassword } = useAccount();

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
    let checkPassword = false;
    if (value.length < 12) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.password_should_be_long`))
      );
    }
    if (account) {
      checkPassword = validateAccountPassword(value, account);
    }
    if (!checkPassword)
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.password_incorrect`))
      );
    return Promise.resolve();
  };

  const formValidation = {
    password: [
      {
        required: true,
        message: counterpart.translate(`field.errors.password_required`),
      },
      { validator: validatePassword },
    ],
  };

  return {
    passwordModalForm,
    formValidation,
    useResetFormOnCloseModal,
  };
}
