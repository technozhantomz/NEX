import { Form } from "antd";
import { Login } from "peerplaysjs-lib";
import { useCallback, useState } from "react";

import { useUserContext } from "../../../../../common/components/UserProvider";

import { KeyManagementTabTypes } from "./useKeyManagementTabTypes.types";

export function useKeyManagementTab(): KeyManagementTabTypes {
  const [requestedKey, setRequestedKey] = useState();
  const [KeyManagementForm] = Form.useForm();
  const { localStorageAccount } = useUserContext();

  const updateSetting = useCallback(async () => {
    const values = KeyManagementForm.getFieldsValue();
    const password = values.password;
    const selectedRole = values.roles;
    const roles = ["active", "owner", "memo"];
    const keys = Login.generateKeys(localStorageAccount, password, roles);

    const generatedKeys = keys.pubKeys;

    setRequestedKey(
      selectedRole === "active"
        ? generatedKeys.active
        : selectedRole === "owner"
        ? generatedKeys.owner
        : selectedRole === "memo"
        ? generatedKeys.memo
        : false
    );
  }, []);

  const formValdation = {
    selectRole: [{ required: true, message: "Select any role" }],
  };

  return {
    updateSetting,
    KeyManagementForm,
    requestedKey,
    formValdation,
  };
}
