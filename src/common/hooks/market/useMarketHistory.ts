import { cloneDeep } from "lodash";
import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import {
  Asset,
  BlockHeader,
  History,
  LimitOrder,
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
      let numberdFilled = 100;
      let filled = "";
      let baseAmount = 0,
        quoteAmount = 0,
        isBuyOrder = false;
      // this is sell orders
      if (pays.asset_id === base.id) {
        baseAmount = setPrecision(false, pays.amount, base.precision);
        quoteAmount = setPrecision(false, receives.amount, quote.precision);
        //this is buy orders
      } else {
        baseAmount = setPrecision(false, receives.amount, base.precision);
        quoteAmount = setPrecision(false, pays.amount, quote.precision);
        isBuyOrder = true;
      }

      if (forUser) {
        if (openOrder) {
          numberdFilled =
            (pays.amount / openOrder.sell_price.base.amount) * 100;
          filled = `${numberdFilled.toFixed(1)}%`;
        } else {
          filled = "100%";
        }
      }

      return {
        key,
        price: ceilPrecision(quoteAmount / baseAmount),
        amount: baseAmount,
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

  return {
    getFillOrderHistory,
    getTicker,
    formTradeHistoryTableRows,
    formTradeHistoryRow,
  };
}
