import { CheckboxChangeEvent, FormInstance, Rule } from "../../../../../ui/src";

export type ISignUpForm = {
  validUser: boolean;
  handleSignUp: (formData: unknown) => void;
  setCheckboxVlaue: (e: CheckboxChangeEvent) => void;
  checkPasswordMatch: (
    _: unknown,
    value: { passwordCheck: string }
  ) => Promise<void>;
  validateUsername: (_: unknown, value: string) => Promise<void>;
  formValdation: IFormValidation;
  signUpForm: FormInstance;
  submitting: boolean;
  generatedPassword: string;
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
  passwordCheck: Rule[];
  confirm: Rule[];
  saved: Rule[];
};
