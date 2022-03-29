import { FormInstance, Rule } from "../../../../../ui/src";

export type PairModal = {
  pairModalForm: FormInstance<PairForm>;
  assets: string[];
  formValdation: FormValidation;
  useResetFormOnCloseModal: (
    form: FormInstance<PairForm>,
    visible: boolean
  ) => void;
  updatePair: (values: PairForm) => void;
  onSeletRecent: (value: string) => void;
};

export type FormValidation = {
  quote: Rule[];
  base: Rule[];
};

export type PairForm = {
  quote: string;
  base: string;
};
