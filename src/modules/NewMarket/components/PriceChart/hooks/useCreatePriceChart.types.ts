import { RefObject } from "react";

export type UseCreatePriceChartResult = {
  chartContainerRef?: RefObject<HTMLDivElement>;
  // lightweightContainerRef?: RefObject<HTMLDivElement>;
};

export type ChartFeed = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};
