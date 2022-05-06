import { FormInstance } from "../../../../ui/src";

export type UseTransactionModalResult = {
  useResetFormOnCloseModal: (form: FormInstance, visible: boolean) => void;
  transactionModalForm: FormInstance;
};
