import { FormInstance, Rule } from "../../../../../ui/src";

export type UsePairModalResult = {
  pairModalForm: FormInstance<PairForm>;
  allAssetsSymbols: string[];
  formValidation: FormValidation;
  handleCancel: () => void;
  handleSelectPair: () => void;
  handleSelectRecent: (value: unknown) => void;
  handleValuesChange: () => void;
};

export type FormValidation = {
  quote: Rule[];
  base: Rule[];
};

export type PairForm = {
  quote: string;
  base: string;
  recents: string;
};
