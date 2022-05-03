import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { useUserContext } from "../../providers";

import { UseHandleTransactionFormResult } from "./useHandleTransactionForm.types";

type Args = {
  handleTransactionConfirmation: (password: string) => Promise<void>;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
};

export function useHandleTransactionForm({
  handleTransactionConfirmation,
  setTransactionErrorMessage,
  setTransactionSuccessMessage,
}: Args): UseHandleTransactionFormResult {
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState<boolean>(false);

  const { password, setPassword } = useUserContext();

  const showTransactionModal = useCallback(() => {
    setIsTransactionModalVisible(true);
  }, [setIsTransactionModalVisible]);

  const hideTransactionModal = useCallback(() => {
    setTransactionErrorMessage("");
    setTransactionSuccessMessage("");
    setIsTransactionModalVisible(false);
  }, [setIsTransactionModalVisible]);

  const showPasswordModal = useCallback(() => {
    setIsPasswordModalVisible(true);
  }, [setIsPasswordModalVisible]);

  const hidePasswordModal = useCallback(() => {
    setIsPasswordModalVisible(false);
  }, [setIsPasswordModalVisible]);

  const handleFormFinish = (name: string, info: any) => {
    const { values, forms } = info;
    const { passwordModal, transactionModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        setPassword(values.password);
        setIsPasswordModalVisible(false);
        setIsTransactionModalVisible(true);
      });
    }
    if (name === "transactionModal") {
      transactionModal.validateFields().then(() => {
        handleTransactionConfirmation(password);
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
