import { useCallback } from "react";

import {
  DatafeedConfiguration,
  IBasicDataFeed,
  LibrarySymbolInfo,
  SearchSymbolResultItem,
} from "../../../../../../public/static/charting_library/charting_library";
import { defaultToken } from "../../../../../api/params";
import { useAsset, useMarketHistory } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { OrderHistory } from "../../../../../common/types";

import { generateSymbol } from "./helpers";
import {
  ChartFeed,
  ExchangeSymbols,
  GroupedOrderHistory,
  UseDataFeedResult,
} from "./useDataFeed.types";

export function useDataFeed(): UseDataFeedResult {
  const { getAllAssets } = useAsset();
  const { selectedPair } = useMarketContext();
  const { getFillOrderHistory } = useMarketHistory();
  const { setPrecision } = useAsset();
  const lastBarsCache = new Map();

  const configurationData = {
    supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"],
    supports_search: false,
    supports_group_request: false,
    supports_marks: true,
    supports_timescale_marks: true,
    supports_time: true,
    exchanges: [
      {
        value: "PeerplaysDex",
        name: "PeerplaysDex",
        desc: "PeerplaysDex",
      },
      {
        value: "PeerplaysDex",
        name: "PeerplaysDex",
        desc: "PeerPlays Decentralized Exchange",
      },
    ],
    symbols_types: [
      {
        name: "crypto",
        value: "crypto",
      },
    ],
  };

  const getAllSymbols = async () => {
    let allSymbols = [];
    const allAssets = await getAllAssets();
    const symbols = allAssets?.map((asset) => {
      if (asset.symbol !== defaultToken) {
        const symbol = generateSymbol(
          "PeerplaysDex",
          defaultToken as string,
          asset.symbol
        );
        return {
          symbol: symbol.short,
          full_name: symbol.full,
          description: symbol.short,
          exchange: "PeerplaysDex",
          type: "crypto",
        };
      }
    });
    allSymbols = [...(symbols as ExchangeSymbols[])];
    return allSymbols;
  };

  const getChartFeed = useCallback(async () => {
    if (selectedPair) {
      const histories = (await getFillOrderHistory(
        selectedPair,
        10000
      )) as OrderHistory[];
      if (histories) {
        const sortedHistoriesByDate = histories.sort((a, b) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        });
        const groupedHistories: GroupedOrderHistory[] =
          sortedHistoriesByDate.reduce((accumulator, order) => {
            const key = order.time;
            if (!accumulator[key]) {
              accumulator[key] = [];
            }
            accumulator[key].push(order);
            return accumulator;
          }, []);
        const processedOrders = Object.keys(groupedHistories).map((date) => {
          const group = groupedHistories[date];
          const time = new Date(date).getTime();
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
            time,
            open,
            close,
            high,
            low,
          });
        });
        return processedOrders;
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

  const dataFeed: IBasicDataFeed = {
    onReady: (callback) => {
      // console.log("[onReady]: Method call");
      setTimeout(() =>
        callback(configurationData as unknown as DatafeedConfiguration)
      );
    },
    searchSymbols: async (
      userInput,
      exchange,
      _symbolType,
      onResultReadyCallback
    ) => {
      // console.log("[searchSymbols]: Method call");
      const symbols = await getAllSymbols();
      const newSymbols = symbols.filter((symbol) => {
        const isExchangeValid = exchange === "" || symbol.exchange === exchange;
        const isFullSymbolContainsInput =
          symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !==
          -1;
        return isExchangeValid && isFullSymbolContainsInput;
      });
      onResultReadyCallback(newSymbols as SearchSymbolResultItem[]);
    },
    resolveSymbol: async (
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback,
      _extension
    ) => {
      // console.log("[resolveSymbol]: Method call", symbolName);
      // console.log("[resolveSymbol]: data", {
      //   symbolName,
      //   onSymbolResolvedCallback,
      //   onResolveErrorCallback,
      //   extension,
      // });
      const symbols = await getAllSymbols();
      const symbolItem = symbols.find(
        ({ full_name }) => full_name === symbolName
      );
      if (!symbolItem) {
        // console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
        onResolveErrorCallback("cannot resolve symbol");
        return;
      }
      const symbolInfo = {
        ticker: symbolItem.full_name,
        name: symbolItem.symbol,
        description: symbolItem.description,
        type: symbolItem.type,
        session: "24x7",
        timezone: "Etc/UTC",
        exchange: symbolItem.exchange,
        minmov: 1,
        pricescale: 100,
        has_intraday: false,
        has_no_volume: true,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 2,
        data_status: "streaming",
      };

      // console.log("[resolveSymbol]: Symbol resolved", symbolName);
      onSymbolResolvedCallback(symbolInfo as LibrarySymbolInfo);
    },
    getBars: async (
      symbolInfo,
      _resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback
    ) => {
      const { from, to, firstDataRequest } = periodParams;
      // console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
      try {
        const data = (await getChartFeed()) as ChartFeed[];
        let bars: ChartFeed[] = [];
        data.forEach((bar) => {
          if (bar.time >= from * 1000 && bar.time < to * 1000) {
            bars = [
              ...bars,
              {
                time: bar.time,
                low: bar.low,
                high: bar.high,
                open: bar.open,
                close: bar.close,
              },
            ];
          }
        });
        if (firstDataRequest) {
          lastBarsCache.set(symbolInfo.full_name, {
            ...bars[bars.length - 1],
          });
        }
        // console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onHistoryCallback(bars, {
          noData: false,
        });
      } catch (error) {
        // console.log("[getBars]: Get error", error);
        onErrorCallback(error as string);
      }
    },
  };
  return { dataFeed };
}
