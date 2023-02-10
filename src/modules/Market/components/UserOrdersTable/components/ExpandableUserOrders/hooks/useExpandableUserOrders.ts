import { cloneDeep } from "lodash";
import { useCallback, useMemo, useState } from "react";

import { UserOrderColumnType } from "../../../../../../../common/components";
import { TransactionMessageState } from "../../../../../../../common/hooks";
import { useUserContext } from "../../../../../../../common/providers";
import { OrderTableRow } from "../../../../../../../common/types";
import { useUserOrdersTable } from "../../../hooks";

type UseExpandableUserOrdersResult = {
  loadingOpenOrders: boolean;
  loadingHistoryOrders: boolean;
  selectedOrderId: string;
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  transactionMessageState: TransactionMessageState;
  cancelOrderFeeAmount: number;
  hidePasswordModal: () => void;
  handleCancelLimitOrderFinish: (name: string, info: any) => void;
  hideTransactionModal: () => void;
  onCancelClick: (orderId: string) => void;
  localStorageAccount: string;
  ordersRows: OrderTableRow[];
  defineTableRowClassName: (record: any) => "buy" | "sell";
  pairs: string[];
  selectedPair: string;
  onPairFilter: (value: any) => void;
  selectedStatus: "all-statuses" | "open" | "completed" | "partial";
  onStatusFilter: (value: any) => void;
};
export function useExpandableUserOrders(): UseExpandableUserOrdersResult {
  const {
    loading: loadingOpenOrders,
    userOrdersRows: userOpenOrderRows,
    userOrdersColumns: userOpenOrdersColumns,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    transactionMessageState,
    cancelOrderFeeAmount,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    onCancelClick,
    defineTableRowClassName,
  } = useUserOrdersTable(true);
  const {
    loading: loadingHistoryOrders,
    userOrdersRows: userHistoryOrderRows,
    userOrdersColumns: userHistoryColumns,
  } = useUserOrdersTable(false);
  const { localStorageAccount } = useUserContext();

  const [selectedPair, setSelectedPair] = useState<string>("all-pairs");
  const [selectedStatus, setSelectedStatus] = useState<
    "all-statuses" | "open" | "completed" | "partial"
  >("all-statuses");

  const pairs = useMemo(() => {
    const historyPairColumn = userHistoryColumns.find(
      (col) => col.dataIndex === "pair"
    ) as UserOrderColumnType;
    const openOrdersPairColumn = userOpenOrdersColumns.find(
      (col) => col.dataIndex === "pair"
    ) as UserOrderColumnType;
    if (historyPairColumn && openOrdersPairColumn) {
      const availablePairs = [
        ...(
          historyPairColumn.filters as {
            text: string;
            value: string;
          }[]
        ).map((filter) => filter.text),
        ...(
          openOrdersPairColumn.filters as {
            text: string;
            value: string;
          }[]
        ).map((filter) => filter.text),
      ];
      const uniquePairs = availablePairs.filter((element, index) => {
        return availablePairs.indexOf(element) === index;
      });
      return uniquePairs;
    } else {
      return [];
    }
  }, [userHistoryColumns, userOpenOrdersColumns]);

  const onPairFilter = useCallback(
    (value: any) => {
      setSelectedPair(value);
    },
    [setSelectedPair]
  );

  const onStatusFilter = useCallback(
    (value: any) => {
      setSelectedStatus(value);
    },
    [setSelectedStatus]
  );

  const ordersRows = useMemo(() => {
    let filteredOpenOrderRows = cloneDeep(userOpenOrderRows);
    let filteredHistoryRows = cloneDeep(userHistoryOrderRows);
    if (selectedPair !== "all-pairs") {
      filteredOpenOrderRows = filteredOpenOrderRows.filter(
        (row) => row.pair === selectedPair
      );
      filteredHistoryRows = filteredHistoryRows.filter(
        (row) => row.pair === selectedPair
      );
    }
    if (selectedStatus !== "all-statuses") {
      if (selectedStatus === "open") {
        filteredHistoryRows = [];
      } else if (selectedStatus === "completed") {
        filteredOpenOrderRows = [];
        filteredHistoryRows = filteredHistoryRows.filter(
          (row) => row.filled === "100%"
        );
      } else if (selectedStatus === "partial") {
        filteredOpenOrderRows = filteredOpenOrderRows.filter(
          (row) => row.filled !== "100%"
        );
        filteredHistoryRows = filteredHistoryRows.filter(
          (row) => row.filled !== "100%"
        );
      }
    }
    return filteredOpenOrderRows.concat(filteredHistoryRows);
  }, [selectedPair, selectedStatus, userOpenOrderRows, userHistoryOrderRows]);

  return {
    loadingOpenOrders,
    loadingHistoryOrders,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    transactionMessageState,
    cancelOrderFeeAmount,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    onCancelClick,
    localStorageAccount,
    ordersRows,
    defineTableRowClassName,
    pairs,
    selectedPair,
    onPairFilter,
    selectedStatus,
    onStatusFilter,
  };
}
