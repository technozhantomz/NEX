import counterpart from "counterpart";
import { cloneDeep, max } from "lodash";
import { useCallback, useMemo, useState } from "react";

import { useAsset } from "../../../../../common/hooks";
import { Order, PairAssets, TradeHistoryRow } from "../../../types";

import {
  FilterType,
  OrderColumn,
  UseOrderBookResult,
} from "./useOrderBook.types";

type Args = {
  currentPair: string;
  asks: Order[];
  bids: Order[];
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
};

export function useOrderBook({
  currentPair,
  asks,
  bids,
  selectedAssets,
  loadingSelectedPair,
}: Args): UseOrderBookResult {
  const { roundNum } = useAsset();

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

  const groupAsksByThreshold = useCallback(
    (asks: Order[], selectedAssets: PairAssets, threshold: number) => {
      const filteredAsks = cloneDeep(asks).filter(
        (ask) => Number(ask.price) >= threshold
      );
      const groupedAsks: (Order & { maxPrice: string })[] = [];

      filteredAsks.forEach((ask) => {
        const unchangedPrice = ask.price;
        ask.price = Number(ask.price).toFixed(
          Math.log10(Math.round(1 / threshold))
        );
        if (groupedAsks.some((ga) => ga.price === ask.price)) {
          const group = groupedAsks.find(
            (ga) => ga.price === ask.price
          ) as Order & { maxPrice: string };
          group.maxPrice =
            group.maxPrice >= unchangedPrice ? group.maxPrice : unchangedPrice;
          group.base = String(Number(group.base) + Number(ask.base));
          group.quote = String(Number(group.quote) + Number(ask.quote));
        } else {
          groupedAsks.push({ ...ask, maxPrice: unchangedPrice });
        }
      });

      return groupedAsks.map((asks) => {
        return {
          quote: roundNum(asks.quote, selectedAssets.quote.precision),
          base: roundNum(asks.base, selectedAssets.base.precision),
          isBuyOrder: false,
          price:
            Number(asks.price) >= Number(asks.maxPrice)
              ? asks.price
              : (Number(asks.price) + threshold).toFixed(
                  Math.log10(Math.round(1 / threshold))
                ),
        } as Order;
      });
    },
    [roundNum]
  );

  const groupBidsByThreshold = useCallback(
    (bids: Order[], selectedAssets: PairAssets, threshold: number) => {
      const filteredBids = cloneDeep(bids).filter(
        (bid) => Number(bid.price) >= threshold
      );
      const groupedBids: (Order & { minPrice: string })[] = [];

      filteredBids.forEach((bid) => {
        const unchangedPrice = bid.price;

        bid.price = Number(bid.price).toFixed(
          Math.log10(Math.round(1 / threshold))
        );

        if (groupedBids.some((gb) => gb.price === bid.price)) {
          const group = groupedBids.find(
            (gb) => gb.price === bid.price
          ) as Order & { minPrice: string };
          group.minPrice =
            group.minPrice <= unchangedPrice ? group.minPrice : unchangedPrice;
          group.base = String(Number(group.base) + Number(bid.base));
          group.quote = String(Number(group.quote) + Number(bid.quote));
        } else {
          groupedBids.push({ ...bid, minPrice: unchangedPrice });
        }
      });

      return groupedBids.map((bids) => {
        return {
          quote: roundNum(bids.quote, selectedAssets.quote.precision),
          base: roundNum(bids.base, selectedAssets.base.precision),
          isBuyOrder: true,
          price:
            Number(bids.price) <= Number(bids.minPrice)
              ? bids.price
              : (Number(bids.price) - threshold).toFixed(
                  Math.log10(Math.round(1 / threshold))
                ),
        } as Order;
      });
    },
    [roundNum]
  );

  const asksRows: Order[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      const groupedAsks = groupAsksByThreshold(asks, selectedAssets, threshold);
      return groupedAsks;
    } else {
      return [];
    }
  }, [asks, threshold, loadingSelectedPair, selectedAssets]);

  const bidsRows: Order[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      const groupedBids = groupBidsByThreshold(bids, selectedAssets, threshold);
      return groupedBids;
    } else {
      return [];
    }
  }, [bids, threshold, loadingSelectedPair, selectedAssets]);

  const orderColumns: OrderColumn[] = useMemo(() => {
    const baseSymbol = currentPair.split("_")[0];
    const quoteSymbol = currentPair.split("_")[1];
    return [
      {
        title: `${counterpart.translate("tableHead.price")} (${quoteSymbol})`,
        fixed: true,
        dataIndex: "price",
        key: "price",
      },
      {
        title: `${counterpart.translate("tableHead.amount")} (${baseSymbol})`,
        fixed: true,
        dataIndex: "base",
        key: "base",
      },
      {
        title: `${counterpart.translate("tableHead.total")} (${quoteSymbol})`,
        dataIndex: "quote",
        key: "quote",
        fixed: true,
      },
    ] as OrderColumn[];
  }, [currentPair]);

  const handleFilterChange = useCallback(
    (type: FilterType) => {
      setFilter(type);
    },
    [setFilter]
  );

  const thresholdValues = useMemo(() => {
    if (selectedAssets && !loadingSelectedPair) {
      const values = [];
      for (
        let power = 1;
        power <= selectedAssets.quote.precision - 2;
        power++
      ) {
        const value = 1 / Math.pow(10, power);
        values.push(value.toFixed(power));
      }
      console.log("values", values);
      return values;
    } else {
      return ["0.0001"];
    }
  }, [selectedAssets, loadingSelectedPair]);

  const specifyTableScroll = useCallback(
    (orders: Order[]) => {
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
    (tradeHistory?: TradeHistoryRow) => {
      if (tradeHistory) {
        return tradeHistory.isBuyOrder ? "buy" : "sell";
      } else {
        return "";
      }
    },
    []
  );

  const specifyAsksTableRowClassName = useCallback(
    (record: any) => {
      const item = record as Order;
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
      const item = record as Order;
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
    handleThresholdChange,
    threshold,
    asksRows,
    bidsRows,
    filter,
    handleFilterChange,
    thresholdValues,
    specifyTableHeight,
    specifyTableScroll,
    specifyLastTradeClassName,
    specifyAsksTableRowClassName,
    specifyBidsTableRowClassName,
  };
}
