import { OpenOrdersColumnType } from "../../OpenOrdersColumns";

export type OpenOrdersTableRow = {
  key: string;
  date: string;
  pair: string;
  type: string;
  side: string;
  price: string;
  amount: string;
  filled: string;
  total: string;
  statusActions: string;
};

export type UseOpenOrdersTabResult = {
  loading: boolean;
  openOrdersColumns: OpenOrdersColumnType[];
  openOrdersTableRows: OpenOrdersTableRow[];
};
