import { createChart, CrosshairMode } from "lightweight-charts";
import { useCallback, useEffect, useRef, useState } from "react";

// import {
//   IChartingLibraryWidget,
//   widget,
// } from "../../../../../../public/static/charting_library";
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

declare global {
  interface Window {
    Datafeeds: any;
  }
}

export function useCreatePriceChart(): UseCreatePriceChartResult {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const lightweightContainerRef = useRef<HTMLDivElement>(null);
  const { selectedPair } = useMarketContext();
  const { getFillOrderHistory } = useMarketHistory();
  const { setPrecision } = useAsset();
  const [chartFeed, setChartFeed] = useState<ChartFeed[]>([]);

  // const defaultProps = {
  //   symbol: "AAPL",
  //   interval: "D",
  //   datafeedUrl: "https://demo_feed.tradingview.com",
  //   libraryPath: "/static/charting_library/",
  //   chartsStorageUrl: "https://saveload.tradingview.com",
  //   chartsStorageApiVersion: "1.1",
  //   clientId: "tradingview.com",
  //   userId: "public_user_id",
  //   fullscreen: false,
  //   autosize: true,
  //   studiesOverrides: {},
  // };

  // let tvWidget1: IChartingLibraryWidget | null = null;

  const getChartFeed = useCallback(async () => {
    if (selectedPair) {
      const histories = (await getFillOrderHistory(
        selectedPair
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

  // useEffect(() => {
  //   if (chartContainerRef.current) {
  //     const widgetOptions = {
  //       symbol: defaultProps.symbol,
  //       // BEWARE: no trailing slash is expected in feed URL
  //       datafeedUrl: new window.Datafeeds.UDFCompatibleDatafeed(
  //         "https://demo_feed.tradingview.com"
  //       ),
  //       interval: defaultProps.interval,
  //       container: chartContainerRef.current,
  //       library_path: defaultProps.libraryPath,

  //       locale: "en",
  //       disabled_features: ["use_localstorage_for_settings"],
  //       enabled_features: ["study_templates"],
  //       charts_storage_url: defaultProps.chartsStorageUrl,
  //       charts_storage_api_version: defaultProps.chartsStorageApiVersion,
  //       client_id: defaultProps.clientId,
  //       user_id: defaultProps.userId,
  //       fullscreen: defaultProps.fullscreen,
  //       autosize: defaultProps.autosize,
  //       studies_overrides: defaultProps.studiesOverrides,
  //     };

  //     const tvWidget = new widget(widgetOptions);
  //     tvWidget1 = tvWidget;

  //     tvWidget.onChartReady(() => {
  //       tvWidget.headerReady().then(() => {
  //         const button = tvWidget.createButton();
  //         button.setAttribute("title", "Click to show a notification popup");
  //         button.classList.add("apply-common-tooltip");
  //         button.addEventListener("click", () =>
  //           tvWidget.showNoticeDialog({
  //             title: "Notification",
  //             body: "TradingView Charting Library API works correctly",
  //             callback: () => {
  //               console.log("Noticed!");
  //             },
  //           })
  //         );

  //         button.innerHTML = "Check API";
  //       });
  //     });
  //   }

  //   return () => {
  //     if (tvWidget1 !== null) {
  //       tvWidget1.remove();
  //       tvWidget1 = null;
  //     }
  //   };
  // }, []);

  // lightweight-charts needs to be removed
  useEffect(() => {
    if (chartFeed.length > 0) {
      if (lightweightContainerRef.current) {
        const chart = createChart(lightweightContainerRef.current, {
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
