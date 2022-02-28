import { FormInstance, Rule } from "antd/lib/form";
import { FormFinishInfo } from "rc-field-form";

import { ITransactionFee } from "../../../../../../../common/hooks/fees/useFees.type";

export type ITransferForm = {
  status: string;
  visible: boolean;
  feeData: ITransactionFee | undefined;
  formValdation: IFormValidation;
  transferForm: FormInstance<ITransferFormData>;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  onCancel: () => void;
  confirm: () => void;
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
  password: string;
};
