import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { useFormKeys } from "..";
import { useUserContext } from "../../providers";
import { KeyType, SignerKey } from "../../types";

import { UseHandleTransactionFormResult } from "./useHandleTransactionForm.types";

type Args = {
  handleTransactionConfirmation: (password: SignerKey) => Promise<void>;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  neededKeyType: KeyType;
};

export function useHandleTransactionForm({
  handleTransactionConfirmation,
  setTransactionErrorMessage,
  setTransactionSuccessMessage,
  neededKeyType,
}: Args): UseHandleTransactionFormResult {
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState<boolean>(false);
  const [inputedPassword, setInputedPassword] = useState<string>("");
  const [inputedKeyType, setInputedKeyType] = useState<KeyType>("");

  const {
    password,
    keyType: savedKeyType,
    savePassword,
    localStorageAccount,
  } = useUserContext();
  const { formSignerKey } = useFormKeys();

  const showTransactionModal = useCallback(() => {
    setIsTransactionModalVisible(true);
  }, [setIsTransactionModalVisible]);

  const hideTransactionModal = useCallback(() => {
    setTransactionErrorMessage("");
    setTransactionSuccessMessage("");
    setIsTransactionModalVisible(false);
  }, [setIsTransactionModalVisible]);

  const showPasswordModal = useCallback(() => {
    if (
      !password ||
      password === "" ||
      (savedKeyType !== "password" && savedKeyType !== neededKeyType)
    ) {
      setIsPasswordModalVisible(true);
    } else {
      setIsPasswordModalVisible(false);
      setIsTransactionModalVisible(true);
    }
  }, [
    setIsPasswordModalVisible,
    password,
    savedKeyType,
    neededKeyType,
    setIsTransactionModalVisible,
  ]);

  const hidePasswordModal = useCallback(() => {
    setIsPasswordModalVisible(false);
  }, [setIsPasswordModalVisible]);

  const handleFormFinish = (name: string, info: any) => {
    const { values, forms } = info;

    const { passwordModal, transactionModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        savePassword(values.password, values.keyType);
        setInputedPassword(values.password);
        setInputedKeyType(values.keyType);
        setIsPasswordModalVisible(false);
        setIsTransactionModalVisible(true);
      });
    }
    if (name === "transactionModal") {
      transactionModal.validateFields().then(() => {
        let key = "";
        let keyType: KeyType = "";
        const passwordModalShown = inputedKeyType !== "";

        if (passwordModalShown) {
          key = inputedPassword;
          keyType = inputedKeyType;
        } else {
          key = password;
          keyType = savedKeyType;
        }
        const signerKey = formSignerKey(
          localStorageAccount,
          key,
          keyType,
          neededKeyType
        );
        handleTransactionConfirmation(signerKey);
      });
    }
  };

  return {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    showPasswordModal,
    showTransactionModal,
    hideTransactionModal,
    handleFormFinish,
  };
}
