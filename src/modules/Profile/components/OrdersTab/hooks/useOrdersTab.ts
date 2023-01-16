import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import { UserOrderColumnType } from "../../../../../common/components";
import {
  TransactionMessageActionType,
  useAccount,
  useAccountOrders,
  useFees,
  useHandleTransactionForm,
  useOrderTransactionBuilder,
  useTransactionBuilder,
  useTransactionMessage,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { OrderTableRow, SignerKey } from "../../../../../common/types";

import { UseOrdersTabResult } from "./useOrdersTab.types";

export function useOrdersTab(): UseOrdersTabResult {
  const [openOrdersTableRows, setOpenOrdersTableRows] = useState<
    OrderTableRow[]
  >([]);
  const [openOrdersColumns, setOpenOrdersColumns] = useState<
    UserOrderColumnType[]
  >([]);
  const [ordersHistoriesTableRows, setOrdersHistoriesTableRows] = useState<
    OrderTableRow[]
  >([]);
  const [ordersHistoriesColumns, setOrdersHistoriesColumns] = useState<
    UserOrderColumnType[]
  >([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { localStorageAccount, id } = useUserContext();
  const { formAccountBalancesByName } = useAccount();
  const { buildTrx } = useTransactionBuilder();
  const { buildCancelLimitOrderTransaction } = useOrderTransactionBuilder();
  const { calculateCancelLimitOrderFee } = useFees();
  const { transactionMessageState, transactionMessageDispatch } =
    useTransactionMessage();
  const {
    getOrdersRows,
    updateOpenOrdersColumns,
    updateOrdersHistoriesColumns,
  } = useAccountOrders();

  const cancelOrderFeeAmount = useMemo(() => {
    const cancelLimitOrderFee = calculateCancelLimitOrderFee();
    if (cancelLimitOrderFee !== undefined) {
      return cancelLimitOrderFee;
    } else {
      return 0;
    }
  }, [calculateCancelLimitOrderFee]);

  const handleCancelLimitOrder = useCallback(
    async (signerKey: SignerKey) => {
      transactionMessageDispatch({
        type: TransactionMessageActionType.CLEAR,
      });

      const trx = buildCancelLimitOrderTransaction(selectedOrderId, id);
      let trxResult;
      try {
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADING,
        });
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (e) {
        console.log(e);
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        setSubmitted(true);
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_SUCCESS,
          message: counterpart.translate(`field.success.canceled_limit_order`, {
            selectedOrderId,
          }),
        });
      } else {
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
    },
    [
      transactionMessageDispatch,
      buildCancelLimitOrderTransaction,
      selectedOrderId,
      id,
      buildTrx,
      formAccountBalancesByName,
      localStorageAccount,
      setSubmitted,
    ]
  );

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleCancelLimitOrder,
    transactionMessageDispatch,
    neededKeyType: "active",
  });

  const onCancelClick = useCallback(
    (orderId: string) => {
      setSelectedOrderId(orderId.split(".")[2]);
      showPasswordModal();
    },
    [setSelectedOrderId, showPasswordModal]
  );

  useEffect(() => {
    let ignore = false;
    async function setOrdersRows() {
      if (id && localStorageAccount) {
        setLoading(true);
        const { openOrdersRows, historiesRows } = await getOrdersRows();
        if (!ignore) {
          const openOrdersColumns = updateOpenOrdersColumns(
            openOrdersRows,
            onCancelClick
          );
          const historyColumns = updateOrdersHistoriesColumns(historiesRows);
          setOpenOrdersTableRows(openOrdersRows);
          setOrdersHistoriesTableRows(historiesRows);
          setOpenOrdersColumns(openOrdersColumns);
          setOrdersHistoriesColumns(historyColumns);
          setLoading(false);
          setSubmitted(false);
        }
      }
    }
    setOrdersRows();
    return () => {
      ignore = true;
    };
  }, [id, localStorageAccount, submitted]);

  return {
    loading,
    openOrdersColumns,
    openOrdersTableRows,
    ordersHistoriesTableRows,
    ordersHistoriesColumns,
    transactionMessageState,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
    localStorageAccount,
    cancelOrderFeeAmount,
    onCancelClick,
  };
}
