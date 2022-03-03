import { FormInstance, Rule } from "antd/lib/form";
import { FormFinishInfo } from "rc-field-form";

import { TransactionFee } from "../../../../../../../common/hooks/fees/useFees.types";

export type TransferForm = {
  status: string;
  visible: boolean;
  feeData: TransactionFee | undefined;
  formValdation: FormValidation;
  transferForm: FormInstance<TransferFormData>;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
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
  from: Rule[];
  to: Rule[];
  quantity: Rule[];
  coin: Rule[];
  memo: Rule[];
};

export type TransferFormData = {
  form: string;
  to: string;
  quantity: number;
  coin: string;
  memo: string;
  password: string;
};
