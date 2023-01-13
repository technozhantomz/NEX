import counterpart from "counterpart";
import { useCallback, useMemo, useState } from "react";

import { useAsset } from "../../../../../common/hooks";
import { Asset } from "../../../../../common/types";
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
  const [threshold, setThreshold] = useState<number>(0.001);
  const { ceilPrecision, roundNum } = useAsset();

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

  const orderColumns: OrderColumn[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      return [
        {
          title: counterpart.translate(`tableHead.price`),
          dataIndex: "price",
          key: "price",
        },
        {
          title: selectedAssets.quote.symbol,
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: selectedAssets.base.symbol,
          dataIndex: "base",
          key: "base",
        },
      ];
    } else {
      return [];
    }
  }, [loadingSelectedPair, selectedAssets]);

  const ordersRows: OrderRow[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      let selectedOrders: Order[] = [];
      const reducedAsks = reduceOrdersByPrice(
        asks,
        selectedAssets.base,
        selectedAssets.quote
      );
      const reducedBids = reduceOrdersByPrice(
        bids,
        selectedAssets.base,
        selectedAssets.quote
      );
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
      return orders;
    } else {
      return [];
    }
  }, [
    orderType,
    asks,
    bids,
    threshold,
    loadingSelectedPair,
    selectedAssets,
    reduceOrdersByPrice,
  ]);
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

  return {
    ordersRows,
    orderType,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
  };
}
