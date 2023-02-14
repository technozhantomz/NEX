import { cloneDeep } from "lodash";
import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import {
  Asset,
  BlockHeader,
  History,
  LimitOrder,
  MarketHistory,
  MarketPair,
  OrderHistory,
  Ticker,
  TradeHistoryRow,
} from "../../types";
import { useAsset } from "../asset";
import { useBlockchain } from "../blockchain";
import { useFormDate } from "../utils";

import { UseMarketHistoryResult } from "./useMarketHistory.types";

export function useMarketHistory(): UseMarketHistoryResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();
  const { getBlockHeader } = useBlockchain();
  const { setPrecision, ceilPrecision } = useAsset();
  const { formLocalDate } = useFormDate();

  const getMarketHistoryBuckets = useCallback(async () => {
    try {
      const buckets: number[] = await historyApi(
        "get_market_history_buckets",
        []
      );
      return buckets;
    } catch (e) {
      console.log(e);
    }
  }, [historyApi]);

  const getFillOrderHistory = useCallback(
    async (selectedPair: MarketPair, limit = 100) => {
      try {
        const histories: OrderHistory[] = await historyApi(
          "get_fill_order_history",
          [selectedPair.base.id, selectedPair.quote.id, limit]
        );
        return histories;
      } catch (e) {
        console.log(e);
      }
    },
    [historyApi]
  );

  const getTicker = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        const ticker: Ticker = await dbApi("get_ticker", [
          base.symbol,
          quote.symbol,
        ]);
        return ticker;
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const formTradeHistoryRow = useCallback(
    async (
      history: OrderHistory | History,
      selectedPair: MarketPair,
      forUser: boolean,
      openOrder?: LimitOrder
    ): Promise<TradeHistoryRow> => {
      const base = selectedPair.base;
      const quote = selectedPair.quote;
      const blockHeader = await getBlockHeader((history as History).block_num);
      const timestamp = forUser
        ? (blockHeader as BlockHeader).timestamp
        : (history as OrderHistory).time;
      const time = formLocalDate(timestamp, ["month", "date", "year", "time"]);
      const { pays, receives } = forUser
        ? (history as History).op[1]
        : (history as OrderHistory).op;
      const key = history.id;
      let numberedFilled = 100;
      let filled = "";
      let baseAmount = 0,
        quoteAmount = 0,
        isBuyOrder = false;
      // this is buy orders
      if (pays.asset_id === base.id) {
        baseAmount = setPrecision(false, pays.amount, base.precision);
        quoteAmount = setPrecision(false, receives.amount, quote.precision);
        isBuyOrder = true;
        //this is sell orders
      } else {
        baseAmount = setPrecision(false, receives.amount, base.precision);
        quoteAmount = setPrecision(false, pays.amount, quote.precision);
      }

      if (forUser) {
        if (openOrder) {
          numberedFilled =
            (pays.amount / openOrder.sell_price.base.amount) * 100;
          filled = `${numberedFilled.toFixed(1)}%`;
        } else {
          filled = "100%";
        }
      }

      return {
        key,
        price: (baseAmount / quoteAmount).toFixed(base.precision),
        amount: quoteAmount,
        time,
        isBuyOrder,
        filled: forUser ? filled : undefined,
      } as TradeHistoryRow;
    },
    [setPrecision, formLocalDate, ceilPrecision]
  );

  const defineHistoryPriceMovement = useCallback(
    (tradeHistoryRows: TradeHistoryRow[]) => {
      const updatedTradeHistoryRows = cloneDeep(tradeHistoryRows);
      for (let i = updatedTradeHistoryRows.length - 1; i >= 0; i--) {
        const historyRow = updatedTradeHistoryRows[i];
        for (let j = i - 1; j >= 0; j--) {
          if (historyRow.isBuyOrder === updatedTradeHistoryRows[j].isBuyOrder) {
            if (
              Number(historyRow.price) !==
              Number(updatedTradeHistoryRows[j].price)
            ) {
              const isPriceUp =
                Number(updatedTradeHistoryRows[j].price) >
                Number(historyRow.price);
              updatedTradeHistoryRows[j].isPriceUp = isPriceUp;
            }
            break;
          }
        }
      }
      return updatedTradeHistoryRows;
    },
    []
  );

  const formTradeHistoryTableRows = useCallback(
    async (selectedPair: MarketPair, marketHistory: OrderHistory[]) => {
      try {
        const tradeHistoryRows = await Promise.all(
          marketHistory.map((history) => {
            return formTradeHistoryRow(history, selectedPair, false);
          })
        );
        const updatedTradeHistoryRows =
          defineHistoryPriceMovement(tradeHistoryRows);
        return updatedTradeHistoryRows;
      } catch (e) {
        console.log(e);
      }
    },
    [formTradeHistoryRow, defineHistoryPriceMovement]
  );

  /**
   * Get OHLCV data of a trading pair in a time range.
   *
   * @param firstAssetSymbolOrId Asset symbol or ID in a trading pair
   * @param secondAssetSymbolOrId The other asset symbol or ID in the trading pair
   * @param bucketSize Length of each time bucket in seconds.
   * Note: it need to be within result of get_market_history_buckets() API, otherwise no data will be returne
   * @param start The start of a time range, E.G. “2018-01-01T00:00:00”
   * @param end The end of the time range
   *
   * @returns A list of OHLCV data, in “least recent first” order. If there are more than 200 records in the specified time
   *  range, the first 200 records will be returned.
   */
  const getMarketHistory = useCallback(
    async (
      firstAssetSymbolOrId: string,
      secondAssetSymbolOrId: string,
      bucketSize: number,
      start: string,
      end: string
    ) => {
      try {
        const OHLCVs: MarketHistory[] = await historyApi("get_market_history", [
          firstAssetSymbolOrId,
          secondAssetSymbolOrId,
          bucketSize,
          start,
          end,
        ]);
        return OHLCVs;
      } catch (e) {
        console.log(e);
      }
    },
    [historyApi]
  );

  return {
    getFillOrderHistory,
    getTicker,
    formTradeHistoryTableRows,
    formTradeHistoryRow,
    getMarketHistoryBuckets,
    getMarketHistory,
  };
}
