import { Asset } from "../../../../../../../common/types";
import { FormInstance, Rule } from "../../../../../../../ui/src";

export type UsePowerDownForm = {
  status: string;
  statusType: string;
  powerDownForm: FormInstance<PowerDownForm>;
  formValdation: FormValidation;
  submittingPassword: boolean;
  isPasswordModalVisible: boolean;
  confirm: () => void;
  handlePasswordModalCancel: () => void;
  adjustWithdraw: (direction: string) => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
};

export type GPOSBalances = {
  openingBalance: number;
  availableBalance: number;
  newBalance: number;
  asset: Asset;
};

export type PowerDownForm = {
  openingBalance: string;
  availableBalance: string;
  withdrawAmount: number;
  newBalance: string;
};

export type FormValidation = {
  withdrawAmount: Rule[];
};
