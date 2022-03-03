import { Login } from "peerplaysjs-lib";

import { defaultToken } from "../../api/params";
import { UserKeys } from "../types";

export function useFormKeys(name: string, password: string): UserKeys {
  const keys: UserKeys = {
    active: "",
    memo: "",
    owner: "",
  };
  const roles = ["active", "owner", "memo"];

  const generatedKeys = Login.generateKeys(name, password, roles, defaultToken);

  for (const role of roles) {
    keys[role as keyof UserKeys] = generatedKeys.pubKeys[role].toString();
  }

  return keys;
}
