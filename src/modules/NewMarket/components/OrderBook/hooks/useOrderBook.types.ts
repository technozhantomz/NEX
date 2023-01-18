import { Order, TradeHistoryRow } from "../../../types";

type OrderColumn = {
  title: string;
  dataIndex: string;
  key: string;
  render?: ((_value: string, record: unknown) => string) | undefined;
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
};

export type FilterType = "buy" | "sell" | "total";
