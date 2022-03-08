import { FormInstance, Rule } from "antd/lib/form";
import { FormFinishInfo } from "rc-field-form";

import { TransactionFee } from "../../../hooks/useFees.types";

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
  amount: Rule[];
  coin: Rule[];
  memo: Rule[];
};

export type TransferFormData = {
  form: string;
  to: string;
  amount: number;
  coin: string;
  memo: string;
};
