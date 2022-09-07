import counterpart from "counterpart";
import { Login } from "peerplaysjs-lib";
import { useCallback, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import { useAccount } from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import {
  Account,
  GeneratedKey,
  Permissions,
} from "../../../../../common/types";
import { CheckboxValueType, Form } from "../../../../../ui/src";

import {
  FormValidation,
  UseKeyManagementTabResult,
} from "./useKeyManagementTab.types";

export function useKeyManagementTab(): UseKeyManagementTabResult {
  // These states should go to upper hook

  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKey[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<CheckboxValueType[]>([]);
  const [keyManagementForm] = Form.useForm();

  const { validateAccountPassword } = useAccount();
  const { account } = useUserContext();

  const handleCheckboxChange = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      setSelectedKeys(checkedValues);
    },
    [setSelectedKeys]
  );

  const onGo = useCallback(() => {
    const { password } = keyManagementForm.getFieldsValue();
    if (account) {
      const translations: Record<string, string> = {
        Active: "active",
        Owner: "owner",
        Memo: "memo",
        Активный: "active",
        Владелец: "owner",
        Памятка: "memo",
      };
      const roles = selectedKeys.map((key) => translations[key.toString()]);
      const keys = Login.generateKeys(account.name, password, roles);
      const generatedKeys = [] as GeneratedKey[];

      let userKeys;
      for (const role of roles) {
        const privKey = keys.privKeys[role];
        const pubKey = privKey.toPublicKey().toString(defaultToken);
        if (role !== "memo") {
          const permissions = account[role as keyof Account] as Permissions;
          userKeys = permissions.key_auths.map((key_auth) => key_auth[0]);
        } else {
          userKeys = [account.options.memo_key];
        }
        if (userKeys.includes(pubKey)) {
          generatedKeys.push({ label: role, key: privKey.toWif() });
        } else {
          generatedKeys.push({ label: role, key: "" });
        }
      }
      setGeneratedKeys(generatedKeys);
    }
  }, [
    account,
    keyManagementForm,
    selectedKeys,
    setGeneratedKeys,
    defaultToken,
  ]);

  const validateSelectKeys = (_: unknown) => {
    if (selectedKeys.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(counterpart.translate(`field.errors.select_role`))
    );
  };

  const validatePassword = (_: unknown, value: string) => {
    if (account) {
      const checkPassword = validateAccountPassword(value, account);
      if (!checkPassword)
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.password_incorrect`))
        );
      return Promise.resolve();
    } else {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.login_first`))
      );
    }
  };

  const formValidation: FormValidation = {
    password: [
      {
        required: true,
        message: counterpart.translate(`field.errors.field_is_required`),
      },
      {
        min: 12,
        message: counterpart.translate(`field.errors.password_should_be_long`),
      },
      { validator: validatePassword },
    ],
    roles: [{ validator: validateSelectKeys }],
  };

  return {
    formValidation,
    keyManagementForm,
    generatedKeys,
    handleCheckboxChange,
    selectedKeys,
    onGo,
  };
}
