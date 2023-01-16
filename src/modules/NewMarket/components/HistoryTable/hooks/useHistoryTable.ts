import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useAccount,
  useAccountHistory,
  useAsset,
  useBlockchain,
  useFormDate,
} from "../../../../../common/hooks";
import {
  useMarketContext,
  useUserContext,
} from "../../../../../common/providers";
import {
  Asset,
  BlockHeader,
  History,
  LimitOrder,
  OrderHistory,
} from "../../../../../common/types";

import {
  TradeHistoryColumn,
  TradeHistoryRow,
  UseHistoryTableResult,
} from "./useHistoryTable.types";

type Props = {
  forUser?: boolean;
};

export function useHistoryTable({
  forUser = false,
}: Props): UseHistoryTableResult {
  const { selectedPair, marketHistory } = useMarketContext();
  const { id, localStorageAccount } = useUserContext();
  const { getBlockHeader } = useBlockchain();
  const { getAccountHistoryById } = useAccountHistory();
  const { setPrecision, ceilPrecision } = useAsset();
  const { getFullAccount } = useAccount();
  const { formLocalDate } = useFormDate();
  const [tradeHistoryRows, setTradeHistoryRows] = useState<TradeHistoryRow[]>(
    []
  );
  const [loadingTradeHistory, setLoadingTradeHistory] = useState<boolean>(true);

  const tradeHistoryColumns: TradeHistoryColumn[] = useMemo(() => {
    if (selectedPair) {
      return [
        {
          title: `${counterpart.translate("tableHead.price")} (${
            selectedPair.quote.symbol
          })`,
          dataIndex: "price",
          key: "price",
          fixed: true,
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${
            selectedPair.base.symbol
          })`,
          dataIndex: "amount",
          key: "amount",
          fixed: true,
        },
        {
          title: counterpart.translate(`tableHead.time`),
          dataIndex: "time",
          key: "time",
          fixed: true,
        },
      ];
    } else {
      return [];
    }
  }, [selectedPair]);

  const formTradeHistoryRow = useCallback(
    async (
      history: OrderHistory | History,
      base: Asset,
      quote: Asset,
      openOrder?: LimitOrder
    ): Promise<TradeHistoryRow> => {
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

  const getHistory = useCallback(async () => {
    setLoadingTradeHistory(true);
    if (selectedPair && marketHistory) {
      try {
        const tradeHistoryRows = await Promise.all(
          marketHistory.map((history) => {
            return formTradeHistoryRow(
              history,
              selectedPair.base,
              selectedPair.quote
            );
          })
        );
        setTradeHistoryRows(tradeHistoryRows);
        setLoadingTradeHistory(false);
      } catch (e) {
        console.log(e);
        setLoadingTradeHistory(false);
      }
    }
  }, [
    marketHistory,
    setLoadingTradeHistory,
    formTradeHistoryRow,
    setTradeHistoryRows,
  ]);

  const getUserHistory = useCallback(async () => {
    if (selectedPair && id && id !== "") {
      try {
        setLoadingTradeHistory(true);
        const [fullAccount, userOperationsHistory] = await Promise.all([
          getFullAccount(localStorageAccount, false),
          getAccountHistoryById(id),
        ]);
        let limitOrders: LimitOrder[] = [];
        if (fullAccount) {
          limitOrders = fullAccount.limit_orders;
        }
        //const userOperationsHistory = await getAccountHistoryById(id);
        const fillOrdersHistory = userOperationsHistory.filter(
          (userOperationHistory) => userOperationHistory.op[0] === 4
        );
        const fillOrdersHistoryForThePair = fillOrdersHistory.filter(
          (fillOrderHistory) => {
            const pays = fillOrderHistory.op[1].pays;
            const receives = fillOrderHistory.op[1].receives;
            const orderAssetsIds = [pays.asset_id, receives.asset_id];
            return (
              orderAssetsIds.includes(selectedPair.base.id) &&
              orderAssetsIds.includes(selectedPair.quote.id)
            );
          }
        );
        const userHistoryRows = await Promise.all(
          fillOrdersHistoryForThePair.map(
            async (fillOrderHistoryForThePair) => {
              const operationDetails = fillOrderHistoryForThePair.op[1];
              return formTradeHistoryRow(
                fillOrderHistoryForThePair,
                selectedPair.base,
                selectedPair.quote,
                limitOrders.find(
                  (order) => order.id === operationDetails.order_id
                )
              );
            }
          )
        );
        setTradeHistoryRows(userHistoryRows);
        setLoadingTradeHistory(false);
      } catch (e) {
        console.log(e);
        setLoadingTradeHistory(false);
      }
    } else {
      setTradeHistoryRows([]);
      setLoadingTradeHistory(false);
    }
  }, [
    selectedPair,
    id,
    localStorageAccount,
    getFullAccount,
    setLoadingTradeHistory,
    getAccountHistoryById,
    formTradeHistoryRow,
    setTradeHistoryRows,
  ]);

  useEffect(() => {
    forUser ? getUserHistory() : getHistory();
  }, [selectedPair]);

  return {
    tradeHistoryRows,
    tradeHistoryColumns,
    loadingTradeHistory,
  };
}
