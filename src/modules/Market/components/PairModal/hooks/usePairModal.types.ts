import { FormInstance, Rule } from "../../../../../ui/src";

export type UsePairModalResult = {
  pairModalForm: FormInstance<PairForm>;
  allAssetsSymbols: string[];
  formValidation: FormValidation;
  useResetFormOnOpenModal: (
    form: FormInstance<PairForm>,
    visible: boolean
  ) => void;
  handleCancel: () => void;
  handleSelectPair: () => void;
  handleSelectRecent: (value: string) => void;
  handleValuesChange: () => void;
};

export type FormValidation = {
  quote: Rule[];
  base: Rule[];
};

export type PairForm = {
  quote: string;
  base: string;
};
