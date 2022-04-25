import { Asset } from "../../../../../common/types";
import { FormInstance, Rule } from "../../../../../ui/src";

export type UseCreateLimitOrderArgs = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  isBuyOrder: boolean;
  refreshHistory: () => void;
  refreshOrderBook: () => void;
};

export type UseCreateLimitOrderResult = {
  feeAmount: number;
  marketFeePercent: number;
  balance: number;
  orderForm: FormInstance<OrderForm>;
  formValdation: FormValidation;
  handleValuesChange: (changedValues: any, allValues: any) => void;
  isPasswordModalVisible: boolean;
  handleCancelPasswordModal: () => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  confirm: () => void;
  submittingPassword: boolean;
};

export type FormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type FormValidation = {
  price: Rule[];
  quantity: Rule[];
  total: Rule[];
};

export type OrderForm = {
  price: number;
  quantity: number;
  total: number;
};
