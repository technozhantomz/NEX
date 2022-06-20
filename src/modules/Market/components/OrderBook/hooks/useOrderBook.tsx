import { Space } from "antd";
import counterpart from "counterpart";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { roundNum } from "../../../../../common/hooks";
import { Asset } from "../../../../../common/types";
import { Order, OrderColumn, OrderRow, OrderType } from "../../../types";

import { UseOrderBookResult } from "./useOrderBook.types";

type OrderProps = {
  id: string;
};

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  getOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  asks: Order[];
  bids: Order[];
  setOrdersRows: Dispatch<SetStateAction<OrderRow[]>>;
  getUserOrderBook: (base: Asset, quote: Asset) => Promise<void>;
  showPasswordModal: () => void;
  handleFormFinish: (name: string, info: any) => void;
  setCurrentOrder: Dispatch<SetStateAction<OrderProps>>;
};

export function useOrderBook({
  currentBase,
  currentQuote,
  loadingSelectedPair,
  getOrderBook,
  asks,
  bids,
  setOrdersRows,
  getUserOrderBook,
  setCurrentOrder,
}: Args): UseOrderBookResult {
  const [orderType, setOrderType] = useState<OrderType>("total");
  const [threshold, setThreshold] = useState<number>(0.001);
  const [orderColumns, setOrderColumns] = useState<OrderColumn[]>([]);
  const [userOrderColumns, setUserOrderColumns] = useState<OrderColumn[]>([]);

  //const [tableScroll, setTableScroll] = useState<TableScroll>();

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

  const reduceOrdersByPrice = useCallback(
    (orders: Order[], currentBase: Asset, currentQuote: Asset) => {
      const reducedOrders = orders.reduce((previousOrders, currentOrder) => {
        const repeatedPriceIndex = previousOrders.findIndex(
          (previousOrder) =>
            roundNum(Number(previousOrder.price), currentBase.precision) ===
            roundNum(Number(currentOrder.price), currentBase.precision)
        );
        if (repeatedPriceIndex === -1) {
          previousOrders.push(currentOrder);
        } else {
          const orderWithRepeatedPrice = previousOrders[repeatedPriceIndex];
          previousOrders[repeatedPriceIndex] = {
            quote: String(
              roundNum(
                Number(orderWithRepeatedPrice.quote),
                currentQuote.precision
              ) + roundNum(Number(currentOrder.quote), currentQuote.precision)
            ),
            base: String(
              roundNum(
                Number(orderWithRepeatedPrice.base),
                currentBase.precision
              ) + roundNum(Number(currentOrder.base), currentBase.precision)
            ),
            price: String(
              roundNum(
                Number(orderWithRepeatedPrice.price),
                currentBase.precision
              )
            ),
            isBuyOrder: orderWithRepeatedPrice.isBuyOrder,
          };
        }
        return previousOrders;
      }, [] as Order[]);
      return reducedOrders;
    },
    [roundNum]
  );

  const selectOrdersForThresholdAndFilter = useCallback(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      let selectedOrders: Order[] = [];
      const reducedAsks = reduceOrdersByPrice(asks, currentBase, currentQuote);
      const reducedBids = reduceOrdersByPrice(bids, currentBase, currentQuote);
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
          quote: roundNum(Number(order.quote), currentQuote.precision),
          base: roundNum(Number(order.base), currentBase.precision),
          price: roundNum(Number(order.price), currentBase.precision),
          isBuyOrder: order.isBuyOrder,
        };
      });
      setOrdersRows(orders);
    }
  }, [
    orderType,
    asks,
    bids,
    threshold,
    loadingSelectedPair,
    currentBase,
    currentQuote,
    roundNum,
    setOrdersRows,
  ]);

  useEffect(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      setOrderColumns([
        {
          title: counterpart.translate(`tableHead.price`),
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
      getOrderBook(currentBase, currentQuote);
      // user section
      setUserOrderColumns([
        {
          title: counterpart.translate(`tableHead.price`),
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
          title: counterpart.translate(`tableHead.expiration`),
          dataIndex: "expiration",
          key: "expiration",
        },
        {
          title: "Action",
          dataIndex: "cancel",
          key: "cancel",
          render: (_, record) => (
            <Space size="middle">
              <div
                onClick={(e: any) => {
                  // showPasswordModal();
                  e.preventDefault();
                  setCurrentOrder({ id: record.key });
                }}
              >
                CANCEL
              </div>
            </Space>
          ),
        },
      ]);
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
    selectOrdersForThresholdAndFilter();
  }, [selectOrdersForThresholdAndFilter]);

  return {
    orderType,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    orderColumns,
    userOrderColumns,
  };
}
