import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useAccount,
  useAccountHistory,
  useMarketHistory,
} from "../../../../../common/hooks";
import {
  useMarketContext,
  useUserContext,
} from "../../../../../common/providers";
import { LimitOrder, TradeHistoryRow } from "../../../../../common/types";

import {
  TradeHistoryColumn,
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
  const { getHistoryTableRows, formTradeHistoryRows } = useMarketHistory();
  const { getAccountHistoryById } = useAccountHistory();
  const { getFullAccount } = useAccount();
  const [tradeHistoryRows, setTradeHistoryRows] = useState<TradeHistoryRow[]>(
    []
  );
  const [loadingTradeHistory, setLoadingTradeHistory] = useState<boolean>(true);

  const tradeHistoryColumns: TradeHistoryColumn[] = useMemo(() => {
    if (selectedPair) {
      const baseSymbol = selectedPair.base.symbol;
      const quoteSymbol = selectedPair.quote.symbol;
      return [
        {
          title: `${counterpart.translate("tableHead.price")} (${quoteSymbol})`,
          dataIndex: "price",
          key: "price",
          fixed: true,
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${baseSymbol})`,
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

  const getHistory = useCallback(async () => {
    setLoadingTradeHistory(true);
    if (selectedPair && marketHistory) {
      try {
        const marketHistoryRows =
          (await getHistoryTableRows()) as TradeHistoryRow[];

        setTradeHistoryRows(marketHistoryRows);
        setLoadingTradeHistory(false);
      } catch (e) {
        console.log(e);
        setLoadingTradeHistory(false);
      }
    }
  }, [marketHistory, setLoadingTradeHistory, setTradeHistoryRows]);

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
              return formTradeHistoryRows(
                fillOrderHistoryForThePair,
                selectedPair,
                forUser,
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
    forUser,
    id,
    localStorageAccount,
    getFullAccount,
    setLoadingTradeHistory,
    getAccountHistoryById,
    formTradeHistoryRows,
    setTradeHistoryRows,
  ]);

  const defineTableRowClassName = useCallback((record: any) => {
    const item = record as TradeHistoryRow;
    return item.isBuyOrder ? "buy" : "sell";
  }, []);

  useEffect(() => {
    forUser ? getUserHistory() : getHistory();
  }, [selectedPair]);

  return {
    tradeHistoryRows,
    tradeHistoryColumns,
    loadingTradeHistory,
    defineTableRowClassName,
  };
}
