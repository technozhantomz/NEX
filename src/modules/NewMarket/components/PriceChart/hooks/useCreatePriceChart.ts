import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";

import { UseCreatePriceChartResult } from "./useCreatePriceChart.types";

export function useCreatePriceChart(): UseCreatePriceChartResult {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 700,
        height: 524,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });

      const candleSeries = chart.addCandlestickSeries();

      candleSeries.setData([
        {
          time: "2018-10-19",
          open: 180.34,
          high: 180.99,
          low: 178.57,
          close: 179.85,
        },
        {
          time: "2018-10-22",
          open: 180.82,
          high: 181.4,
          low: 177.56,
          close: 178.75,
        },
        {
          time: "2018-10-23",
          open: 175.77,
          high: 179.49,
          low: 175.44,
          close: 178.53,
        },
        {
          time: "2018-10-24",
          open: 178.58,
          high: 182.37,
          low: 176.31,
          close: 176.97,
        },
        {
          time: "2018-10-25",
          open: 177.52,
          high: 180.5,
          low: 176.83,
          close: 179.07,
        },
      ]);

      return () => {
        chart.remove();
      };
    }
  }, []);
  return { chartContainerRef };
}
