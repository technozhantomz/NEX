import { Form, FormInstance } from "antd";
import { Login, PrivateKey } from "peerplaysjs-lib";
import { useEffect, useRef } from "react";

import { defaultToken } from "../../../../api/params/networkparams";
import { useAccount } from "../../../hooks";
import { Account } from "../../../types";
import { useUserContext } from "../../UserProvider";

import { IMembershipForm, IUseMembershipForm } from "./MembershipModal.types";

export function useMembershipForm(): IUseMembershipForm {
  const { localStorageAccount } = useUserContext();
  const [membershipModalForm] = Form.useForm();
  const { getAccountByName } = useAccount();

  // const useResetFormOnCloseModal = (
  //   form: FormInstance<IMembershipForm>,
  //   visible: boolean
  // ) => {
  //   const prevVisibleRef = useRef<boolean>();
  //   useEffect(() => {
  //     prevVisibleRef.current = visible;
  //   }, [visible]);
  //   const prevVisible = prevVisibleRef.current;

  //   useEffect(() => {
  //     if (!visible && prevVisible) {
  //       form.resetFields();
  //     }
  //   }, [visible]);
  // };

  // const validatePassword = async (_: unknown, value: string) => {
  //   const roles = ["active", "owner", "memo"];
  //   const accData = await getAccountByName(localStorageAccount);
  //   let checkPassword = false;
  //   let fromWif = "";

  //   try {
  //     fromWif = PrivateKey.fromWif(value);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   const keys = Login.generateKeys(localStorageAccount, value, roles);

  //   for (const role of roles) {
  //     const privKey = fromWif ? fromWif : keys.privKeys[role];
  //     const pubKey = privKey.toPublicKey().toString(defaultToken);
  //     const key =
  //       role !== "memo"
  //         ? accData[role as keyof Account].key_auths[0][0]
  //         : accData.options.memo_key;

  //     if (key === pubKey) {
  //       checkPassword = true;
  //       break;
  //     }
  //   }
  //   if (!checkPassword) return Promise.reject(new Error("Password incorrect"));
  //   return Promise.resolve();
  // };

  return {
    membershipModalForm,
  };
}
