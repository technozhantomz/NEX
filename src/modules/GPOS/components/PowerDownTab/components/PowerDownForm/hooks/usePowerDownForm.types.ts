import { FormInstance } from "antd";

import { Asset } from "../../../../../../../common/types";

export type UsePowerDownForm = {
  powerUpForm: FormInstance<PowerDownForm>;
  submittingPassword: boolean;
  isPasswordModalVisible: boolean;
  handlePasswordModalCancel: () => void;
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
