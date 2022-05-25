import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useFees,
  useLimitOrderTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";

import {
  UseCancelLimitOrderArgs,
  UseCancelLimitOrderResult,
} from "./useCancelLimitOrder.types";

export function useCancelLimitOrder({
  refreshHistory,
  refreshOrderBook,
  currentOrder,
}: UseCancelLimitOrderArgs): UseCancelLimitOrderResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateCancelLimitOrderFee } = useFees();
  const { localStorageAccount, id } = useUserContext();
  const { buildTrx } = useTransactionBuilder();

  const { buildCancelLimitOrderTransaction } =
    useLimitOrderTransactionBuilder();

  const handleCancelLimitOrder = useCallback(
    async (password: string) => {
      setTransactionErrorMessage("");
      const activeKey = getPrivateKey(password, "active");
      const trx = buildCancelLimitOrderTransaction(currentOrder, id);
      let trxResult;

      try {
        setLoadingTransaction(true);
        trxResult = await buildTrx([trx], [activeKey]);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage("Unable to process the transaction!");
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        refreshOrderBook();
        refreshHistory();
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          "You have successfully created a limit order"
        );
        setLoadingTransaction(false);
      } else {
        refreshOrderBook();
        refreshHistory();
        setTransactionErrorMessage("Unable to process the transaction!");
        setLoadingTransaction(false);
      }
    },
    [
      setTransactionErrorMessage,
      getPrivateKey,
      buildCancelLimitOrderTransaction,
      id,
      buildTrx,
      setLoadingTransaction,
      localStorageAccount,
      formAccountBalancesByName,
      refreshOrderBook,
      refreshHistory,
      setTransactionSuccessMessage,
      currentOrder,
    ]
  );

  useEffect(() => {
    const cancelLimitOrderFee = calculateCancelLimitOrderFee();
    if (cancelLimitOrderFee !== undefined) {
      setFeeAmount(cancelLimitOrderFee.fee);
    }
  }, [calculateCancelLimitOrderFee, setFeeAmount]);

  return {
    feeAmount,
    handleCancelLimitOrder,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
  };
}
