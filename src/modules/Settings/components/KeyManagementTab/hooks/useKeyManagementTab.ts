import { useCallback, useEffect, useState } from "react";

import { useFees } from "../../../../../common/hooks";
import { CheckboxValueType, Form } from "../../../../../ui/src";

import {
  FormValidation,
  GeneratedKey,
  UseKeyManagementTabResult,
} from "./useKeyManagementTab.types";

export function useKeyManagementTab(): UseKeyManagementTabResult {
  const [memoWarning, setMemoWarning] = useState<string>("");
  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKey[]>([]);
  const [passwordModalVisible, setPasswordModalVisible] =
    useState<boolean>(false);
  const [fee, setFee] = useState<number>(0);

  const { calculateUpdateAccountFee } = useFees();
  const [keyManagementForm] = Form.useForm();

  useEffect(() => {
    const updateAccountFee = calculateUpdateAccountFee();
    if (updateAccountFee) {
      setFee(updateAccountFee);
    }
  }, [calculateUpdateAccountFee, setFee]);

  const handlePassowrdCancel = useCallback(() => {
    setPasswordModalVisible(false);
  }, [setPasswordModalVisible]);

  const handleCheckboxChange = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      if (checkedValues.includes("memo")) {
        setMemoWarning(
          "WARNING: If you replace the memo key you will be unable to read old memos when logging in with your password"
        );
      } else {
        setMemoWarning("");
      }
    },
    [setMemoWarning]
  );

  const checkPasswordMatch = (_: unknown, value: { passwordCheck: string }) => {
    if (value === keyManagementForm.getFieldValue("password"))
      return Promise.resolve();
    return Promise.reject(new Error("Password do not match"));
  };

  const formValdation: FormValidation = {
    password: [
      { required: true, message: "Password is required" },
      {
        min: 12,
        message: "Password should be at least 12 characters long",
      },
    ],
    passwordCheck: [
      { required: true, message: "This feild is required" },
      { validator: checkPasswordMatch },
    ],
    roles: [{ required: true, message: "Please at least select one role" }],
  };

  return {
    formValdation,
    keyManagementForm,
    generatedKeys,
    handleCheckboxChange,
    memoWarning,
    passwordModalVisible,
    handlePassowrdCancel,
    fee,
  };
}
