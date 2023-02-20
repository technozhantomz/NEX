import Highcharts from "highcharts";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { useMarketContext } from "../../../../../common/providers";
import { MarketOrder } from "../../../../../common/types";
import { options } from "../DepthChartOptions";

import {
  DepthChartData,
  DepthData,
  UseDepthChartResult,
} from "./useDepthChart.types";

export function useDepthChart(): UseDepthChartResult {
  const [depthChartData, setDepthChartData] = useState<DepthChartData>({
    asks: [] as DepthData[],
    bids: [] as DepthData[],
  });
  const [depthChartOptions, setDepthChartOptions] =
    useState<Highcharts.Options>(options);
  const [depthChartSeries, setDepthChartSeries] = useState<
    Highcharts.SeriesAreaOptions[]
  >(depthChartOptions.series as Highcharts.SeriesAreaOptions[]);
  const { asks, bids } = useMarketContext();

  const sortOrders = useCallback((a: MarketOrder, b: MarketOrder) => {
    if (Number(a.quote) - Number(b.quote) !== 0) {
      return Number(a.quote) - Number(b.quote);
    }
    return Number(a.base) - Number(b.base);
  }, []);

  const formDepthChartData = useCallback(() => {
    //sort quote and base
    if (!asks || !bids) return;
    const clonedAsks = cloneDeep(asks);
    const clonedBids = cloneDeep(bids);
    clonedAsks.sort(sortOrders);
    clonedBids.sort(sortOrders);
    const depthChartAsks = clonedAsks.map(
      (row) => [Number(row.quote), Number(row.base)] as DepthData
    );
    const depthChartBids = clonedBids.map(
      (row) => [Number(row.quote), Number(row.base)] as DepthData
    );

    setDepthChartData({ asks: depthChartAsks, bids: depthChartBids });
  }, [asks, bids, sortOrders]);

  useEffect(() => {
    formDepthChartData();
  }, [asks, bids, formDepthChartData]);

  useEffect(() => {
    setDepthChartSeries((prevDepthChartSeries) => {
      const updatedDepthChartSeries = [...prevDepthChartSeries];
      updatedDepthChartSeries[0].data = depthChartData.bids;
      updatedDepthChartSeries[1].data = depthChartData.asks;
      return updatedDepthChartSeries;
    });
  }, [depthChartData]);

  useEffect(() => {
    setDepthChartOptions((prevDepthChartOptions) => {
      const updatedDepthChartOptions = { ...prevDepthChartOptions };
      updatedDepthChartOptions.series = depthChartSeries;
      return updatedDepthChartOptions;
    });
  }, [depthChartSeries]);

  return { depthChartData, depthChartOptions };
}
