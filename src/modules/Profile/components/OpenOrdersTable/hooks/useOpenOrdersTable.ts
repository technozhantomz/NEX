import { useCallback, useEffect, useState } from "react";

import { useAccount, useFormDate } from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import {
  createOpenOrdersColumns,
  OpenOrdersColumnType,
} from "../../OpenOrdersColumns";

import {
  OpenOrdersTableRow,
  UseOpenOrdersTabResult,
} from "./useOpenOrdersTable.types";

export function useOpenOrdersTable(): UseOpenOrdersTabResult {
  const [openOrdersTableRows, setOpenOrdersTableRows] = useState<
    OpenOrdersTableRow[]
  >([]);
  const [openOrdersColumns, setOpenOrdersColumns] = useState<
    OpenOrdersColumnType[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { localStorageAccount } = useUserContext();
  const { formLocalDate } = useFormDate();
  const { getFullAccount } = useAccount();

  const getUserOrderBook = useCallback(async () => {
    try {
      setLoading(false);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      if (fullAccount !== undefined) {
        const limitOrders = fullAccount.limit_orders;

        const openOrders = limitOrders.map((orders) => {
          const expiration = formLocalDate(orders.expiration, [
            "date",
            "month",
            "year",
            "time",
          ]);
          return {
            key: orders.id,
            date: expiration,
            pair: "pair",
            type: "type",
            side: "side",
            price: "price",
            amount: "amount",
            filled: "filled",
            total: "total",
            statusActions: "statusActions",
          };
        });
        console.log(limitOrders);
        const updatedColumns = createOpenOrdersColumns.map((column) => {
          return { ...column };
        });
        setOpenOrdersColumns(updatedColumns);
        setOpenOrdersTableRows(openOrders);
        setLoading(false);
      } else {
        setOpenOrdersTableRows([]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    getFullAccount,
    setOpenOrdersTableRows,
    setLoading,
    setOpenOrdersColumns,
  ]);

  useEffect(() => {
    getUserOrderBook();
  }, [getUserOrderBook]);

  return {
    loading,
    openOrdersColumns,
    openOrdersTableRows,
  };
}
