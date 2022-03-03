import { FormInstance, Rule } from "antd/lib/form";

export type ILoginForm = {
  validUser: boolean;
  onLogin: () => void;
  formValdation: IFormValidation;
  loginForm: FormInstance;
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
