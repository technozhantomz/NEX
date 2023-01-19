import { Order, TradeHistoryRow } from "../../../types";

export type OrderColumn = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (_value: string, record: unknown) => string;
  fixed?: boolean | string;
};

export type UseOrderBookResult = {
  threshold: number;
  handleThresholdChange: (menuInfo: { key: string }) => void;
  orderColumns: OrderColumn[];
  asksRows: Order[];
  bidsRows: Order[];
  filter: FilterType;
  handleFilterChange: (type: FilterType) => void;
  thresholdValues: string[];
  specifyTableHeight: () => string;
  specifyTableScroll: (orders: Order[]) =>
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
