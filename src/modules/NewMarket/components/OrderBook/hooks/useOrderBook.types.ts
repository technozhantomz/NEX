import { MarketOrder, TradeHistoryRow } from "../../../../../common/types";

export type OrderColumn = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (_value: string, record: unknown) => string;
  fixed?: boolean | string;
};

export type UseOrderBookResult = {
  threshold: number;
  loading: boolean;
  orderColumns: OrderColumn[];
  asksRows: MarketOrder[];
  bidsRows: MarketOrder[];
  filter: FilterType;
  thresholdValues: string[];
  lastTrade: TradeHistoryRow;
  handleFilterChange: (type: FilterType) => void;
  handleThresholdChange: (menuInfo: { key: string }) => void;
  specifyTableHeight: () => string;
  specifyTableScroll: (orders: MarketOrder[]) =>
    | {
        y: number;
        x: undefined;
        scrollToFirstRowOnChange: boolean;
      }
    | undefined;
  specifyLastTradeClassName: (tradeHistory?: TradeHistoryRow) => string;
  specifyAsksTableRowClassName: (record: any) => string;
  specifyBidsTableRowClassName: (record: any) => string;
};

export type FilterType = "buy" | "sell" | "total";
