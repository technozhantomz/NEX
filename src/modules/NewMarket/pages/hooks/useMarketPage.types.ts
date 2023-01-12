import { Dispatch, SetStateAction } from "react";

import { UserOrderColumnType } from "../../../../common/components";
import { TransactionMessageState } from "../../../../common/hooks";
import { Exchanges, OrderTableRow } from "../../../../common/types";
import { PairAssets, TradeHistoryColumn, TradeHistoryRow } from "../../types";

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
  tradeHistoryRows: TradeHistoryRow[];
  loadingTradeHistory: boolean;
  tradeHistoryColumns: TradeHistoryColumn[];
  setIsPairModalVisible: Dispatch<SetStateAction<boolean>>;
  isPairModalVisible: boolean;
  handleClickOnPair: () => void;
  exchanges: Exchanges;
  userTradeHistoryRows: TradeHistoryRow[];
};
