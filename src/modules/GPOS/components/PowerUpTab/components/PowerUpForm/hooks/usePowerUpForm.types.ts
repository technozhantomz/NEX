import { FormInstance } from "antd";

import { Asset } from "../../../../../../../common/types";

export type UsePowerUpForm = {
  powerUpForm: FormInstance<PowerUpForm>;
  submittingPassword: boolean;
  isPasswordModalVisible: boolean;
  handlePasswordModalCancel: () => void;
  adjustDeposit: (direction: string) => void;
};

export type GPOSBalances = {
  openingBalance: number;
  newBalance: number;
  asset: Asset;
};

export type PowerUpForm = {
  openingBalance: string;
  depositAmount: number;
  newBalance: string;
};
