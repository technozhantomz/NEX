import { useCallback, useEffect, useState } from "react";

import { Asset } from "../../../../../common/types/Asset";
import { usePeerplaysApi } from "../../../../peerplaysApi";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

import { Order, OrderType, UseOrderBookResult } from "./uesOrderBook.types";

export function useOrderBook(): UseOrderBookResult {
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("total");
  const { currentBase, currentQuote } = usePairSelect();
  const { dbApi } = usePeerplaysApi();

  const handleFilterChange = useCallback(
    (type: OrderType) => {
      setOrderType(type);
    },
    [setOrderType]
  );

  const handleThresholdChange = useCallback(
    (value: string) => {
      setBids(bids.filter((bid) => bid.price > value));
      setAsks(asks.filter((ask) => ask.price > value));
    },
    [asks, bids, setAsks, setBids]
  );

  const getOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      const { asks, bids } = await dbApi("get_order_book", [
        base.symbol,
        quote.symbol,
        50,
      ]);
      setAsks(asks as Order[]);
      setBids(bids as Order[]);
    },
    [dbApi, setAsks, setBids]
  );
  useEffect(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getOrderBook(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getOrderBook]);
  return {
    asks,
    bids,
    orderType,
    handleThresholdChange,
    handleFilterChange,
  };
}
