import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import { UserOrderColumnType } from "../../../../common/components";
import {
  TransactionMessageActionType,
  useAccount,
  useAccountOrders,
  useAsset,
  useFees,
  useHandleTransactionForm,
  useOrderTransactionBuilder,
  useTransactionBuilder,
  useTransactionMessage,
} from "../../../../common/hooks";
import {
  useAssetsContext,
  useChainStoreContext,
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../common/providers";
import { Asset, OrderTableRow, SignerKey } from "../../../../common/types";
import { PairAssets } from "../../types";

import { UseMarketPageResult } from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

// This is in miliseconds
//const REQUIRED_TICKER_UPDATE_TIME = 800;

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { dbApi } = usePeerplaysApiContext();
  const { getAssetsBySymbols } = useAsset();
  const { id, localStorageAccount } = useUserContext();
  const { synced } = useChainStoreContext();
  const {
    getOrdersRows,
    updateOpenOrdersColumns,
    updateOrdersHistoriesColumns,
  } = useAccountOrders();
  const { defaultAsset } = useAssetsContext();
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const { formAccountBalancesByName } = useAccount();
  const { transactionMessageState, transactionMessageDispatch } =
    useTransactionMessage();
  const { buildCancelLimitOrderTransaction } = useOrderTransactionBuilder();
  const { calculateCancelLimitOrderFee } = useFees();
  const { buildTrx } = useTransactionBuilder();

  const [selectedAssets, setSelectedAssets] = useState<PairAssets>();
  const [loadingSelectedPair, setLoadingSelectedPair] = useState<boolean>(true);

  const [userOpenOrdersRows, setUserOpenOrdersRows] = useState<OrderTableRow[]>(
    []
  );
  const [userOrderHistoryRows, setUserOrderHistoryRows] = useState<
    OrderTableRow[]
  >([]);
  const [loadingUserOrders, setLoadingUserOrders] = useState<boolean>(true);
  const [userOpenOrdersColumns, setUserOpenOrdersColumns] = useState<
    UserOrderColumnType[]
  >([]);
  const [userOrdersHistoriesColumns, setUserOrdersHistoriesColumns] = useState<
    UserOrderColumnType[]
  >([]);

  const getPairAssets = useCallback(async () => {
    const assetsSymbols = currentPair.split("_");
    try {
      const quoteBase = await getAssetsBySymbols(assetsSymbols);
      if (quoteBase.length > 1) {
        const base = quoteBase.find(
          (asset) => asset.symbol === assetsSymbols[0]
        ) as Asset;
        const quote = quoteBase.find(
          (asset) => asset.symbol === assetsSymbols[1]
        ) as Asset;
        return { base, quote };
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentPair, getAssetsBySymbols]);

  const formUserOrders = async () => {
    setLoadingUserOrders(true);
    const { openOrdersRows, historiesRows } = await getOrdersRows();

    const openOrdersColumns = updateOpenOrdersColumns(
      openOrdersRows,
      onCancelClick
    );
    const historyColumns = updateOrdersHistoriesColumns(historiesRows);
    setUserOpenOrdersRows(openOrdersRows);
    setUserOrderHistoryRows(historiesRows);
    setUserOpenOrdersColumns(openOrdersColumns);
    setUserOrdersHistoriesColumns(historyColumns);
    setLoadingUserOrders(false);
  };

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
      selectedAssets,
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

  const unsubscribeFromMarket = useCallback(async () => {
    const previousBaseSymbol = currentPair.split("_")[1];
    const previousQuoteSymbol = currentPair.split("_")[0];
    try {
      await dbApi("unsubscribe_from_market", [
        () => {
          console.log("unsubscribing");
        },
        previousBaseSymbol,
        previousQuoteSymbol,
      ]);
    } catch (e) {
      console.log(e);
    }
  }, [currentPair, dbApi]);

  const subscribeToMarket = useCallback(async () => {
    if (selectedAssets && synced) {
      try {
        await Promise.all([formUserOrders()]);
        await dbApi("subscribe_to_market", [
          () => {
            // setTimeout(() => {
            //   getTradingPairsStats();
            // }, REQUIRED_TICKER_UPDATE_TIME);
            formUserOrders();
          },
          selectedAssets.base.symbol,
          selectedAssets.quote.symbol,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedAssets, synced, formUserOrders, dbApi]);

  useEffect(() => {
    let ignore = false;
    async function setPairAssets() {
      setLoadingSelectedPair(true);
      const baseQuote = await getPairAssets();
      if (!ignore && baseQuote) {
        setSelectedAssets({ base: baseQuote.base, quote: baseQuote.quote });
        setLoadingSelectedPair(false);
      }
    }
    setPairAssets();
    return () => {
      ignore = true;
    };
  }, [setLoadingSelectedPair, getPairAssets, setSelectedAssets]);

  useEffect(() => {
    subscribeToMarket();
    return () => {
      unsubscribeFromMarket();
    };
  }, [selectedAssets, id, localStorageAccount, defaultAsset]);

  return {
    selectedAssets,
    loadingSelectedPair,
    userOpenOrdersRows,
    userOrderHistoryRows,
    userOpenOrdersColumns,
    userOrdersHistoriesColumns,
    loadingUserOrders,
    transactionMessageState,
    selectedOrderId,
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleCancelLimitOrderFinish,
    hideTransactionModal,
    cancelOrderFeeAmount,
    localStorageAccount,
    formUserOrders,
  };
}
