import { FormInstance, Rule } from "antd/lib/form";

import { ISignupFormData } from "../../../../../common/types";

export type IUserSignUpForm = {
  validUser: boolean;
  onSignUp: (formData: ISignupFormData) => void;
  checkPasswordMatch: (
    _: unknown,
    value: { passwordCheck: string }
  ) => Promise<void>;
  validateUsername: (_: unknown, value: string) => Promise<void>;
  formValdation: IFormValidation;
  signUpForm: FormInstance;
};

type IFormValidation = {
  username: Rule[];
  password: Rule[];
  passwordCheck: Rule[];
  confirm: Rule[];
  saved: Rule[];
};
