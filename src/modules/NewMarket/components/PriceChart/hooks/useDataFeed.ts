import {
  DatafeedConfiguration,
  IBasicDataFeed,
} from "../../../../../../public/static/charting_library/charting_library";
import { defaultToken } from "../../../../../api/params";
import { useAsset } from "../../../../../common/hooks";

import { generateSymbol } from "./helpers";
import { ExchangeSymbols, UseDataFeedResult } from "./useDataFeed.types";

export function useDataFeed(): UseDataFeedResult {
  const { getAllAssets } = useAsset();
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
        // `exchange` argument for the `searchSymbols` method, if a user selects this exchange
        value: "PeerplaysDex",

        // filter name
        name: "PeerplaysDex",

        // full exchange name displayed in the filter popup
        desc: "PeerPlays Decentralized Exchange",
      },
    ],
    symbols_types: [
      {
        name: "crypto",
        // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
        value: "crypto",
      },
      // ...
    ],
  };

  const getAllSymbols = async () => {
    let allSymbols = [];
    const allAssets = await getAllAssets();
    //const allAssets = [{ symbol: "BTC" }, { symbol: "HIVE" }];

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

  const dataFeed: IBasicDataFeed = {
    onReady: (callback) => {
      console.log("[onReady]: Method call");
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
      console.log("[searchSymbols]: Method call");
      const symbols = await getAllSymbols();
      const newSymbols = symbols.filter((symbol) => {
        const isExchangeValid = exchange === "" || symbol.exchange === exchange;
        const isFullSymbolContainsInput =
          symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !==
          -1;
        return isExchangeValid && isFullSymbolContainsInput;
      });
      onResultReadyCallback(newSymbols);
    },
    resolveSymbol: async (
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback,
      extension
    ) => {
      console.log("[resolveSymbol]: Method call", symbolName);
      console.log("[resolveSymbol]: data", {
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
        extension,
      });
      const symbols = await getAllSymbols();
      const symbolItem = symbols.find(
        ({ full_name }) => full_name === symbolName
      );
      if (!symbolItem) {
        console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
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

      console.log("[resolveSymbol]: Symbol resolved", symbolName);
      onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (
      symbolInfo,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback
    ) => {
      const { from, to, firstDataRequest } = periodParams;
      console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
      // const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
      // const urlParameters = {
      //   e: parsedSymbol.exchange,
      //   fsym: parsedSymbol.fromSymbol,
      //   tsym: parsedSymbol.toSymbol,
      //   toTs: to,
      //   limit: 2000,
      // };
      // const query = Object.keys(urlParameters)
      //   .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      //   .join("&");
      try {
        //   const data = await makeApiRequest(`data/histoday?${query}`);
        //   if (
        //     (data.Response && data.Response === "Error") ||
        //     data.Data.length === 0
        //   ) {
        //     // "noData" should be set if there is no data in the requested period.
        //     onHistoryCallback([], {
        //       noData: true,
        //     });
        //     return;
        //   }
        const data = [
          {
            time: "2022-09-07",
            open: 0.1,
            close: 0.1,
            high: 0.1,
            low: 0.1,
          },
          {
            time: "2022-09-12",
            open: 0.001,
            close: 0.001,
            high: 0.001,
            low: 0.001,
          },
          {
            time: "2022-09-13",
            open: 0.4713469,
            close: 0.5286531,
            high: 0.5286531,
            low: 0.4713469,
          },
          {
            time: "2022-09-14",
            open: 0.0001,
            close: 0.001,
            high: 0.001,
            low: 0.0001,
          },
          {
            time: "2022-09-15",
            open: 0.00001,
            close: 0.1,
            high: 0.1,
            low: 0.000001,
          },
          {
            time: "2022-09-28",
            open: 0.0000011,
            close: 0.0000011,
            high: 0.0000011,
            low: 0.0000011,
          },
          {
            time: "2022-10-02",
            open: 0.0001,
            close: 0.000003,
            high: 0.0001,
            low: 0.000003,
          },
          {
            time: "2022-10-04",
            open: 0.00013247,
            close: 0.00013247,
            high: 0.00013247,
            low: 0.00013247,
          },
          {
            time: "2022-10-10",
            open: 0.000011,
            close: 0.000958,
            high: 0.000958,
            low: 0.000011,
          },
          {
            time: "2022-10-11",
            open: 0.000013,
            close: 0.00096,
            high: 0.00096,
            low: 0.000013,
          },
          {
            time: "2022-10-19",
            open: 0.000002,
            close: 0.00012,
            high: 0.00012,
            low: 0.000002,
          },
          {
            time: "2022-10-26",
            open: 0.0001,
            close: 0.0000044,
            high: 0.0001,
            low: 0.000002,
          },
          {
            time: "2022-10-27",
            open: 0.0001,
            close: 0.00001,
            high: 0.0001,
            low: 0.00001,
          },
          {
            time: "2022-10-28",
            open: 0.4705569,
            close: 0.4284431,
            high: 1,
            low: 0.001,
          },
          {
            time: "2022-11-17",
            open: 0.000005,
            close: 0.000005,
            high: 0.000005,
            low: 0.000005,
          },
          {
            time: "2022-11-23",
            open: 0.1,
            close: 0.1,
            high: 0.1,
            low: 0.1,
          },
          {
            time: "2022-11-30",
            open: 0.000005,
            close: 0.000005,
            high: 0.000005,
            low: 0.000005,
          },
          {
            time: "2022-12-03",
            open: 1,
            close: 1,
            high: 1,
            low: 1,
          },
          {
            time: "2022-12-07",
            open: 0.0001,
            close: 0.0001,
            high: 0.0001,
            low: 0.0001,
          },
          {
            time: "2022-12-20",
            open: 0.000001,
            close: 0.00002,
            high: 0.00002,
            low: 0.000001,
          },
          {
            time: "2022-12-22",
            open: 3e-7,
            close: 3e-7,
            high: 3e-7,
            low: 3e-7,
          },
          {
            time: "2022-12-23",
            open: 3e-7,
            close: 3e-7,
            high: 3e-7,
            low: 3e-7,
          },
          {
            time: "2023-01-17",
            open: 1,
            close: 1,
            high: 1,
            low: 1,
          },
          {
            time: "2023-01-19",
            open: 1,
            close: 1,
            high: 1,
            low: 1,
          },
        ];
        let bars = [];
        data.forEach((bar) => {
          if (
            new Date(bar.time).getTime() >= from &&
            new Date(bar.time).getTime() < to
          ) {
            bars = [
              ...bars,
              {
                time: bar.time * 1000,
                low: bar.low,
                high: bar.high,
                open: bar.open,
                close: bar.close,
              },
            ];
          }
        });
        console.log("bars", bars);
        if (firstDataRequest) {
          lastBarsCache.set(symbolInfo.full_name, {
            ...bars[bars.length - 1],
          });
        }
        console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onHistoryCallback(bars, {
          noData: false,
        });
      } catch (error) {
        console.log("[getBars]: Get error", error);
        onErrorCallback(error);
      }
    },
    // subscribeBars: (
    //   symbolInfo,
    //   resolution,
    //   onRealtimeCallback,
    //   subscriberUID,
    //   onResetCacheNeededCallback
    // ) => {
    //   console.log(
    //     "[subscribeBars]: Method call with subscriberUID:",
    //     subscriberUID
    //   );
    //   // subscribeOnStream(
    //   //   symbolInfo,
    //   //   resolution,
    //   //   onRealtimeCallback,
    //   //   subscriberUID,
    //   //   onResetCacheNeededCallback,
    //   //   lastBarsCache.get(symbolInfo.full_name)
    //   // );
    // },
    // unsubscribeBars: (subscriberUID) => {
    //   console.log(
    //     "[unsubscribeBars]: Method call with subscriberUID:",
    //     subscriberUID
    //   );
    //   // unsubscribeFromStream(subscriberUID);
    // },
  };
  return { dataFeed };
}
