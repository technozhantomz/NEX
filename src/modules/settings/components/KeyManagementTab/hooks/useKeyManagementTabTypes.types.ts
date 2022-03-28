import { FormInstance, Rule } from "antd/lib/form";

export type KeyManagementTabTypes = {
  updateSetting: () => void;
  requestedKey: string | undefined;
  KeyManagementForm: FormInstance<KeyManagementFormData>;
  formValdation: FormValidation;
};

export type FormValidation = {
  selectRole: Rule[];
};

export type KeyManagementFormData = {
  password: string;
  roles: string;
  generatedKey: number;
};
