import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FormInstance, Rule } from "antd/lib/form";

import { ISignupFormData } from "../../../../../common/types";

export type ISignUpForm = {
  validUser: boolean;
  onSignUp: (formData: ISignupFormData) => void;
  setCheckboxVlaue: (e: CheckboxChangeEvent) => void;
  checkPasswordMatch: (
    _: unknown,
    value: { passwordCheck: string }
  ) => Promise<void>;
  validateUsername: (_: unknown, value: string) => Promise<void>;
  formValdation: IFormValidation;
  signUpForm: FormInstance;
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
