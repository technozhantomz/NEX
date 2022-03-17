import { FormInstance, Rule } from "../../../../ui/src";

export type WithdrawForm = {
  status: string;
  visible: boolean;
  feeAmount: number;
  formValdation: FormValidation;
  withdrawForm: FormInstance<TransferFormData>;
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
  amount: Rule[];
  withdrawAddress: Rule[];
  withdrawPublicKey: Rule[];
};

export type TransferFormData = {
  from: string;
  amount: number;
  withdrawAddress: string;
  withdrawPublicKey: string;
};
