import { FormInstance } from "antd";

import { Asset } from "../../../../../../../common/types";

export type UsePowerDownForm = {
  powerDownForm: FormInstance<PowerDownForm>;
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
