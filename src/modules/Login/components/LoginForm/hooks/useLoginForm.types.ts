import { CheckboxChangeEvent, FormInstance, Rule } from "../../../../../ui/src";

export type UseLoginFormResult = {
  validUser: boolean;
  handleLogin: () => void;
  formValdation: IFormValidation;
  loginForm: FormInstance<LoginForm>;
  submitting: boolean;
  useWhaleVault: boolean;
  onChangeUseWhaleVault: (e: CheckboxChangeEvent) => void;
  onChangeWalletLock: (value: number) => void;
};

export type LoginForm = {
  username: string;
  password?: string;
  walletLock?: number;
  useWhalVault: boolean;
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
  useWhaleVault: Rule[];
};
