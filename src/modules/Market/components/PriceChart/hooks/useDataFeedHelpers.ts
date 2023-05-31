import { useCallback } from "react";

import { defaultToken } from "../../../../../api/params";
import { useAsset, useMarketHistory } from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { OrderHistory } from "../../../../../common/types";

import {
  ExchangeSymbol,
  ExchangeSymbols,
  UseDataFeedHelpersResult,
} from "./useDataFeedHelpers.types";

export function useDataFeedHelpers(): UseDataFeedHelpersResult {
  const { getAllAssets } = useAsset();
  const { getFillOrderHistory } = useMarketHistory();
  const { setPrecision } = useAsset();
  const { selectedPair } = useMarketContext();

  const generateSymbol = (
    exchange: string,
    fromSymbol: string,
    toSymbol: string
  ): ExchangeSymbol => {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
      short,
      full: `${exchange}:${short}`,
    };
  };

  const getOrderAmmount = useCallback(
    (order: OrderHistory) => {
      if (selectedPair) {
        let orderAmmount;
        const orderOps = order.op;
        const base = selectedPair.base;
        if (orderOps.pays.asset_id === base.id) {
          orderAmmount = setPrecision(
            false,
            orderOps.pays.amount,
            base.precision
          );
          //this is buy orders
        } else {
          orderAmmount = setPrecision(
            false,
            orderOps.receives.amount,
            base.precision
          );
        }
        return orderAmmount;
      }
    },
    [selectedPair]
  );

  const getAllSymbols = async () => {
    let allSymbols = [];
    const allAssets = await getAllAssets();
    const symbols = allAssets?.map((asset) => {
      if (asset.symbol !== defaultToken) {
        const symbol = generateSymbol(
          "Homepesa-wallet",
          defaultToken as string,
          asset.symbol
        );
        return {
          symbol: symbol.short,
          full_name: symbol.full,
          description: symbol.short,
          exchange: "Homepesa-wallet",
          type: "crypto",
        };
      }
    });
    allSymbols = [...(symbols as ExchangeSymbols[])];
    return allSymbols;
  };

  const getChartFeed = useCallback(async () => {
    if (selectedPair) {
      const histories = (await getFillOrderHistory(
        selectedPair,
        10000
      )) as OrderHistory[];
      if (histories) {
        const groupedHistories = new Map<number, OrderHistory[]>();
        histories.forEach((order) => {
          const time = new Date(order.time).getTime();
          let group = groupedHistories.get(time);
          if (!group) {
            group = [];
            groupedHistories.set(time, group);
          }
          group.push(order);
        });
        console.log(groupedHistories);
        const processedOrders = Array.from(groupedHistories.entries()).map(
          ([time, group]) => {
            const open = getOrderAmmount(group[0]);
            const close = getOrderAmmount(group[group.length - 1]);
            const high = Math.max(
              ...group.map((order: OrderHistory) => {
                return getOrderAmmount(order) as number;
              })
            );
            const low = Math.min(
              ...group.map((order: OrderHistory) => {
                return getOrderAmmount(order) as number;
              })
            );
            return Object.assign({
              time,
              open,
              close,
              high,
              low,
            });
          }
        );
        console.log(processedOrders);
        return processedOrders;
      }
    }
  }, [selectedPair]);

  return { getAllSymbols, getChartFeed };
}
