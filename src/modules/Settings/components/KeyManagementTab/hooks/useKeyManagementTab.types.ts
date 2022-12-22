import { GeneratedKey, PublicKeys } from "../../../../../common/types";
import { CheckboxValueType, FormInstance, Rule } from "../../../../../ui/src";

export type UseKeyManagementTabResult = {
  keyManagementForm: FormInstance<KeyManagementForm>;
  formValidation: FormValidation;
  publicKeys?: PublicKeys[];
  generatedKeys: GeneratedKey[];
  handleCheckboxChange: (checkedValues: CheckboxValueType[]) => void;
  downloadPrivateKeys: () => void;
  selectedKeys: CheckboxValueType[];
  onGo: () => void;
  downloaded: boolean;
};

export type FormValidation = {
  password: Rule[];
  roles: Rule[];
};

export type KeyManagementForm = {
  password: string;
};
