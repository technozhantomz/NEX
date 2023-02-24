import { UserOrderColumnType } from "../../../../../common/components";
import { TransactionMessageState } from "../../../../../common/hooks";
import { OrderTableRow } from "../../../../../common/types";

export type UseOrdersTabResult = {
  loading: boolean;
  openOrdersColumns: UserOrderColumnType[];
  openOrdersTableRows: OrderTableRow[];
  ordersHistoriesTableRows: OrderTableRow[];
  ordersHistoriesColumns: UserOrderColumnType[];
  transactionMessageState: TransactionMessageState;
  selectedOrderId: string;
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  hidePasswordModal: () => void;
  handleFormFinish: (name: string, info: any) => void;
  hideTransactionModal: () => void;
  localStorageAccount: string;
  cancelOrderFeeAmount: number;
  onCancelClick: (orderId: string) => void;
};
