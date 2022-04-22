import { useCallback, useEffect, useState } from "react";

import {
  roundNum,
  useAccount,
  useAsset,
  useFormDate,
} from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset, LimitOrder } from "../../../../../common/types";

import {
  Order,
  OrderColumn,
  OrderRow,
  OrderType,
  UseOrderBookResult,
} from "./uesOrderBook.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
};

export function useOrderBook({
  currentBase,
  currentQuote,
  loadingSelectedPair,
}: Args): UseOrderBookResult {
  // asks are buy orders
  const [asks, setAsks] = useState<Order[]>([]);
  // bids are sell orders
  const [bids, setBids] = useState<Order[]>([]);
  const [ordersRows, setOrdersRows] = useState<OrderRow[]>([]);
  const [userOrdersRows, setUserOrdersRows] = useState<OrderRow[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<number>(0.001);
  const [orderColumns, setOrderColumns] = useState<OrderColumn[]>([]);
  const [userOrderColumns, setUserOrderColumns] = useState<OrderColumn[]>([]);
  const [loadingOrderRows, setLoadingOrderRows] = useState<boolean>(true);
  const [loadingUserOrderRows, setLoadingUserOrderRows] =
    useState<boolean>(true);
  //const [tableScroll, setTableScroll] = useState<TableScroll>();

  const { localStorageAccount } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { setPrecision } = useAsset();
  const { getFullAccount } = useAccount();

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
      try {
        setLoadingOrderRows(true);
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
        setLoadingOrderRows(false);
      } catch (e) {
        console.log(e);
        setLoadingOrderRows(false);
      }
    },
    [dbApi, setAsks, setBids, setLoadingOrderRows]
  );

  const formUserOrderRow = useCallback(
    (baseAsset: Asset, quoteAsset: Asset, limitOrder: LimitOrder): OrderRow => {
      let price = 0,
        base = 0,
        quote = 0,
        isBuyOrder = false;
      const key = limitOrder.id;
      const expiration = useFormDate(limitOrder.expiration);
      if (baseAsset.id === limitOrder.sell_price.base.asset_id) {
        base = setPrecision(false, limitOrder.for_sale, baseAsset.precision);
        price = roundNum(
          setPrecision(
            false,
            limitOrder.sell_price.base.amount,
            baseAsset.precision
          ) /
            setPrecision(
              false,
              limitOrder.sell_price.quote.amount,
              quoteAsset.precision
            ),
          baseAsset.precision
        );

        quote = roundNum(base / price, quoteAsset.precision);
        isBuyOrder = true;
      } else {
        quote = setPrecision(false, limitOrder.for_sale, quoteAsset.precision);
        price = roundNum(
          setPrecision(
            false,
            limitOrder.sell_price.quote.amount,
            baseAsset.precision
          ) /
            setPrecision(
              false,
              limitOrder.sell_price.base.amount,
              quoteAsset.precision
            ),
          baseAsset.precision
        );
        base = roundNum(price * quote, baseAsset.precision);
        isBuyOrder = false;
      }

      return {
        key,
        base,
        quote,
        price,
        isBuyOrder,
        expiration,
      } as OrderRow;
    },
    [setPrecision, roundNum]
  );

  const getUserOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingUserOrderRows(true);
        const fullAccount = await getFullAccount(localStorageAccount, false);
        if (fullAccount !== undefined) {
          const limitOrders = fullAccount.limit_orders;
          const limitOrdersForThePair = limitOrders.filter((limitOrder) => {
            const orderAssetsIds = [
              limitOrder.sell_price.base.asset_id,
              limitOrder.sell_price.quote.asset_id,
            ];
            return (
              orderAssetsIds.includes(base.id) &&
              orderAssetsIds.includes(quote.id)
            );
          });
          const userOrderRows = limitOrdersForThePair.map((limitOrder) => {
            return formUserOrderRow(base, quote, limitOrder);
          });
          setUserOrdersRows(userOrderRows);
          setLoadingUserOrderRows(false);
        }
      } catch (e) {
        console.log(e);
        setLoadingUserOrderRows(false);
      }
    },
    [
      getFullAccount,
      formUserOrderRow,
      setUserOrdersRows,
      setLoadingUserOrderRows,
    ]
  );

  const refreshOrderBook = useCallback(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      getOrderBook(currentBase, currentQuote);
      getUserOrderBook(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getOrderBook,
    getUserOrderBook,
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
      getOrderBook(currentBase, currentQuote);
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
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
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
    loadingSelectedPair,
    currentBase,
    currentQuote,
  ]);

  return {
    asks,
    bids,
    orderType,
    threshold,
    ordersRows,
    loadingOrderRows,
    userOrdersRows,
    loadingUserOrderRows,
    refreshOrderBook,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
    userOrderColumns,
  };
}
