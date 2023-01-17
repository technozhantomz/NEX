import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import { UserOrderColumnType } from "../../../../../common/components";
import {
  TransactionMessageActionType,
  TransactionMessageState,
  useAccount,
  useAccountOrders,
  useFees,
  useHandleTransactionForm,
  useOrderTransactionBuilder,
  useTransactionBuilder,
  useTransactionMessage,
} from "../../../../../common/hooks";
import {
  useMarketContext,
  useUserContext,
} from "../../../../../common/providers";
import { OrderTableRow, SignerKey } from "../../../../../common/types";

type UseUserOrdersTableResult = {
  loading: boolean;
  userOrdersRows: OrderTableRow[];
  userOrdersColumns: UserOrderColumnType[];
  selectedOrderId: string;
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  transactionMessageState: TransactionMessageState;
  cancelOrderFeeAmount: number;
  hidePasswordModal: () => void;
  handleCancelLimitOrderFinish: (name: string, info: any) => void;
  hideTransactionModal: () => void;
  defineTableRowClassName: (record: any) => "buy" | "sell";
};

export function useUserOrdersTable(isOpen: boolean): UseUserOrdersTableResult {
  const { id, localStorageAccount } = useUserContext();
  const { selectedPair, marketHistory } = useMarketContext();
  const { transactionMessageState, transactionMessageDispatch } =
    useTransactionMessage();
  const { formAccountBalancesByName } = useAccount();
  const { buildCancelLimitOrderTransaction } = useOrderTransactionBuilder();
  const { buildTrx } = useTransactionBuilder();
  const { calculateCancelLimitOrderFee } = useFees();
  const [loading, setLoading] = useState<boolean>(true);
  const [userOrdersRows, setUserOrdersRows] = useState<OrderTableRow[]>([]);
  const [userOrdersColumns, setUserOrdersColumns] = useState<
    UserOrderColumnType[]
  >([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const {
    getOrdersRows,
    updateOpenOrdersColumns,
    updateOrdersHistoriesColumns,
  } = useAccountOrders();

  const formUserOrders = async () => {
    setLoading(true);
    const { openOrdersRows, historiesRows } = await getOrdersRows();

    const openOrdersColumns = updateOpenOrdersColumns(
      openOrdersRows,
      onCancelClick
    );
    const historyColumns = updateOrdersHistoriesColumns(historiesRows);
    if (isOpen) {
      setUserOrdersRows(openOrdersRows);
      setUserOrdersColumns(openOrdersColumns);
      setLoading(false);
    } else {
      setUserOrdersRows(historiesRows);
      setUserOrdersColumns(historyColumns);
      setLoading(false);
    }
  };

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
        formUserOrders();
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
      formUserOrders,
      formAccountBalancesByName,
      localStorageAccount,
      selectedPair,
    ]
  );

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish: handleCancelLimitOrderFinish,
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

  const cancelOrderFeeAmount = useMemo(() => {
    const cancelLimitOrderFee = calculateCancelLimitOrderFee();
    if (cancelLimitOrderFee !== undefined) {
      return cancelLimitOrderFee;
    } else {
      return 0;
    }
  }, [calculateCancelLimitOrderFee]);

  const defineTableRowClassName = useCallback((record: any) => {
    return record.side === counterpart.translate("pages.profile.orders_tab.buy")
      ? "buy"
      : "sell";
  }, []);

  useEffect(() => {
    formUserOrders();
  }, [marketHistory]);

  return {
    loading,
    userOrdersRows,
    userOrdersColumns,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    transactionMessageState,
    cancelOrderFeeAmount,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    defineTableRowClassName,
  };
}
