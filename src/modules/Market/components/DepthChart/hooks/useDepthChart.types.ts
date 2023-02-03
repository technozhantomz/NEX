import Highcharts from "highcharts";

export type DepthData = [quote: number, base: number];

export type DepthChartData = {
  asks: DepthData[];
  bids: DepthData[];
};

export type UseDepthChartResult = {
  depthChartData: DepthChartData;
  depthChartOptions: Highcharts.Options;
};
