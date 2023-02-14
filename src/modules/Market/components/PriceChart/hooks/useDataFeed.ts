import { filter } from "lodash";

import {
  DatafeedConfiguration,
  IBasicDataFeed,
  LibrarySymbolInfo,
  SearchSymbolResultItem,
} from "../../../../../../public/static/charting_library/charting_library";

import { UseDataFeedResult } from "./useDataFeed.types";
import { useDataFeedHelpers } from "./useDataFeedHelpers";
import { ChartFeed } from "./useDataFeedHelpers.types";

export function useDataFeed(): UseDataFeedResult {
  const { getAllSymbols, getChartFeed } = useDataFeedHelpers();
  const lastBarsCache = new Map();

  const configurationData = {
    supported_resolutions: ["D", "2D", "3D", "W", "2W", "3W", "M", "6M", "Y"],
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

  const dataFeed: IBasicDataFeed = {
    // This is chart --data-- configuration
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
    // This is chart --data-- configuration based on the pair (you can override onReady config)
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
      //   _extension,
      // });

      const symbols = await getAllSymbols();
      const symbolItem = filter(symbols, (symbol) => !!symbol).find(
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
      // console.log("[getBars]: Method call", symbolInfo, _resolution, from, to);
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
        console.log("[getBars]: Get error", error);
        onErrorCallback(error as string);
      }
    },
    subscribeBars: (
      _symbolInfo,
      _resolution,
      _onRealtimeCallback,
      _subscriberUID,
      _onResetCacheNeededCallback
    ) => {
      // console.log(
      //   "[subscribeBars]: Method call with subscriberUID:",
      //   symbolInfo,
      //   resolution,
      //   onRealtimeCallback,
      //   subscriberUID,
      //   onResetCacheNeededCallback
      // );
      // subscribeOnStream(
      //   symbolInfo,
      //   resolution,
      //   onRealtimeCallback,
      //   subscriberUID,
      //   onResetCacheNeededCallback,
      //   lastBarsCache.get(symbolInfo.full_name)
      // );
    },

    unsubscribeBars: (_subscriberUID) => {
      // console.log(
      //   "[unsubscribeBars]: Method call with subscriberUID:",
      //   subscriberUID
      // );
      // unsubscribeFromStream(subscriberUID);
    },
  };
  return { dataFeed };
}
