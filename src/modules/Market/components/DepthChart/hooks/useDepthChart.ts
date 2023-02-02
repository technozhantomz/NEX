import Highcharts from "highcharts";
import { useCallback, useEffect, useState } from "react";

import { useMarketContext } from "../../../../../common/providers";
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

  const formDepthChartData = useCallback(() => {
    //sort quote and base
    if (!asks || !bids) return;
    const sortedAsks = asks
      .sort((a, b) => {
        if (parseFloat(a.quote) - parseFloat(b.quote) !== 0) {
          return parseFloat(a.quote) - parseFloat(b.quote);
        }
        return parseFloat(a.base) - parseFloat(b.base);
      })
      .map((row) => [Number(row.quote), Number(row.base)] as DepthData);
    const sortedBids = bids
      .sort((a, b) => {
        if (parseFloat(a.quote) - parseFloat(b.quote) !== 0) {
          return parseFloat(a.quote) - parseFloat(b.quote);
        }
        return parseFloat(a.base) - parseFloat(b.base);
      })
      .map((row) => [Number(row.quote), Number(row.base)] as DepthData);
    setDepthChartData({ asks: sortedAsks, bids: sortedBids });
  }, [asks, bids]);

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
