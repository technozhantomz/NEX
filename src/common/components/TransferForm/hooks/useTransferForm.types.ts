import { FormInstance, Rule } from "antd/lib/form";

import { TransactionFee } from "../../../hooks/useFees.types";

export type TransferForm = {
  status: string;
  visible: boolean;
  feeAmount: number;
  formValdation: FormValidation;
  transferForm: FormInstance<TransferFormData>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
  handleValuesChange: (changedValues: any) => void;
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
  quantity: Rule[];
  asset: Rule[];
  memo: Rule[];
};

export type TransferFormData = {
  form: string;
  to: string;
  quantity: number;
  asset: string;
  memo: string;
};
