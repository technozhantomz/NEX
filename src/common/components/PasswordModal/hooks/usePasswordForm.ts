import counterpart from "counterpart";
import { useEffect, useRef, useState } from "react";

import { CheckboxChangeEvent, Form, FormInstance } from "../../../../ui/src";
import { useAccount } from "../../../hooks";
import { useUserContext } from "../../../providers";
import { KeyType } from "../../../types";

import { IUsePasswordForm, PasswordForm } from "./usePasswordForm.types";

type Props = {
  neededKeyType: KeyType;
};

export function usePasswordForm({ neededKeyType }: Props): IUsePasswordForm {
  const { account } = useUserContext();
  const [passwordModalForm] = Form.useForm<PasswordForm>();
  const { validateAccountPassword, _validateUseWhaleVault } = useAccount();
  const [useWhaleVault, setUseWhaleVault] = useState<boolean>(false);

  const useResetFormOnCloseModal = (
    form: FormInstance<PasswordForm>,
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

  const onChangeUseWhaleVault = (e: CheckboxChangeEvent) => {
    setUseWhaleVault(e.target.checked);
  };

  const validatePassword = async (_: unknown, value: string) => {
    if (value.length < 12) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.password_should_be_long`))
      );
    }
    if (account) {
      const { checkPassword, keyType: inputedKeyType } =
        validateAccountPassword(value, account);
      if (
        !checkPassword ||
        (inputedKeyType !== "password" && inputedKeyType !== neededKeyType)
      ) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.password_incorrect`))
        );
      } else {
        passwordModalForm.setFieldValue("keyType", inputedKeyType);
        return Promise.resolve();
      }
    }
    return Promise.reject(new Error(``));
  };

  const validateUseWhalevault = async () => {
    if (account) {
      if (useWhaleVault) {
        const { response, isValid } = await _validateUseWhaleVault(
          account,
          neededKeyType
        );
        if (isValid) {
          passwordModalForm.setFieldValue("keyType", "whaleVault");
          return Promise.resolve();
        } else {
          return Promise.reject(new Error(counterpart.translate(response)));
        }
      }
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.user_name_first`))
      );
    }
  };

  const formValidation = {
    password: [
      {
        required: true,
        message: counterpart.translate(`field.errors.password_required`),
      },
      { validator: validatePassword },
    ],
    useWhaleVault: [{ validator: validateUseWhalevault }],
  };

  return {
    passwordModalForm,
    formValidation,
    useResetFormOnCloseModal,
    onChangeUseWhaleVault,
    useWhaleVault,
  };
}
