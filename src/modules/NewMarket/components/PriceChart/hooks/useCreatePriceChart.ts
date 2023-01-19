import { createChart, CrosshairMode } from "lightweight-charts";
// import { uniqBy } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAsset, useMarketHistory } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { OrderHistory } from "../../../../../common/types";

import {
  ChartFeed,
  UseCreatePriceChartResult,
} from "./useCreatePriceChart.types";

interface GroupedOrderHistory {
  [date: string]: OrderHistory[];
}

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
        selectedPair.base,
        selectedPair.quote
      )) as OrderHistory[];
      if (histories) {
        const sortedHistoriesByDate = histories.sort((a, b) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        });
        const groupedHistories: GroupedOrderHistory[] =
          sortedHistoriesByDate.reduce((accumulator, order) => {
            const key = order.time.substring(0, order.time.indexOf("T"));
            if (!accumulator[key]) {
              accumulator[key] = [];
            }
            accumulator[key].push(order);
            return accumulator;
          }, []);

        const processedOrders = Object.keys(groupedHistories).map((date) => {
          const group = groupedHistories[date];
          const open = getOrderAmmount(group[0]);
          const close = getOrderAmmount(group[group.length - 1]);
          const high = Math.max(
            ...group.map((order: OrderHistory) => {
              return getOrderAmmount(order);
            })
          );
          const low = Math.min(
            ...group.map((order: OrderHistory) => {
              return getOrderAmmount(order);
            })
          );
          return Object.assign({
            time: date,
            open,
            close,
            high,
            low,
          });
        });

        setChartFeed(processedOrders);
      }
    }
  }, [selectedPair]);

  const getOrderAmmount = useCallback(
    (order: OrderHistory) => {
      if (selectedPair) {
        let orderAmmount;
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
        return orderAmmount;
      }
    },
    [selectedPair]
  );

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
