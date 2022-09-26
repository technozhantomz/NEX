import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";

export type UseWithdrawFormResult = {
  feeAmount: number;
  formValdation: FormValidation;
  withdrawForm: FormInstance<WithdrawForm>;
  handleValuesChange: (changedValues: any) => void;
  handleAssetChange: (value: unknown) => void;
  selectedAsset: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  handleWithdraw: (password: string) => Promise<void>;
  loadingTransaction: boolean;
  amount: number;
  withdrawAddress: string;
  userBalance: number;
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
  amount: string;
  withdrawAddress: string;
  withdrawPublicKey: string;
};
