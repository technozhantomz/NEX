import { OrderTableRow } from "../../../types";
import { OrderColumnType } from "../../OrdersColumns";

export type UseOrdersTabResult = {
  loading: boolean;
  openOrdersColumns: OrderColumnType[];
  openOrdersTableRows: OrderTableRow[];
  ordersHistoriesTableRows: OrderTableRow[];
  ordersHistoriesColumns: OrderColumnType[];
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  selectedOrderId: string;
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  hidePasswordModal: () => void;
  handleFormFinish: (name: string, info: any) => void;
  hideTransactionModal: () => void;
  localStorageAccount: string;
  cancelOrderfeeAmount: number;
  onCancelClick: (orderId: string) => void;
};
