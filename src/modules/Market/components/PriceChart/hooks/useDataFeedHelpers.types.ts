export type ExchangeSymbol = {
  short: string;
  full: string;
};

export type ExchangeSymbols = {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  type: string;
};

export type ChartFeed = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type UseDataFeedHelpersResult = {
  getAllSymbols: () => Promise<ExchangeSymbols[]>;
  getChartFeed: () => Promise<ChartFeed[] | undefined>;
};
