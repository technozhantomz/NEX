import { FormInstance, Rule } from "antd/lib/form";

export type ITransferForm = {
  validFrom: boolean;
  onSend: (values: ITransferFormData) => void;
  formValdation: IFormValidation;
  transferForm: FormInstance;
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
  coin: Rule[];
  memo: Rule[];
};

export type ITransferFormData = {
  form: string;
  to: string;
  quantity: number;
  coin: string;
  memo: string;
};
