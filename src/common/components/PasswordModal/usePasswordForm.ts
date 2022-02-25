import { Form, FormInstance } from "antd";
import { Login, PrivateKey } from "peerplaysjs-lib";

import { defaultToken } from "../../../api/params/networkparams";
import { useUser } from "../../../context";
import { useAccount } from "../../hooks";
import { IAccountData } from "../../types";

export type IUsePasswordForm = {
  validatePassword: (
    _: unknown,
    value: string,
    username: string
  ) => Promise<void>;
  passwordModalForm: FormInstance<IPasswordForm>;
};

export type IPasswordForm = {
  password: string;
};

export function usePasswordForm(): IUsePasswordForm {
  const { accountData } = useUser();
  const [passwordModalForm] = Form.useForm();
  const { getAccountByName } = useAccount();

  const validatePassword = async (_: unknown, value: string) => {
    const roles = ["active", "owner", "memo"];
    const accData = await getAccountByName(accountData?.name);
    let checkPassword = false;
    let fromWif = "";

    try {
      fromWif = PrivateKey.fromWif(value);
    } catch (e) {
      console.error(e);
    }

    const keys = Login.generateKeys(accountData?.name, value, roles);

    for (const role of roles) {
      const privKey = fromWif ? fromWif : keys.privKeys[role];
      const pubKey = privKey.toPublicKey().toString(defaultToken);
      const key =
        role !== "memo"
          ? accData[role as keyof IAccountData].key_auths[0][0]
          : accData.options.memo_key;

      if (key === pubKey) {
        checkPassword = true;
        break;
      }
    }
    if (!checkPassword) return Promise.reject(new Error("Password incorrect"));
    return Promise.resolve();
  };

  return {
    validatePassword,
    passwordModalForm,
  };
}
