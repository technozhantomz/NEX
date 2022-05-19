import { FormInstance, Rule } from "../../../../ui/src";

export type IUsePasswordForm = {
  passwordModalForm: FormInstance<IPasswordForm>;
  formValidation: FormValidation;
  useResetFormOnCloseModal: (
    form: FormInstance<IPasswordForm>,
    visible: boolean
  ) => void;
};

export type IPasswordForm = {
  password: string;
};

export type FormValidation = {
  password: Rule[];
};
