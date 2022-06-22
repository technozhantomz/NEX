import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";
import { Account } from "../../../types";

export type UseTransferFormResult = {
  status: string;
  isPasswordModalVisible: boolean;
  feeAmount: number;
  formValdation: FormValidation;
  transferForm: FormInstance<TransferForm>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  handlePasswordModalCancel: () => void;
  confirm: () => void;
  handleValuesChange: (changedValues: any) => void;
  submittingPassword: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  transfer: (password: string) => Promise<void>;
  loadingTransaction: boolean;
  toAccount: Account | undefined;
  quantity: number;
};

export type FormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type FormValidation = {
  from: Rule[];
  to: Rule[];
  amount: Rule[];
  asset: Rule[];
  memo: Rule[];
};

export type TransferForm = {
  form: string;
  to: string;
  amount: number;
  asset: string;
  memo: string;
};
