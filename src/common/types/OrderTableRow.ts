export type OrderTableRow = {
  key: string;
  date: string;
  pair: string;
  type: string;
  side: string;
  price: string;
  numberedPrice: number;
  amount: string;
  numberedAmount: number;
  filled: string;
  total: string;
  numberedTotal: number;
  statusActions?: string;
  isOpenOrderRow: boolean;
};
