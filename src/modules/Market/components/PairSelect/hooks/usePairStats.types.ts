export type UsePairStatsResult = {
  latest: number;
  change: number;
  volume: number;
};

export type Ticker = {
  base: string;
  base_volume: string;
  highest_bid: string;
  latest: string;
  lowest_ask: string;
  percent_change: string;
  quote: string;
  quote_volume: string;
};
