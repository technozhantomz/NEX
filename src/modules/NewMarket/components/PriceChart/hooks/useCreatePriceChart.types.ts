import { RefObject } from "react";

export type UseCreatePriceChartResult = {
  chartContainerRef: RefObject<HTMLDivElement>;
};

export type ChartFeed = {
  time: string;
  // value: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
