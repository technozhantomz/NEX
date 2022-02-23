import { FormInstance } from "antd";

export type IPasswordModal = {
  passwordModal: FormInstance<IPasswordModalForm>;
  validatePassword: (_: unknown, value: string) => Promise<void>;
  handleOk: () => Promise<string>;
};

export type IPasswordModalForm = {
  password: string;
};

export type ICallbackFunction = {
  callback: (password: string) => void;
};
