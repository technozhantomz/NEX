import { FormInstance } from "antd";

export const useCopyPassword = (signUpForm: FormInstance): void => {
  navigator.clipboard.writeText(signUpForm.getFieldValue("password"));
};
