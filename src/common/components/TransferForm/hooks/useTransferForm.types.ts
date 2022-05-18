import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";

export type UseTransferFormResult = {
  feeAmount: number;
  formValdation: FormValidation;
  transferForm: FormInstance<TransferForm>;
  submittingPassword: boolean;
  loadingTransaction: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  transfer: (password: string) => Promise<void>;
  handleValuesChange: (changedValues: any) => void;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
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
