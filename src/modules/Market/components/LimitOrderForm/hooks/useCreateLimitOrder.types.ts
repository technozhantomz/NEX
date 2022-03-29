import { FormInstance } from "../../../../../ui/src";

export type UseCreateLimitOrderArgs = {
  isBuyOrder: boolean;
};

export type UserBalances = {
  buyBalance: number;
  sellBalance: number;
};

export type UseCreateLimitOrderResult = {
  activePair: string;
  orderForm: FormInstance;
  visible: boolean;
  feeAmount: number;
  userBalances: UserBalances;
  onCancel: () => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  confirm: () => void;
  handleValuesChange: (changedValues: any) => void;
};
