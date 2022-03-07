import { FormInstance, Rule } from "antd/lib/form";
import { FormFinishInfo } from "rc-field-form";

import { TransactionFee } from "../../../hooks/useFees.types";

export type WithdrawForm = {
  status: string;
  loggedIn: boolean;
  visible: boolean;
  feeData: TransactionFee | undefined;
  formValdation: FormValidation;
  withdrawForm: FormInstance<TransferFormData>;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
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
