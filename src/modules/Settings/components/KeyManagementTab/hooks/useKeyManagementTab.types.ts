import { CheckboxValueType, FormInstance, Rule } from "../../../../../ui/src";

export type UseKeyManagementTabResult = {
  keyManagementForm: FormInstance<KeyManagementForm>;
  formValdation: FormValidation;
  generatedKeys: GeneratedKey[];
  handleCheckboxChange: (checkedValues: CheckboxValueType[]) => void;
  memoWarning: string;
  passwordModalVisible: boolean;
  handlePassowrdCancel: () => void;
};

export type FormValidation = {
  password: Rule[];
  passwordCheck: Rule[];
  roles: Rule[];
};

export type KeyManagementForm = {
  password: string;
  passwordCheck: string;
};

export type GeneratedKey = { label: string; key: string };
