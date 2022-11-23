import counterpart from "counterpart";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useAccount,
  useAsset,
  useFees,
  useOrderTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset, SignerKey } from "../../../../../common/types";
import { Order, OrderColumn, OrderRow, OrderType } from "../../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  asks: Order[];
  bids: Order[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
};

export function useOrderBook({
  currentBase,
  currentQuote,
  loadingSelectedPair,
  asks,
  bids,
  setOrdersRows,
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
  const { formAccountBalancesByName } = useAccount();

  const { localStorageAccount, id } = useUserContext();
  const { buildTrx } = useTransactionBuilder();
  const { buildCancelLimitOrderTransaction } = useOrderTransactionBuilder();
  const { calculateCancelLimitOrderFee } = useFees();
  const { ceilPrecision, roundNum } = useAsset();

  const handleFilterChange = useCallback(
    (type: OrderType) => {
      setOrderType(type);
    },
    [setOrderType]
  );

  const handleThresholdChange = useCallback(
    ({ key }: { key: string }) => {
      setThreshold(Number(key));
    },
    [setThreshold]
  );

  const reduceOrdersByPrice = useCallback(
    (orders: Order[], currentBase: Asset, currentQuote: Asset) => {
      const reducedOrders = orders.reduce((previousOrders, currentOrder) => {
        const repeatedPriceIndex = previousOrders.findIndex(
          (previousOrder) =>
            ceilPrecision(
              Number(previousOrder.base) / Number(previousOrder.quote),
              currentBase.precision
            ) ===
            ceilPrecision(
              Number(currentOrder.base) / Number(currentOrder.quote),
              currentBase.precision
            )
        );
        if (repeatedPriceIndex === -1) {
          previousOrders.push({
            ...currentOrder,
            price: ceilPrecision(currentOrder.price, currentBase.precision),
          });
        } else {
          const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
          previousOrders[repeatedPriceIndex] = {
            quote: String(
              Number(orderWithRepeatedPrice.quote) + Number(currentOrder.quote)
            ),
            base: String(
              Number(orderWithRepeatedPrice.base) + Number(currentOrder.base)
            ),
            price: orderWithRepeatedPrice.price,
            isBuyOrder: orderWithRepeatedPrice.isBuyOrder,
          };
        }
        return previousOrders;
      }, [] as Order[]);

      return reducedOrders.map((order) => {
        return {
          ...order,
          quote: roundNum(order.quote, currentQuote.precision),
          base: roundNum(order.base, currentBase.precision),
        };
      });
    },
    [ceilPrecision, roundNum]
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
          quote: order.quote,
          base: order.base,
          price: order.price,
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
    setOrdersRows,
  ]);

  const handleCancelLimitOrder = useCallback(
    async (signerKey: SignerKey) => {
      setTransactionErrorMessage("");

      const trx = buildCancelLimitOrderTransaction(selectedOrderId, id);
      let trxResult;
      try {
        setLoadingTransaction(true);
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.transaction_unable`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
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
      buildCancelLimitOrderTransaction,
      selectedOrderId,
      id,
      setLoadingTransaction,
      buildTrx,
      formAccountBalancesByName,
      localStorageAccount,
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
    }
  }, [loadingSelectedPair, currentBase, currentQuote, setOrderColumns]);

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
