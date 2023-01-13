import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import { defaultToken } from "../../../../api/params";
import { UserOrderColumnType } from "../../../../common/components";
import {
  TransactionMessageActionType,
  useAccount,
  useAccountOrders,
  useAsset,
  useFees,
  useFormDate,
  useHandleTransactionForm,
  useMarketHistory,
  useOrderTransactionBuilder,
  useTransactionBuilder,
  useTransactionMessage,
  useUpdateExchanges,
} from "../../../../common/hooks";
import {
  useAssetsContext,
  useChainStoreContext,
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../common/providers";
import {
  Asset,
  OrderHistory,
  OrderTableRow,
  SignerKey,
} from "../../../../common/types";
import { PairAssets, TradeHistoryColumn, TradeHistoryRow } from "../../types";

import { UseMarketPageResult } from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

// This is in milliseconds
//const REQUIRED_TICKER_UPDATE_TIME = 800;

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { dbApi } = usePeerplaysApiContext();
  const { setPrecision, getAssetsBySymbols, ceilPrecision } = useAsset();
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
  const { getFillOrderHistory } = useMarketHistory();
  const { formLocalDate } = useFormDate();
  const { exchanges } = useUpdateExchanges();

  const [selectedAssets, setSelectedAssets] = useState<PairAssets>();
  const [loadingSelectedPair, setLoadingSelectedPair] = useState<boolean>(true);

  // User orders
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

  // Trade history
  const [tradeHistoryRows, setTradeHistoryRows] = useState<TradeHistoryRow[]>(
    []
  );
  const [loadingTradeHistory, setLoadingTradeHistory] = useState<boolean>(true);

  // Pair modal
  const [isPairModalVisible, setIsPairModalVisible] = useState<boolean>(false);
  const handleClickOnPair = useCallback(() => {
    setIsPairModalVisible(true);
  }, [setIsPairModalVisible]);

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

  const userTradeHistoryRows = useMemo(() => {
    const baseSymbol = currentPair.split("_")[0];
    const quoteSymbol = currentPair.split("_")[1];
    const notDefaultToken =
      baseSymbol === defaultToken
        ? { symbol: quoteSymbol, isBase: false }
        : { symbol: baseSymbol, isBase: true };
    const selectedPairHistoryRows = userOrderHistoryRows.filter((row) =>
      row.pair.split("_").includes(notDefaultToken.symbol)
    );
    return notDefaultToken.isBase
      ? selectedPairHistoryRows.map((row) => {
          return {
            key: row.key,
            price: String(row.numberedPrice),
            amount: row.numberedAmount,
            time: row.date,
            isBuyOrder:
              row.side ===
              counterpart.translate("pages.profile.orders_tab.buy"),
          } as TradeHistoryRow;
        })
      : selectedPairHistoryRows.map((row) => {
          return {
            key: row.key,
            price: ceilPrecision(
              row.numberedAmount / row.numberedTotal,
              selectedAssets?.base.precision
            ),
            amount: row.numberedTotal,
            time: row.date,
            isBuyOrder:
              row.side !==
              counterpart.translate("pages.profile.orders_tab.buy"),
          } as TradeHistoryRow;
        });
  }, [userOrderHistoryRows, currentPair, defaultToken, selectedAssets]);
  const tradeHistoryColumns: TradeHistoryColumn[] = useMemo(() => {
    const baseSymbol = currentPair.split("_")[0] as string;
    const quoteSymbol = currentPair.split("_")[1] as string;
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
  }, [currentPair]);
  const formTradeHistoryRow = useCallback(
    (history: OrderHistory, base: Asset, quote: Asset): TradeHistoryRow => {
      const time = formLocalDate(history.time, [
        "month",
        "date",
        "year",
        "time",
      ]);
      const { pays, receives } = history.op;
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

      return {
        key: history.id,
        price: ceilPrecision(quoteAmount / baseAmount),
        amount: baseAmount,
        time: time,
        isBuyOrder,
      } as TradeHistoryRow;
    },
    [setPrecision, formLocalDate, ceilPrecision]
  );
  const getHistory = useCallback(async () => {
    setLoadingTradeHistory(true);
    if (selectedAssets) {
      const base = selectedAssets.base;
      const quote = selectedAssets.quote;
      try {
        const histories = await getFillOrderHistory(base, quote);
        if (histories) {
          const marketTakersHistories = histories.reduce(
            (previousHistory, currentHistory, i, { [i - 1]: next }) => {
              if (i % 2) {
                previousHistory.push(
                  currentHistory.op.order_id > next.op.order_id
                    ? currentHistory
                    : next
                );
              }
              return previousHistory;
            },
            [] as OrderHistory[]
          );
          const tradeHistoryRows = marketTakersHistories.map((history) => {
            return formTradeHistoryRow(history, base, quote);
          });
          setTradeHistoryRows(tradeHistoryRows);
        }
        setLoadingTradeHistory(false);
      } catch (e) {
        console.log(e);
        setLoadingTradeHistory(false);
      }
    }
  }, [
    selectedAssets,
    setLoadingTradeHistory,
    getFillOrderHistory,
    formTradeHistoryRow,
    setTradeHistoryRows,
  ]);

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
        await Promise.all([formUserOrders(), getHistory()]);
        await dbApi("subscribe_to_market", [
          () => {
            formUserOrders();
            getHistory();
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
    tradeHistoryRows,
    loadingTradeHistory,
    tradeHistoryColumns,
    setIsPairModalVisible,
    isPairModalVisible,
    handleClickOnPair,
    exchanges,
    userTradeHistoryRows,
  };
}
