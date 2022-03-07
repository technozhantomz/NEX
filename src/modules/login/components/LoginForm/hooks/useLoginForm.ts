import { useRouter } from "next/router";
import { Login, PrivateKey } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import { useUserContext } from "../../../../../common/components/UserProvider/UserProvider";
import { useAccount } from "../../../../../common/hooks";
import { Account, FullAccount, UserKey } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import { ILoginForm } from "./useLoginForm.types";

export function useLoginForm(): ILoginForm {
  const [validUser, setValidUser] = useState(false);
  const [temporaryFullAccount, setTemporaryFullAccount] = useState<
    FullAccount | undefined
  >(undefined);
  const { getFullAccount, formAccountAfterConfirmation } = useAccount();
  const { localStorageAccount, setLocalStorageAccount } = useUserContext();
  const [loginForm] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (localStorageAccount) {
      router.push("/dashboard");
    }
  }, [localStorageAccount]);

  const handleLogin = async () => {
    loginForm.validateFields().then(async () => {
      if (temporaryFullAccount) {
        await formAccountAfterConfirmation(temporaryFullAccount);
        setLocalStorageAccount(temporaryFullAccount.account.name);
      }
    });
  };

  const validateUsername = async (_: unknown, value: string) => {
    const fullAccount = await getFullAccount(value, false);
    if (!fullAccount) {
      return Promise.reject(new Error("User not found"));
    }
    setTemporaryFullAccount(fullAccount);
    setValidUser(true);
    return Promise.resolve();
  };

  const validatePassword = (_: unknown, value: string) => {
    if (temporaryFullAccount) {
      const account = temporaryFullAccount?.account;
      const roles = ["active", "owner", "memo"];
      let checkPassword = false;
      let fromWif = "";

      try {
        fromWif = PrivateKey.fromWif(value);
        // eslint-disable-next-line no-empty
      } catch (e) {
        console.log(e);
      }

      const keys = Login.generateKeys(account?.name, value, roles);

      for (const role of roles) {
        const privKey = fromWif ? fromWif : keys.privKeys[role];
        const pubKey = privKey.toPublicKey().toString(defaultToken);
        let key = "";

        if (role !== "memo") {
          const permission = account[role as keyof Account] as UserKey;
          key = permission.key_auths[0][0];
        } else {
          key = account.options.memo_key;
        }
        if (key === pubKey) {
          checkPassword = true;
          break;
        }
      }
      if (!checkPassword)
        return Promise.reject(new Error("Password incorrect"));
    }

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
    handleLogin,
    formValdation,
  };
}
