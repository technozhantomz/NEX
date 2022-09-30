import { CheckboxChangeEvent, FormInstance, Rule } from "../../../../ui/src";
import { KeyType } from "../../../types";

export type IUsePasswordForm = {
  passwordModalForm: FormInstance<PasswordForm>;
  formValidation: FormValidation;
  useWhaleVault: boolean;
  onChangeUseWhaleVault: (e: CheckboxChangeEvent) => void;
  useResetFormOnCloseModal: (
    form: FormInstance<PasswordForm>,
    visible: boolean
  ) => void;
};

export type PasswordForm = {
  username: string;
  password: string;
  keyType: KeyType;
};

export type FormValidation = {
  password: Rule[];
  useWhaleVault: Rule[];
};
