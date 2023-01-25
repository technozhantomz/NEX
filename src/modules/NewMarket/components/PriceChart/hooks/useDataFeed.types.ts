import { IBasicDataFeed } from "../../../../../../public/static/charting_library/charting_library";
import { OrderHistory } from "../../../../../common/types";

export type ExchangeSymbols = {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  type: string;
};

export type UseDataFeedResult = {
  dataFeed: IBasicDataFeed;
};

export type GroupedOrderHistory = {
  [date: string]: OrderHistory[];
};

export type ChartFeed = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
