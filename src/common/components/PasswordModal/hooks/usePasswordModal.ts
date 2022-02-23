import { Form } from "antd";
import { Login, PrivateKey } from "peerplaysjs-lib";

import { defaultToken } from "../../../../api/params/networkparams";
import { useUser } from "../../../../context";
import { useAccount } from "../../../hooks";

import { IPasswordModal } from "./usePasswordModal.type";

export function usePasswordModal(): IPasswordModal {
  const { accountData } = useUser();
  const { getAccountByName } = useAccount();
  const [passwordModal] = Form.useForm();

  const handleOk = () => {
    passwordModal
      .validateFields()
      .then(() => {
        return Promise.resolve(passwordModal.getFieldValue("password"));
      })
      .catch((error) => {
        return Promise.reject(new Error(error.message));
      });
  };

  const validatePassword = async (_: unknown, value: string) => {
    const accData = await getAccountByName(accountData?.name);
    const roles = ["active", "owner", "memo"];
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
    passwordModal,
    validatePassword,
    handleOk,
  };
}
