import counterpart from "counterpart";
import { cloneDeep, max } from "lodash";
import { useCallback, useMemo, useState } from "react";

import { useAsset } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import {
  MarketOrder,
  MarketPair,
  TradeHistoryRow,
} from "../../../../../common/types";

import {
  FilterType,
  OrderColumn,
  UseOrderBookResult,
} from "./useOrderBook.types";

type Args = {
  currentPair: string;
};

export function useOrderBook({ currentPair }: Args): UseOrderBookResult {
  const { roundNum } = useAsset();
  const { selectedPair, asks, bids, loadingAsksBids, lastTradeHistory } =
    useMarketContext();
  const [threshold, setThreshold] = useState<number>(0.001);
  const [filter, setFilter] = useState<FilterType>("total");
  const [prevPair, setPrevPair] = useState<string>(currentPair);

  if (prevPair !== currentPair) {
    setPrevPair(currentPair);
    setThreshold(0.001);
  }

  const handleThresholdChange = useCallback(
    ({ key }: { key: string }) => {
      setThreshold(Number(key));
    },
    [setThreshold]
  );

  const handleFilterChange = useCallback(
    (type: FilterType) => {
      setFilter(type);
    },
    [setFilter]
  );

  const reduceOrdersByPrice = useCallback((orders: MarketOrder[]) => {
    const reducedOrders = orders.reduce((previousOrders, currentOrder) => {
      const repeatedPriceIndex = previousOrders.findIndex(
        (previousOrder) => previousOrder.price === currentOrder.price
      );
      if (repeatedPriceIndex === -1) {
        previousOrders.push(currentOrder);
      } else {
        const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
        previousOrders[repeatedPriceIndex] = {
          ...orderWithRepeatedPrice,
          quote: String(
            Number(orderWithRepeatedPrice.quote) + Number(currentOrder.quote)
          ),
          base: String(
            Number(orderWithRepeatedPrice.base) + Number(currentOrder.base)
          ),
        };
      }
      return previousOrders;
    }, [] as MarketOrder[]);
    return reducedOrders;
  }, []);

  const groupAsksByThreshold = useCallback(
    (asks: MarketOrder[], selectedPair: MarketPair, threshold: number) => {
      const filteredAsks = cloneDeep(asks).filter(
        (ask) => Number(ask.price) >= threshold
      );
      const groupedAsks: (MarketOrder & { maxPrice: string })[] = [];
      filteredAsks.forEach((ask) => {
        const unchangedPrice = ask.price;
        ask.price = Number(ask.price).toFixed(
          Math.log10(Math.round(1 / threshold))
        );
        if (groupedAsks.some((ga) => ga.price === ask.price)) {
          const group = groupedAsks.find(
            (ga) => ga.price === ask.price
          ) as MarketOrder & { maxPrice: string };
          group.maxPrice =
            group.maxPrice >= unchangedPrice ? group.maxPrice : unchangedPrice;
          group.base = String(Number(group.base) + Number(ask.base));
          group.quote = String(Number(group.quote) + Number(ask.quote));
        } else {
          groupedAsks.push({ ...ask, maxPrice: unchangedPrice });
        }
      });
      const updatedAsks = groupedAsks.map((asks, index) => {
        return {
          key: `${threshold}-ask-${index}`,
          quote: roundNum(asks.quote, selectedPair.quote.precision),
          base: roundNum(asks.base, selectedPair.base.precision),
          isBuyOrder: false,
          price:
            Number(asks.price) >= Number(asks.maxPrice)
              ? asks.price
              : (Number(asks.price) + threshold).toFixed(
                  Math.log10(Math.round(1 / threshold))
                ),
        } as MarketOrder;
      });
      const reducedAsks = reduceOrdersByPrice(updatedAsks);
      return reducedAsks;
    },
    [roundNum, reduceOrdersByPrice]
  );

  const groupBidsByThreshold = useCallback(
    (bids: MarketOrder[], selectedPair: MarketPair, threshold: number) => {
      const filteredBids = cloneDeep(bids).filter(
        (bid) => Number(bid.price) >= threshold
      );
      const groupedBids: (MarketOrder & { minPrice: string })[] = [];

      filteredBids.forEach((bid) => {
        const unchangedPrice = bid.price;

        bid.price = Number(bid.price).toFixed(
          Math.log10(Math.round(1 / threshold))
        );

        if (groupedBids.some((gb) => gb.price === bid.price)) {
          const group = groupedBids.find(
            (gb) => gb.price === bid.price
          ) as MarketOrder & { minPrice: string };
          group.minPrice =
            group.minPrice <= unchangedPrice ? group.minPrice : unchangedPrice;
          group.base = String(Number(group.base) + Number(bid.base));
          group.quote = String(Number(group.quote) + Number(bid.quote));
        } else {
          groupedBids.push({ ...bid, minPrice: unchangedPrice });
        }
      });
      const updatedBids = groupedBids.map((bids, index) => {
        return {
          key: `${threshold}-bid-${index}`,
          quote: roundNum(bids.quote, selectedPair.quote.precision),
          base: roundNum(bids.base, selectedPair.base.precision),
          isBuyOrder: true,
          price:
            Number(bids.price) <= Number(bids.minPrice)
              ? bids.price
              : (Number(bids.price) - threshold).toFixed(
                  Math.log10(Math.round(1 / threshold))
                ),
        } as MarketOrder;
      });
      const reducedBids = reduceOrdersByPrice(updatedBids);

      return reducedBids;
    },
    [roundNum, reduceOrdersByPrice]
  );

  const asksRows: MarketOrder[] = useMemo(() => {
    if (selectedPair && asks) {
      const groupedAsks = groupAsksByThreshold(asks, selectedPair, threshold);
      return groupedAsks;
    } else {
      return [];
    }
  }, [asks, threshold, selectedPair]);

  const bidsRows: MarketOrder[] = useMemo(() => {
    if (selectedPair && bids) {
      const groupedBids = groupBidsByThreshold(bids, selectedPair, threshold);
      return groupedBids;
    } else {
      return [];
    }
  }, [bids, threshold, selectedPair]);

  const orderColumns: OrderColumn[] = useMemo(() => {
    const baseSymbol = currentPair.split("_")[1];
    const quoteSymbol = currentPair.split("_")[0];
    return [
      {
        title: `${counterpart.translate("tableHead.price")} (${baseSymbol})`,
        fixed: true,
        dataIndex: "price",
        key: "price",
      },
      {
        title: `${counterpart.translate("tableHead.amount")} (${quoteSymbol})`,
        fixed: true,
        dataIndex: "quote",
        key: "quote",
      },
      {
        title: `${counterpart.translate("tableHead.total")} (${baseSymbol})`,
        dataIndex: "base",
        key: "base",
        fixed: true,
      },
    ] as OrderColumn[];
  }, [currentPair]);

  const thresholdValues = useMemo(() => {
    if (selectedPair) {
      const values = [];
      for (let power = 1; power <= selectedPair.base.precision; power++) {
        const value = 1 / Math.pow(10, power);
        values.push(value.toFixed(power));
      }
      return values;
    } else {
      return ["0.0001"];
    }
  }, [selectedPair]);

  const specifyTableScroll = useCallback(
    (orders: MarketOrder[]) => {
      if (filter === "total") {
        return orders.length > 12
          ? {
              y: 246,
              x: undefined,
              scrollToFirstRowOnChange: false,
            }
          : undefined;
      } else {
        return orders.length > 30
          ? {
              y: 580,
              x: undefined,
              scrollToFirstRowOnChange: false,
            }
          : undefined;
      }
    },
    [filter]
  );

  const specifyTableHeight = useCallback((): string => {
    return filter === "total" ? "282px" : "610px";
  }, [filter]);

  const specifyLastTradeClassName = useCallback(
    (lastTrade?: TradeHistoryRow) => {
      if (lastTrade) {
        return lastTrade.isBuyOrder ? "buy" : "sell";
      } else {
        return "";
      }
    },
    []
  );

  const specifyAsksTableRowClassName = useCallback(
    (record: any) => {
      const item = record as MarketOrder;
      const orderDepthRatio =
        Math.ceil(
          (Number(item.quote) /
            (max(asksRows.map((row) => Number(row.quote))) ?? 0)) *
            10
        ) * 10;
      const orderDepthClass = `order-depth-${orderDepthRatio}`;
      return `sell ${orderDepthClass}`;
    },
    [asksRows]
  );

  const specifyBidsTableRowClassName = useCallback(
    (record: any) => {
      const item = record as MarketOrder;
      const orderDepthRatio =
        Math.ceil(
          (Number(item.quote) /
            (max(bidsRows.map((row) => Number(row.quote))) ?? 0)) *
            10
        ) * 10;
      const orderDepthClass = `order-depth-${orderDepthRatio}`;
      return `buy ${orderDepthClass}`;
    },
    [bidsRows]
  );

  return {
    orderColumns,
    threshold,
    asksRows,
    bidsRows,
    filter,
    loading: loadingAsksBids,
    lastTrade: lastTradeHistory,
    thresholdValues,
    handleThresholdChange,
    handleFilterChange,
    specifyTableHeight,
    specifyTableScroll,
    specifyLastTradeClassName,
    specifyAsksTableRowClassName,
    specifyBidsTableRowClassName,
    selectedPair,
  };
}
