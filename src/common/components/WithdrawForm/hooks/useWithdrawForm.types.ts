import { FormInstance, Rule } from "antd/lib/form";

export type UseWithdrawForm = {
  status: string;
  loggedIn: boolean;
  visible: boolean;
  feeAmount: number;
  formValdation: FormValidation;
  withdrawForm: FormInstance<TransferFormData>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
  handleAssetChange: (value: unknown) => void;
};

export type FormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type FormValidation = {
  asset: Rule[];
  amount: Rule[];
  withdrawAddress: Rule[];
};

export type TransferFormData = {
  asset: string;
  amount: number;
  withdrawAddress: string;
};

export type SonNetworkStatus = {
  status: any[];
  isSonNetworkOk: boolean;
};
