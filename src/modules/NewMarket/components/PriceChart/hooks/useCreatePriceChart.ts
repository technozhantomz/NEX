import { createChart, CrosshairMode } from "lightweight-charts";
import { uniqBy } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAsset, useMarketHistory } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { OrderHistory } from "../../../../../common/types";

import {
  ChartFeed,
  UseCreatePriceChartResult,
} from "./useCreatePriceChart.types";

export function useCreatePriceChart(): UseCreatePriceChartResult {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { selectedPair } = useMarketContext();
  const { getFillOrderHistory } = useMarketHistory();
  const { setPrecision } = useAsset();
  // const { formLocalDate } = useFormDate();
  const [chartFeed, setChartFeed] = useState<ChartFeed[]>([]);

  const getChartFeed = useCallback(async () => {
    if (selectedPair) {
      const histories = (await getFillOrderHistory(
        selectedPair
      )) as OrderHistory[];
      if (histories) {
        const sortedHistoriesByDate = histories.sort((a, b) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        });
        const charData = await Promise.all(
          sortedHistoriesByDate.map((order) => {
            let orderAmmount;
            //TODO: do not use data string get all orders for the data and map that to get the open, close, high, low values
            const dataString = order.time.substring(0, order.time.indexOf("T")); // hack for now needto clean up
            const orderOps = order.op;
            const base = selectedPair.base;
            if (orderOps.pays.asset_id === base.id) {
              orderAmmount = setPrecision(
                false,
                orderOps.pays.amount,
                base.precision
              );
              //this is buy orders
            } else {
              orderAmmount = setPrecision(
                false,
                orderOps.receives.amount,
                base.precision
              );
            }
            return {
              time: dataString,
              // value: orderAmmount,
              open: orderAmmount,
              high: orderAmmount,
              low: orderAmmount,
              close: orderAmmount,
            };
          })
        );
        console.log(charData);
        setChartFeed(uniqBy(charData, "time"));
      }
    }
  }, [selectedPair]);

  useEffect(() => {
    if (chartFeed.length > 0) {
      if (chartContainerRef.current) {
        const chart = createChart(chartContainerRef.current, {
          width: 500,
          height: 524,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
        });
        const candleSeries = chart.addCandlestickSeries();
        console.log(chartFeed);
        candleSeries.setData(chartFeed);
        return () => {
          chart.remove();
        };
      }
    } else {
      getChartFeed();
    }
  }, [chartFeed]);
  return { chartContainerRef };
}
