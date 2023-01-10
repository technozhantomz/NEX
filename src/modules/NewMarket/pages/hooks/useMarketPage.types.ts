import { Dispatch, SetStateAction } from "react";

import { Exchanges, PairNameAndMarketStats } from "../../../../common/types";
import { FormInstance } from "../../../../ui/src";
import {
  Order,
  OrderForm,
  OrderHistoryRow,
  OrderRow,
  PairAssets,
} from "../../types";

export type UseMarketPageResult = {
  tradingPairsStats: PairNameAndMarketStats[];
  loadingTradingPairsStats: boolean;
  loadingSelectedPair: boolean;
  selectedAssets: PairAssets | undefined;
  isPairModalVisible: boolean;
  exchanges: Exchanges;
  asks: Order[];
  bids: Order[];
  loadingAsksBids: boolean;
  userOrdersRows: OrderRow[];
  loadingUserOrderRows: boolean;
  orderHistoryRows: OrderHistoryRow[];
  loadingOrderHistoryRows: boolean;
  userOrderHistoryRows: OrderHistoryRow[];
  loadingUserHistoryRows: boolean;
  buyOrderForm: FormInstance<OrderForm>;
  sellOrderForm: FormInstance<OrderForm>;
  pageLoaded: boolean;
  onOrderBookRowClick: (record: OrderRow) => void;
  setIsPairModalVisible: Dispatch<SetStateAction<boolean>>;
  handleClickOnPair: () => void;
};
