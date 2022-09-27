import { CheckboxChangeEvent, FormInstance, Rule } from "../../../../../ui/src";

export type UseLoginFormResult = {
  validUser: boolean;
  handleLogin: () => void;
  formValdation: IFormValidation;
  loginForm: FormInstance<LoginForm>;
  submitting: boolean;
  useWhalevault: boolean;
  onChangeUseWhalevault: (e: CheckboxChangeEvent) => void;
};

export type LoginForm = {
  username: string;
  password?: string;
  walletLock?: number;
  useWhalvault: boolean;
};
export type IFormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type IFormValidation = {
  username: Rule[];
  password: Rule[];
};
