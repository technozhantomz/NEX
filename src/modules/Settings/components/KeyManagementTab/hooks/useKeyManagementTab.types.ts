import { CheckboxValueType, FormInstance, Rule } from "../../../../../ui/src";

export type UseKeyManagementTabResult = {
  keyManagementForm: FormInstance<KeyManagementForm>;
  formValidation: FormValidation;
  generatedKeys: GeneratedKey[];
  handleCheckboxChange: (checkedValues: CheckboxValueType[]) => void;
  memoWarning: string;
  fee: number;
  selectedKeys: CheckboxValueType[];
  handleValuesChange: () => void;
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

export type ModifiedPermissions = {
  [key: string]:
    | number
    | string[]
    | {
        [key: string]: number;
      };
  threshold: number;
  accounts: string[];
  keys: string[];
  addresses: string[];
  weights: {
    [key: string]: number;
  };
};
