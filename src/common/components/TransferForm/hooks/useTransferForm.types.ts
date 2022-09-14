import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";
import { Account } from "../../../types";

export type UseTransferFormResult = {
  feeAmount: number;
  formValdation: FormValidation;
  transferForm: FormInstance<TransferForm>;
  handleValuesChange: (changedValues: any) => void;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  transfer: (password: string) => Promise<void>;
  loadingTransaction: boolean;
  toAccount: Account | undefined;
  amount: number;
  transferFee: number;
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
  from: string;
  to: string;
  amount: string;
  asset: string;
  memo?: string;
};
