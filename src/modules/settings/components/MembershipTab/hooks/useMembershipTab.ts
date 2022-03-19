import { Form } from "antd";
import { Login } from "peerplaysjs-lib";
import { useCallback, useState } from "react";

import { useUserContext } from "../../../../../common/components/UserProvider";

import { KeyManagementTabTypes } from "./useMembershipTab.types";

export function useMembershipTab(): KeyManagementTabTypes {
  const [visible, setVisible] = useState<boolean>(false);
  const [requestedKey, setRequestedKey] = useState();
  const [KeyManagementForm] = Form.useForm();
  const { localStorageAccount } = useUserContext();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const updateSetting = useCallback(async () => {
    setModalText(
      `For this operations you'll have to pay 10000 TEST fee. Do you want to continue?`
    );

    setVisible(true);
  }, []);

  const handleOk = (val) => {
    console.log(val);
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const formValdation = {
    selectRole: [{ required: true, message: "Select any role" }],
  };

  return {
    visible,
    updateSetting,
    KeyManagementForm,
    requestedKey,
    formValdation,
    handleCancel,
    handleOk,
    confirmLoading,
    modalText,
  };
}
