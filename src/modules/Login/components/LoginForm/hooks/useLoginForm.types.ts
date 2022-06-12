import { FormInstance, Rule } from "../../../../../ui/src";

export type ILoginForm = {
  validUser: boolean;
  handleLogin: () => void;
  formValdation: IFormValidation;
  loginForm: FormInstance;
  submitting: boolean;
  isWhaleChecked: boolean;
  setIsWhaleChecked: (checkboxValue: boolean) => void;
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
