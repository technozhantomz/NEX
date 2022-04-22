import { FormInstance } from "antd";

import { Asset } from "../../../../../../../common/types";

export type UsePowerUpForm = {
  powerUpForm: FormInstance<PowerUpForm>;
  submittingPassword: boolean;
  isPasswordModalVisible: boolean;
  confirm: () => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
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
