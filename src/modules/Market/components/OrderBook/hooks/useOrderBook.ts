import counterpart from "counterpart";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  roundNum,
  useAccount,
  useFees,
  useLimitOrderTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";
import { Order, OrderColumn, OrderRow, OrderType } from "../../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  getOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  asks: Order[];
  bids: Order[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
  getUserOrderBook: (base: Asset, quote: Asset) => Promise<void>;
};

export function useOrderBook({
  currentBase,
  currentQuote,
  loadingSelectedPair,
  getOrderBook,
  asks,
  bids,
  setOrdersRows,
  getUserOrderBook,
}: Args): UseOrderBookResult {
  const [cancelOrderfeeAmount, setCancelOrderfeeAmount] = useState<number>(0);
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<number>(0.001);
  const [orderColumns, setOrderColumns] = useState<OrderColumn[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { getPrivateKey, formAccountBalancesByName } = useAccount();

  const { localStorageAccount, id } = useUserContext();
  const { buildTrx } = useTransactionBuilder();
  const { buildCancelLimitOrderTransaction } =
    useLimitOrderTransactionBuilder();
  const { calculateCancelLimitOrderFee } = useFees();

  const handleFilterChange = useCallback(
    (type: OrderType) => {
      setOrderType(type);
    },
    [setOrderType]
  );

  const handleThresholdChange = useCallback(
    ({ key }) => {
      setThreshold(Number(key));
    },
    [setThreshold]
  );

  const reduceOrdersByPrice = useCallback(
    (orders: Order[], currentBase: Asset, currentQuote: Asset) => {
      const reducedOrders = orders.reduce((previousOrders, currentOrder) => {
        const repeatedPriceIndex = previousOrders.findIndex(
          (previousOrder) =>
            roundNum(Number(previousOrder.price), currentBase.precision) ===
            roundNum(Number(currentOrder.price), currentBase.precision)
        );
        if (repeatedPriceIndex === -1) {
          previousOrders.push(currentOrder);
        } else {
          const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
          previousOrders[repeatedPriceIndex] = {
            quote: String(
              roundNum(
                Number(orderWithRepeatedPrice.quote),
                currentQuote.precision
              ) + roundNum(Number(currentOrder.quote), currentQuote.precision)
            ),
            base: String(
              roundNum(
                Number(orderWithRepeatedPrice.base),
                currentBase.precision
              ) + roundNum(Number(currentOrder.base), currentBase.precision)
            ),
            price: String(
              roundNum(
                Number(orderWithRepeatedPrice.price),
                currentBase.precision
              )
            ),
            isBuyOrder: orderWithRepeatedPrice.isBuyOrder,
          };
        }
        return previousOrders;
      }, [] as Order[]);
      return reducedOrders;
    },
    [roundNum]
  );

  const selectOrdersForThresholdAndFilter = useCallback(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      let selectedOrders: Order[] = [];
      const reducedAsks = reduceOrdersByPrice(asks, currentBase, currentQuote);
      const reducedBids = reduceOrdersByPrice(bids, currentBase, currentQuote);
      switch (orderType) {
        case "total":
          selectedOrders = [
            ...reducedAsks.filter((ask) => Number(ask.price) >= threshold),
            ...reducedBids.filter((bid) => Number(bid.price) >= threshold),
          ];
          break;
        case "sell":
          selectedOrders = [
            ...reducedAsks.filter((ask) => Number(ask.price) >= threshold),
          ];
          break;
        case "buy":
          selectedOrders = [
            ...reducedBids.filter((bid) => Number(bid.price) >= threshold),
          ];
          break;
        default:
          break;
      }
      const orders: OrderRow[] = selectedOrders.map((order, index) => {
        return {
          key: String(index),
          quote: roundNum(Number(order.quote), currentQuote.precision),
          base: roundNum(Number(order.base), currentBase.precision),
          price: roundNum(Number(order.price), currentBase.precision),
          isBuyOrder: order.isBuyOrder,
        };
      });
      setOrdersRows(orders);
    }
  }, [
    orderType,
    asks,
    bids,
    threshold,
    loadingSelectedPair,
    currentBase,
    currentQuote,
    roundNum,
    setOrdersRows,
  ]);

  const handleCancelLimitOrder = useCallback(
    async (password: string) => {
      setTransactionErrorMessage("");
      const activeKey = getPrivateKey(password, "active");
      const trx = buildCancelLimitOrderTransaction(selectedOrderId, id);
      let trxResult;
      try {
        setLoadingTransaction(true);
        trxResult = await buildTrx([trx], [activeKey]);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        getUserOrderBook(currentBase as Asset, currentQuote as Asset);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.canceled_limit_order`, {
            selectedOrderId,
          })
        );
        setLoadingTransaction(false);
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      setTransactionErrorMessage,
      getPrivateKey,
      buildCancelLimitOrderTransaction,
      selectedOrderId,
      id,
      setLoadingTransaction,
      buildTrx,
      formAccountBalancesByName,
      localStorageAccount,
      getUserOrderBook,
      currentBase,
      currentQuote,
    ]
  );

  useEffect(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      setOrderColumns([
        {
          title: counterpart.translate(`tableHead.price`),
          dataIndex: "price",
          key: "price",
        },
        {
          title: currentQuote.symbol,
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: currentBase.symbol,
          dataIndex: "base",
          key: "base",
        },
      ]);
      getOrderBook(currentBase, currentQuote);

      // user section
      getUserOrderBook(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getOrderBook,
    getUserOrderBook,
    setOrderColumns,
  ]);

  useEffect(() => {
    selectOrdersForThresholdAndFilter();
  }, [selectOrdersForThresholdAndFilter]);

  useEffect(() => {
    const cancelLimitOrderFee = calculateCancelLimitOrderFee();
    if (cancelLimitOrderFee !== undefined) {
      setCancelOrderfeeAmount(cancelLimitOrderFee);
    }
  }, [calculateCancelLimitOrderFee, setCancelOrderfeeAmount]);

  return {
    orderType,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
    cancelOrderfeeAmount,
    transactionErrorMessage,
    setTransactionErrorMessage,
    transactionSuccessMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    setSelectedOrderId,
    selectedOrderId,
    handleCancelLimitOrder,
  };
}
