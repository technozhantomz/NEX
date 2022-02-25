import { Form } from "antd";
import { useRouter } from "next/router";
import { Login, PrivateKey } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params/networkparams";
import { useAccount } from "../../../../../common/hooks";
import { IFullAccount } from "../../../../../common/types";
import { useUser } from "../../../../../context";

import { ILoginForm } from "./useLoginForm.type";

export function useLoginForm(): ILoginForm {
  const [validUser, setValidUser] = useState(false);
  const [fullAcc, setFullAcc] = useState<IFullAccount | undefined>(undefined);
  const { getFullAccount, formAccount, getAccountByName } = useAccount();
  const { accountData, updateAccountData } = useUser();
  const [loginForm] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (accountData) router.push("/dashboard");
  }, []);

  const onLogin = async () => {
    loginForm.validateFields().then(async () => {
      const userData = await formAccount(fullAcc);
      updateAccountData(userData);
      router.push("/dashboard");
    });
  };

  const validateUsername = async (_: unknown, value: string) => {
    const acc = await getFullAccount(value, false);
    if (acc === undefined) return Promise.reject(new Error("User not found"));
    setFullAcc(acc);
    setValidUser(true);
    return Promise.resolve();
  };

  const validatePassword = async (_: unknown, value: string) => {
    const username = loginForm.getFieldValue("username");
    const roles = ["active", "owner", "memo"];
    const accData = await getAccountByName(username);
    let checkPassword = false;
    let fromWif = "";

    try {
      fromWif = PrivateKey.fromWif(value);
    } catch (e) {
      console.error(e);
    }

    const keys = Login.generateKeys(username, value, roles);

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

  const formValdation = {
    username: [
      { required: true, message: "Username is required" },
      { validator: validateUsername },
    ],
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
      { validator: validatePassword },
    ],
  };

  return {
    validUser,
    loginForm,
    onLogin,
    formValdation,
  };
}
