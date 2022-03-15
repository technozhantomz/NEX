import { FormInstance, Rule } from "../../../../../ui/src";

export type ITransferForm = {
  status: string;
  visible: boolean;
  feeAmount: number;
  formValdation: IFormValidation;
  transferForm: FormInstance<ITransferFormData>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
  handleValuesChange: (changedValues: any) => void;
};

export type IFormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type IFormValidation = {
  from: Rule[];
  to: Rule[];
  quantity: Rule[];
  asset: Rule[];
  memo: Rule[];
};

export type ITransferFormData = {
  form: string;
  to: string;
  quantity: number;
  asset: string;
  memo: string;
  password: string;
};
