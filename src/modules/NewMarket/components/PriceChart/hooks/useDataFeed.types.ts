import { IBasicDataFeed } from "../../../../../../public/static/charting_library/charting_library";

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
