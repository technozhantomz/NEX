import { FormInstance } from "antd/lib/form";

export type IUseMembershipForm = {
  validatePassword: (_: unknown, value: string) => Promise<void>;
  useResetFormOnCloseModal: (
    form: FormInstance<IMembershipForm>,
    visible: boolean
  ) => void;
  passwordModalForm: FormInstance<IMembershipForm>;
};

export type IMembershipForm = {
  password: string;
};
