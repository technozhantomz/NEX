import { CheckboxChangeEvent, FormInstance, Rule } from "../../../../../ui/src";

export type UseSignUpFormResult = {
  validUser: boolean;
  handleSignUp: (formData: unknown) => void;
  setCheckboxValue: (e: CheckboxChangeEvent) => void;
  checkPasswordMatch: (
    _: unknown,
    value: { passwordCheck: string }
  ) => Promise<void>;
  validateUsername: (_: unknown, value: string) => Promise<void>;
  formValidation: IFormValidation;
  signUpForm: FormInstance;
  submitting: boolean;
  generatedPassword: string;
  isInputTypePassword: boolean;
  handleInputType: () => void;
  username: string;
  password: string;
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
