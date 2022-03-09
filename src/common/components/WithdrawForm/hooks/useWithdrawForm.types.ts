import { FormInstance, Rule } from "antd/lib/form";

export type WithdrawForm = {
  status: string;
  visible: boolean;
  feeAmount: number;
  formValdation: FormValidation;
  withdrawForm: FormInstance<TransferFormData>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
};

export type FormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type FormValidation = {
  amount: Rule[];
  withdrawAddress: Rule[];
};

export type TransferFormData = {
  amount: number;
  withdrawAddress: string;
};

export type SonNetworkStatus = {
  status: any[];
  isSonNetworkOk: boolean;
};
