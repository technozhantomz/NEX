import { useCallback, useEffect, useState } from "react";

import { useUserContext } from "../../../../../common/components";
import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useAsset, useFormDate } from "../../../../../common/hooks";
import { roundNum } from "../../../../../common/hooks/useRoundNum";
import { Asset } from "../../../../../common/types/Asset";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

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
  const { getAssetById, setPrecision } = useAsset();

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
      // console.log("this is base", base);
      // console.log("this is quote", quote);
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
      dbApi("get_full_accounts", [[localStorageAccount], false])
        .then((e) =>
          e[0][1].limit_orders.filter((e) => {
            const prices = e.sell_price;
            const orderAssets = [prices.base.asset_id, prices.quote.asset_id];
            return (
              orderAssets.includes(base.id) && orderAssets.includes(quote.id)
            );
          })
        )
        .then(async (orders) => {
          if (!orders.length) return false;

          const rows = await Promise.all(
            orders.map(async (order) => {
              console.log(order);
              // const expiration = useFormDate(order.expiration);

              // const baseAsset = await getAssetById(order.sell_price.base.asset_id);
              // const quoteAsset = await getAssetById(order.sell_price.quote.asset_id);

              // const orderVal = setPrecision(false, order.for_sale, );

              // let price = 0,
              //     base = 0,
              //     quote = 0;

              // if(base.id === baseAsset.id){
              //     base = orderVal;
              //     price = baseAsset.calculatePrice(quoteAsset);
              //     quote = roundNum(base / price);
              // } else {
              //     quote = orderVal;
              //     price = quoteAsset.calculatePrice(baseAsset);
              //     base = roundNum(price * quote);
              // }

              // return { expiration, base, quote, price, action }
            })
          );
          console.log(rows);
          // return {rows, tableHead};
        });
    },
    [dbApi, setAsks, setBids]
  );

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
  }, [currentBase, currentQuote, getOrderBook]);

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
    handleThresholdChange,
    handleFilterChange,
    columns,
  };
}
