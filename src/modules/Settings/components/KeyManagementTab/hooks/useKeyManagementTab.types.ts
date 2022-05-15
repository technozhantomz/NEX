import { Dispatch, SetStateAction } from "react";

import { GeneratedKey } from "../../../../../common/types";
import { CheckboxValueType, FormInstance, Rule } from "../../../../../ui/src";

export type UseKeyManagementTabResult = {
  keyManagementForm: FormInstance<KeyManagementForm>;
  formValidation: FormValidation;
  generatedKeys: GeneratedKey[];
  handleCheckboxChange: (checkedValues: CheckboxValueType[]) => void;
  memoWarning: string;
  updateAccountFee: number;
  selectedKeys: CheckboxValueType[];
  handleValuesChange: () => void;
  serverUserActivePermissions: ModifiedPermissions | undefined;
  localUserActivePermissions: ModifiedPermissions | undefined;
  serverUserOwnerPermissions: ModifiedPermissions | undefined;
  localUserOwnerPermissions: ModifiedPermissions | undefined;
  serverUserMemoKey: string;
  localUserMemoKey: string;
  loading: boolean;
  transactionConfirmed: boolean;
  isPublishable: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  handleAddItem: (
    permissionsType: "active" | "owner",
    itemValue: string,
    weight: number,
    authType: "account" | "address" | "key"
  ) => void;
  handleRemoveItem: (
    permissionsType: "active" | "owner",
    itemValue: string,
    authType: "account" | "address" | "key"
  ) => void;
  resetChanges: () => void;
  handleSaveChanges: (password: string) => Promise<void>;
  handleSetPassword: () => void;
  removePasswordKeys: () => void;
};

export type FormValidation = {
  password: Rule[];
  passwordCheck: Rule[];
  roles: Rule[];
};

export type KeyManagementForm = {
  password: string;
  passwordCheck: string;
};

export type ModifiedPermissions = {
  [key: string]:
    | number
    | string[]
    | {
        [key: string]: number;
      };
  threshold: number;
  accounts: string[];
  keys: string[];
  addresses: string[];
  weights: {
    [key: string]: number;
  };
};
