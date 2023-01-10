import { UserOrderColumnType } from "../../../../common/components";
import { TransactionMessageState } from "../../../../common/hooks";
import { OrderTableRow } from "../../../../common/types";
import { PairAssets } from "../../types";

export type UseMarketPageResult = {
  loadingSelectedPair: boolean;
  selectedAssets: PairAssets | undefined;
  userOpenOrdersRows: OrderTableRow[];
  userOrderHistoryRows: OrderTableRow[];
  userOpenOrdersColumns: UserOrderColumnType[];
  userOrdersHistoriesColumns: UserOrderColumnType[];
  loadingUserOrders: boolean;
  cancelOrderFeeAmount: number;
  transactionMessageState: TransactionMessageState;
  handleCancelLimitOrderFinish: (name: string, info: any) => void;
  selectedOrderId: string;
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  hidePasswordModal: () => void;
  hideTransactionModal: () => void;
  localStorageAccount: string;
  formUserOrders: () => Promise<void>;
};
