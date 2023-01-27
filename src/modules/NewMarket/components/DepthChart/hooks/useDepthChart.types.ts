import Highcharts from "highcharts";

// import { MarketOrder } from "../../../../../common/types";

export type DepthData = [quote: number, base: number];

export type DepthChartData = {
  asks: DepthData[];
  bids: DepthData[];
};

export type UseDepthChartResult = {
  depthChartData: DepthChartData;
  depthChartOptions: Highcharts.Options;
};
