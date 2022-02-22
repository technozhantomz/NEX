import { FormInstance, Rule } from "antd/lib/form";

import { ITransactionFee } from "../../../../../../../common/hooks/fees/useFees.type";

export type ITransferForm = {
  validFrom: boolean;
  feeData: ITransactionFee;
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
