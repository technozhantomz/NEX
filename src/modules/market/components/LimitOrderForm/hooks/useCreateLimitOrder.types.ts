import { FormInstance } from "../../../../../ui/src";

export type UseCreateLimitOrderArgs = {
  isBuyOrder: boolean;
};

export type FormValues = {
  price: number;
  quantity: number;
  total: number;
};

export type UseCreateLimitOrderResult = {
  form: FormInstance;
  activePair: string;
  handleValuesChange: (changedValues: any, allValues: unknown) => void;
};
