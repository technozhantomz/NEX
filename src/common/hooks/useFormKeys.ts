import { Login } from "peerplaysjs-lib";
import { useCallback } from "react";

import { defaultToken } from "../../api/params";
import { UserPermissions } from "../types";

type UseFormKeysResult = {
  formKeys: (name: string, password: string) => UserPermissions;
  formWifKeys: (name: string, password: string) => UserPermissions;
};

export function useFormKeys(): UseFormKeysResult {
  const formKeys = useCallback((name: string, password: string) => {
    const keys: UserPermissions = {
      active: "",
      memo: "",
      owner: "",
    };
    const roles = ["active", "owner", "memo"];

    const generatedKeys = Login.generateKeys(
      name,
      password,
      roles,
      defaultToken
    );

    for (const role of roles) {
      keys[role as keyof UserPermissions] =
        generatedKeys.pubKeys[role].toString();
    }

    return keys;
  }, []);

  const formWifKeys = useCallback((name: string, password: string) => {
    const keys: UserPermissions = {
      active: "",
      memo: "",
      owner: "",
    };
    const roles = ["active", "owner", "memo"];

    const generatedKeys = Login.generateKeys(
      name,
      password,
      roles,
      defaultToken
    );

    for (const role of roles) {
      keys[role as keyof UserPermissions] =
        generatedKeys.privKeys[role].toWif();
    }

    return keys;
  }, []);

  return {
    formKeys,
    formWifKeys,
  };
}
