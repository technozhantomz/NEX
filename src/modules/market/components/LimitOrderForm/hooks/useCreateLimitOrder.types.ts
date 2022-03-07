import { FormInstance } from "../../../../../ui/src";

export type UseCreateLimitOrderArgs = {
  isBuyOrder: boolean;
};

export type UseCreateLimitOrderResult = {
  form: FormInstance;
  activePair: string;
};
