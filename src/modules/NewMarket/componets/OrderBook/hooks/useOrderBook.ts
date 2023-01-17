import counterpart from "counterpart";
import { useCallback, useMemo, useState } from "react";

import {
  Order,
  OrderColumn,
  OrderRow,
  OrderType,
  PairAssets,
} from "../../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

type Args = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  asks: Order[];
  bids: Order[];
};

export function useOrderBook({
  selectedAssets,
  loadingSelectedPair,
  asks,
  bids,
}: Args): UseOrderBookResult {
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<string>("0.001");

  const groupOrdersByThreshold = (orders: Order[], threshold: string) => {
    const groupedOrder: { [price: string]: OrderRow } = {};
    const decimalPlaces = threshold.split(".")[1].length;
    orders.forEach((order, index) => {
      const roundedPrice = Number(order.quote).toFixed(decimalPlaces);
      if (!groupedOrder[roundedPrice]) {
        groupedOrder[roundedPrice] = {
          key: index.toString(),
          quote: roundedPrice,
          amount: parseFloat(order.base).toFixed(decimalPlaces).toString(),
          total: (Number(order.quote) * Number(order.base))
            .toFixed(decimalPlaces)
            .toString(),
          orderDepth: 0,
          isBuyOrder: order.isBuyOrder,
        };
      } else {
        groupedOrder[roundedPrice].amount = (
          Number(groupedOrder[roundedPrice].amount) + Number(order.base)
        ).toString();
        groupedOrder[roundedPrice].total = (
          Number(groupedOrder[roundedPrice].total) +
          Number(order.quote) * Number(order.base)
        ).toString();
        groupedOrder[roundedPrice].orderDepth += 1;
      }
    });
    return Object.values(groupedOrder);
  };

  const orderColumns: OrderColumn[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      return [
        {
          title: `${counterpart.translate("tableHead.price")} (${
            selectedAssets.quote.symbol
          })`,
          width: "33%",
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${
            selectedAssets.base.symbol
          })`,
          width: "33%",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: counterpart.translate(`tableHead.total`),
          dataIndex: "total",
          key: "total",
        },
      ];
    } else {
      return [];
    }
  }, [loadingSelectedPair, selectedAssets]);

  const askRows: OrderRow[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      const reducedAsks: OrderRow[] = groupOrdersByThreshold(asks, threshold);
      return reducedAsks;
    } else {
      return [];
    }
  }, [asks, threshold, loadingSelectedPair, selectedAssets]);

  const bidRows: OrderRow[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      const reducedBids: OrderRow[] = groupOrdersByThreshold(bids, threshold);
      return reducedBids;
    } else {
      return [];
    }
  }, [bids, threshold, loadingSelectedPair, selectedAssets]);

  const handleFilterChange = useCallback(
    (type: OrderType) => {
      setOrderType(type);
    },
    [setOrderType]
  );

  const handleThresholdChange = useCallback(
    ({ key }: { key: string }) => {
      setThreshold(key);
    },
    [setThreshold]
  );

  return {
    orderType,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
    askRows,
    bidRows,
  };
}
