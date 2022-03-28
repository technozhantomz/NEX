import { FormInstance, Rule } from "../../../../../ui/src";

export type PairModal = {
  pairModalForm: FormInstance<PairForm>;
  assets: string[];
  recentPairs: string[];
  formValdation: FormValidation;
  useResetFormOnCloseModal: (
    form: FormInstance<PairForm>,
    visible: boolean
  ) => void;
  updatePair: (values: any) => void;
};

export type FormValidation = {
  quote: Rule[];
  base: Rule[];
  recents: Rule[];
};

export type PairForm = {
  quote: string;
  base: string;
  recents: string;
};
