import { FormInstance, Rule } from "../../../../ui/src";

export type UseWithdrawFormResult = {
  status: string;
  //loggedIn: boolean;
  visible: boolean;
  feeAmount: number;
  formValdation: FormValidation;
  withdrawForm: FormInstance<WithdrawForm>;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
  handleValuesChange: (changedValues: any) => void;
  // change unknown
  handleAssetChange: (value: unknown) => void;
  selectedAsset: string;
  loading: boolean;
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

export type WithdrawForm = {
  //asset: string;
  from: string;
  amount: number;
  withdrawAddress: string;
  withdrawPublicKey: string;
};
