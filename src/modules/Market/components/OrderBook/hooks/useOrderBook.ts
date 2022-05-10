import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { roundNum } from "../../../../../common/hooks";
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
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<number>(0.001);
  const [orderColumns, setOrderColumns] = useState<OrderColumn[]>([]);
  const [userOrderColumns, setUserOrderColumns] = useState<OrderColumn[]>([]);

  //const [tableScroll, setTableScroll] = useState<TableScroll>();

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

  const selectOrdersForThresholdAndFilter = useCallback(() => {
    let selectedOrders: Order[] = [];
    switch (orderType) {
      case "total":
        selectedOrders = [
          ...asks.filter((ask) => Number(ask.price) >= threshold).reverse(),
          ...bids.filter((bid) => Number(bid.price) >= threshold).reverse(),
        ];
        break;
      case "sell":
        selectedOrders = [
          ...asks.filter((ask) => Number(ask.price) >= threshold).reverse(),
        ];
        break;
      case "buy":
        selectedOrders = [
          ...bids.filter((bid) => Number(bid.price) >= threshold).reverse(),
        ];
        break;
      default:
        break;
    }
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      const orders: OrderRow[] = selectedOrders.map((order, index) => {
        return {
          key: String(index),
          quote: roundNum(Number(order.base), currentQuote.precision),
          base: roundNum(Number(order.quote), currentBase.precision),
          price: roundNum(
            Number(order.quote) / Number(order.base),
            currentBase.precision
          ),
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

  useEffect(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      setOrderColumns([
        {
          title: "Price",
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
      setUserOrderColumns([
        {
          title: "Price",
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
        {
          title: "Expiration",
          dataIndex: "expiration",
          key: "expiration",
        },
      ]);
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

  return {
    orderType,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
    userOrderColumns,
  };
}
