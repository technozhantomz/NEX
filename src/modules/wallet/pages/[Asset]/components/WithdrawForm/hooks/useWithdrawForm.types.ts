import { FormInstance, Rule } from "antd/lib/form";
import { FormFinishInfo } from "rc-field-form";

import { TransactionFee } from "../../../../../../../common/hooks/useFees.types";

export type WithdrawForm = {
  status: string;
  visible: boolean;
  feeData: TransactionFee | undefined;
  formValdation: FormValidation;
  withdrawForm: FormInstance<TransferFormData>;
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
  withdrawAddress: Rule[];
};

export type TransferFormData = {
  form: string;
  to: string;
  amount: number;
  withdrawAddress: string;
};
