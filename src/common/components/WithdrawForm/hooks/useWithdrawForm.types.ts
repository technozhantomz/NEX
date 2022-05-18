import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";

export type UseWithdrawFormResult = {
  feeAmount: number;
  formValdation: FormValidation;
  withdrawForm: FormInstance<WithdrawForm>;
  selectedAsset: string;
  submittingPassword: boolean;
  loadingTransaction: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  withdraw: (password: string) => Promise<void>;
  handleValuesChange: (changedValues: any) => void;
  handleAssetChange: (value: unknown) => void;
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
  amount: Rule[];
  withdrawAddress: Rule[];
  withdrawPublicKey: Rule[];
};

export type WithdrawForm = {
  from: string;
  amount: number;
  withdrawAddress: string;
  withdrawPublicKey: string;
};
