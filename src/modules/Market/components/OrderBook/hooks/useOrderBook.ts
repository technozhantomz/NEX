import { useCallback, useEffect, useState } from "react";

import { roundNum, useAsset } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";
import { usePairSelect } from "../../PairSelect/hooks";

import {
  Order,
  OrderColumn,
  OrderRow,
  OrderType,
  UseOrderBookResult,
} from "./uesOrderBook.types";

export function useOrderBook(): UseOrderBookResult {
  // asks are buy orders
  const [asks, setAsks] = useState<Order[]>([]);
  // bids are sell orders
  const [bids, setBids] = useState<Order[]>([]);
  const [ordersRows, setOrdersRows] = useState<OrderRow[]>([]);
  const [userOrdersRows, setUserOrdersRows] = useState<OrderRow[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<number>(0.001);
  const [columns, setColumns] = useState<OrderColumn[]>([]);
  //const [tableScroll, setTableScroll] = useState<TableScroll>();
  const { currentBase, currentQuote } = usePairSelect();
  const { localStorageAccount } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { setPrecision } = useAsset();

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

  const getOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      const { asks, bids } = await dbApi("get_order_book", [
        base.symbol,
        quote.symbol,
        50,
      ]);
      setAsks(
        asks.map((ask: Order) => {
          return { ...ask, isBuyOrder: false };
        }) as Order[]
      );
      setBids(
        bids.map((bid: Order) => {
          return { ...bid, isBuyOrder: true };
        }) as Order[]
      );
    },
    [dbApi, setAsks, setBids]
  );

  const getUserOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      const baseAsset = base;
      const quoteAsset = quote;
      const rawOrders = await dbApi("get_full_accounts", [
        [localStorageAccount],
        false,
      ]).then((e) =>
        e[0][1].limit_orders.filter((e) => {
          const prices = e.sell_price;
          const orderAssets = [prices.base.asset_id, prices.quote.asset_id];
          return (
            orderAssets.includes(baseAsset.id) &&
            orderAssets.includes(quoteAsset.id)
          );
        })
      );
      const rows = await Promise.all(
        rawOrders.map((order) => {
          const orderVal = setPrecision(
            false,
            order.for_sale,
            baseAsset.precision
          );
          const sellBase = order.sell_price.base;
          const sellQuote = order.sell_price.quote;
          const key = order.id;

          let price = 0,
            base = 0,
            quote = 0,
            isBuyOrder = false;

          if (baseAsset.id === sellBase.asset_id) {
            base = orderVal;
            price = setPrecision(false, sellBase.amount, baseAsset.precision);
            quote = roundNum(base / price);
            isBuyOrder = true;
          } else {
            quote = orderVal;
            price = setPrecision(false, sellQuote.amount, quoteAsset.precision);
            base = roundNum(price * quote);
            isBuyOrder = false;
          }

          return { key, quote, base, price, isBuyOrder };
        })
      );
      setUserOrdersRows(rows);
    },
    [dbApi]
  );

  const refreshOrderBook = useCallback(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getOrderBook(currentBase, currentQuote);
      getUserOrderBook(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getOrderBook, getUserOrderBook]);

  useEffect(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      setColumns([
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
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
      ]);
      getOrderBook(currentBase, currentQuote);
      getUserOrderBook(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getOrderBook, getUserOrderBook]);

  useEffect(() => {
    let selectedOrders: Order[] = [];
    switch (orderType) {
      case "total":
        selectedOrders = [
          ...asks.filter((ask) => Number(ask.price) >= threshold).reverse(),
          ...bids.filter((bid) => Number(bid.price) >= threshold),
        ];
        break;
      case "sell":
        selectedOrders = [
          ...asks.filter((ask) => Number(ask.price) >= threshold).reverse(),
        ];
        break;
      case "buy":
        selectedOrders = [
          ...bids.filter((bid) => Number(bid.price) >= threshold),
        ];
        break;
      default:
        break;
    }
    if (currentBase !== undefined && currentQuote !== undefined) {
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
    asks,
    bids,
    orderType,
    threshold,
    setOrdersRows,
    currentBase,
    currentQuote,
  ]);

  return {
    asks,
    bids,
    orderType,
    threshold,
    ordersRows,
    userOrdersRows,
    refreshOrderBook,
    handleThresholdChange,
    handleFilterChange,
    columns,
  };
}
