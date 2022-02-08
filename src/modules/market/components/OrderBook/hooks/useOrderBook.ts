import { useCallback, useEffect, useState } from "react";

import { roundNum } from "../../../../../common/hooks/useRoundNum";
import { Asset } from "../../../../../common/types/Asset";
import { usePeerplaysApi } from "../../../../peerplaysApi";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

import {
  Order,
  OrderColumn,
  OrderRow,
  OrderType,
  UseOrderBookResult,
} from "./uesOrderBook.types";

const reduceAndSortOrdersWithSamePrice = (
  orders: Order[],
  isBuyOrder: boolean
): Order[] => {
  return orders
    .reduce((acc, element) => {
      const index = acc.findIndex(
        (order) =>
          roundNum(Number(order.price)) === roundNum(Number(element.price))
      );
      if (index === -1) {
        acc.push(element);
      } else {
        const { quote, base, price } = acc[index];
        acc[index] = {
          quote: String(Number(quote) + Number(element.quote)),
          base: String(Number(base) + Number(element.base)),
          price,
          isBuyOrder: isBuyOrder,
        };
      }

      return acc;
    }, [] as Order[])
    .sort((prev, next) =>
      isBuyOrder
        ? Number(next.price) - Number(prev.price)
        : Number(prev.price) - Number(next.price)
    )
    .map((order) => {
      return { ...order, isBuyOrder: isBuyOrder };
    });
};

export function useOrderBook(): UseOrderBookResult {
  // asks are sell orders
  const [asks, setAsks] = useState<Order[]>([]);
  // bids are buy orders
  const [bids, setBids] = useState<Order[]>([]);
  const [ordersRows, setOrdersRows] = useState<OrderRow[]>([]);
  const [columns, setColumns] = useState<OrderColumn[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<number>(0.001);
  //const [tableScroll, setTableScroll] = useState<TableScroll>();
  const { currentBase, currentQuote } = usePairSelect();
  const { dbApi } = usePeerplaysApi();

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
      setColumns([
        {
          title: quote.symbol,
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: base.symbol,
          dataIndex: "base",
          key: "base",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
      ]);
      const { asks, bids } = await dbApi("get_order_book", [
        base.symbol,
        quote.symbol,
        50,
      ]);
      setAsks(asks as Order[]);
      setBids(bids as Order[]);
    },
    [dbApi, setAsks, setBids, setColumns]
  );

  useEffect(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getOrderBook(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getOrderBook, setColumns]);

  useEffect(() => {
    let selectedOrders: Order[] = [];
    const selectedAsks = [
      ...reduceAndSortOrdersWithSamePrice(asks, false).filter(
        (ask) => Number(ask.price) >= threshold
      ),
    ];
    const selectedBids = [
      ...reduceAndSortOrdersWithSamePrice(bids, true).filter(
        (bid) => Number(bid.price) >= threshold
      ),
    ];
    switch (orderType) {
      case "total":
        selectedOrders = [...selectedBids, ...selectedAsks];
        break;
      case "sell":
        selectedOrders = [...selectedAsks];
        break;
      case "buy":
        selectedOrders = [...selectedBids];
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
    handleThresholdChange,
    handleFilterChange,
    columns,
  };
}
