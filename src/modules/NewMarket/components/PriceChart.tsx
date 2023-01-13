import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const PriceChart = (): JSX.Element => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 1000,
        height: 600,
        layout: {
          textColor: "black",
          background: { type: "solid", color: "white" },
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
        },

        rightPriceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        wickDownColor: "#ef5350",
        wickUpColor: "#26a69a",
        borderVisible: false,
      });

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
      ]);

      return () => {
        chart.remove();
      };
    }
  }, []);

  return <div ref={chartContainerRef} />;
};
