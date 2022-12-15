import { FormInstance } from "antd/lib/form";

export type UseTransferResult = {
  transferForm: FormInstance<TransferForm>;
  // formValidation: FormValidation;

  selectedFromToken: string;
  handleFromTokenChange: (value: unknown) => void;

  selectedFromNetwork: string;
  handleFromNetworkChange: (value: unknown) => void;

  selectedToNetwork: string;
  handleToNetworkChange: (value: unknown) => void;

  transferAmount: string;
  handleTransferAmountChange: (value: unknown) => void;

  handleTransferSubmit: (value: unknown) => void;

  handleValuesChange: (value: unknown) => void;
  handleHiveDeposit: () => Promise<void>;
};

export type TransferInputType = "transfer";

// export type FormValidation = {
// };

export type TransferForm = {
  fromNetwork: string;
  fromToken: string;
  toNetwork: string;
  transferAmount: string;
};
