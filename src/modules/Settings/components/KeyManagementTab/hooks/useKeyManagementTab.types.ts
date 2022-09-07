import { GeneratedKey } from "../../../../../common/types";
import { CheckboxValueType, FormInstance, Rule } from "../../../../../ui/src";

export type UseKeyManagementTabResult = {
  keyManagementForm: FormInstance<KeyManagementForm>;
  formValidation: FormValidation;
  generatedKeys: GeneratedKey[];
  handleCheckboxChange: (checkedValues: CheckboxValueType[]) => void;
  selectedKeys: CheckboxValueType[];
  onGo: () => void;
};

export type FormValidation = {
  password: Rule[];
  roles: Rule[];
};

export type KeyManagementForm = {
  password: string;
};
