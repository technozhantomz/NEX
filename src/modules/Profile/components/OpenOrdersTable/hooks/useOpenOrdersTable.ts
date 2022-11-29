import { useCallback, useEffect, useState } from "react";

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

  const getOpenOrdersRow = useCallback(() => {
    try {
      if (localStorageAccount) {
        const openOrdersTableRows = {
          key: "key",
          date: "date",
          pair: "pair",
          type: "type",
          side: "side",
          price: "price",
          amount: "amount",
          filled: "filled",
          total: "total",
          statusActions: "statusActions",
        };

        const updatedColumns = createOpenOrdersColumns.map((column) => {
          return { ...column };
        });
        setOpenOrdersColumns(updatedColumns);
        setOpenOrdersTableRows(openOrdersTableRows);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [setOpenOrdersColumns, setLoading, setOpenOrdersTableRows]);

  useEffect(() => {
    getOpenOrdersRow();
  }, []);

  return {
    loading,
    openOrdersColumns,
    openOrdersTableRows,
  };
}
