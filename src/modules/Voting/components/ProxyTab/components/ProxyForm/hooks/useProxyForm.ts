import { useCallback, useState } from "react";

import { useAccount } from "../../../../../../../common/hooks";
import { FullAccount } from "../../../../../../../common/types";
import { Form } from "../../../../../../../ui/src";

import { UseProxyForm } from "./useProxyForm.types";

export function useProxyForm(): UseProxyForm {
  const [proxyForm] = Form.useForm();
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);
  const [searchedAccount, setSearchedAccount] = useState<
    FullAccount | undefined
  >();
  const [proxyAccounts, setProxyAccounts] = useState<FullAccount[]>();
  const { getFullAccount } = useAccount();

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const confirm = () => {
    proxyForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        //handlePowerDown(values.password);
      });
    }
  };

  const handleSearch = useCallback(async (name: string) => {
    proxyForm.validateFields();
  }, []);

  const handleAdd = () => {
    proxyForm.validateFields().then(() => {
      proxyAccounts.push(searchedAccount);
      setProxyAccounts(proxyAccounts);
    });
  };

  const validateProxyUsername = async (_: unknown, value: string) => {
    const fullAccount = await getFullAccount(value, false);
    if (!fullAccount) {
      return Promise.reject(new Error("User not found"));
    }
    setSearchedAccount(fullAccount);
    // setTemporaryFullAccount(fullAccount);
    // setValidUser(true);
    return Promise.resolve();
  };

  const formValidator = {
    proxyUsername: [{ validator: validateProxyUsername }],
  };

  return {
    proxyForm,
    formValidator,
    submittingPassword,
    isPasswordModalVisible,
    confirm,
    onFormFinish,
    handleSearch,
    handlePasswordModalCancel,
  };
}
