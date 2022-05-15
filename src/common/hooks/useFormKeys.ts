import { Login } from "peerplaysjs-lib";

import { defaultToken } from "../../api/params";
import { UserPermissions } from "../types";

export function useFormKeys(name: string, password: string): UserPermissions {
  const keys: UserPermissions = {
    active: "",
    memo: "",
    owner: "",
  };
  const roles = ["active", "owner", "memo"];

  const generatedKeys = Login.generateKeys(name, password, roles, defaultToken);

  for (const role of roles) {
    keys[role as keyof UserPermissions] =
      generatedKeys.pubKeys[role].toString();
  }

  return keys;
}
