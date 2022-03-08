import { FormInstance } from "antd/lib/form";

export type IUsePasswordForm = {
  validatePassword: (_: unknown, value: string) => Promise<void>;
  useResetFormOnCloseModal: (
    form: FormInstance<IPasswordForm>,
    visible: boolean
  ) => void;
  passwordModalForm: FormInstance<IPasswordForm>;
};

export type IPasswordForm = {
  password: string;
};
