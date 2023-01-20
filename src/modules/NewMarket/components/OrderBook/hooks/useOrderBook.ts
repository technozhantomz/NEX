import counterpart from "counterpart";
import { cloneDeep, max } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAsset, useMarketHistory } from "../../../../../common/hooks";
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
  const { getHistoryTableRows } = useMarketHistory();
  const { selectedPair, marketHistory, asks, bids } = useMarketContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<number>(0.001);
  const [filter, setFilter] = useState<FilterType>("total");
  const [prevPair, setPrevPair] = useState<string>(currentPair);
  const [lastTrade, setLastTrade] = useState<TradeHistoryRow>({
    key: "",
    price: "",
    amount: 0,
    time: "",
    isBuyOrder: false,
  });
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

      return groupedAsks.map((asks) => {
        return {
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
    },
    [roundNum]
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

      return groupedBids.map((bids) => {
        return {
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
    },
    [roundNum]
  );

  const asksRows: MarketOrder[] = useMemo(() => {
    if (selectedPair) {
      const groupedAsks = groupAsksByThreshold(asks, selectedPair, threshold);
      return groupedAsks;
    } else {
      return [];
    }
  }, [asks, threshold, selectedPair]);

  const bidsRows: MarketOrder[] = useMemo(() => {
    if (selectedPair) {
      const groupedBids = groupBidsByThreshold(bids, selectedPair, threshold);
      return groupedBids;
    } else {
      return [];
    }
  }, [bids, threshold, selectedPair]);

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

  const thresholdValues = useMemo(() => {
    if (selectedPair) {
      const values = [];
      for (let power = 1; power <= selectedPair.quote.precision - 2; power++) {
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

  const getLastTrade = useCallback(async () => {
    setLoading(true);
    if (selectedPair && marketHistory) {
      try {
        const marketHistoryRows =
          (await getHistoryTableRows()) as TradeHistoryRow[];

        setLastTrade(marketHistoryRows[0]);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getLastTrade();
  }, [selectedPair, marketHistory]);

  return {
    orderColumns,
    threshold,
    asksRows,
    bidsRows,
    filter,
    lastTrade,
    loading,
    thresholdValues,
    handleThresholdChange,
    handleFilterChange,
    specifyTableHeight,
    specifyTableScroll,
    specifyLastTradeClassName,
    specifyAsksTableRowClassName,
    specifyBidsTableRowClassName,
  };
}
