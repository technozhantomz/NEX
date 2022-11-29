import { useCallback, useEffect, useState } from "react";

import { useAccount, useAsset, useFormDate } from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset, LimitOrder } from "../../../../../common/types";
import { OrderRow } from "../../../../Market/types";
import {
  createOpenOrdersColumns,
  OpenOrdersColumnType,
} from "../../OpenOrdersColumns";

import {
  OpenOrdersTableRow,
  UseOpenOrdersTabResult,
} from "./useOpenOrdersTable.types";

export function useOpenOrdersTable(): UseOpenOrdersTabResult {
  const [openOrdersTableRows, setOpenOrdersTableRows] = useState<
    OpenOrdersTableRow[]
  >([]);
  const [openOrdersColumns, setOpenOrdersColumns] = useState<
    OpenOrdersColumnType[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { localStorageAccount } = useUserContext();
  const { formLocalDate } = useFormDate();
  const { setPrecision, ceilPrecision } = useAsset();
  const { getFullAccount } = useAccount();

  const formUserOrderRow = useCallback(
    (baseAsset: Asset, quoteAsset: Asset, limitOrder: LimitOrder): OrderRow => {
      console.log(baseAsset, "baseAsset");
      console.log(quoteAsset, "quoteAsset");
      console.log(limitOrder, "limitOrder");
      let price: string,
        base: string,
        quote: string,
        isBuyOrder = false;
      const key = limitOrder.id;
      const expiration = formLocalDate(limitOrder.expiration);
      if (baseAsset.id === limitOrder.sell_price.base.asset_id) {
        base = String(
          setPrecision(false, limitOrder.for_sale, baseAsset.precision)
        );
        price = ceilPrecision(
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

        quote = String(
          setPrecision(
            false,
            limitOrder.sell_price.quote.amount,
            quoteAsset.precision
          )
        );
        isBuyOrder = true;
      } else {
        quote = String(
          setPrecision(false, limitOrder.for_sale, quoteAsset.precision)
        );
        price = ceilPrecision(
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
        base = String(
          setPrecision(
            false,
            limitOrder.sell_price.quote.amount,
            baseAsset.precision
          )
        );
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
    [setPrecision, ceilPrecision]
  );

  const getUserOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoading(false);
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
          setOpenOrdersTableRows(userOrderRows);
          setLoading(false);
        } else {
          setOpenOrdersTableRows([]);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [getFullAccount, formUserOrderRow, setOpenOrdersTableRows, setLoading]
  );

  const getOpenOrdersRow = useCallback(() => {
    try {
      if (localStorageAccount) {
        const openOrdersTableRows = {
          key: "key",
          date: "date",
          pair: "pair",
          type: "type",
          side: "side",
          price: "price",
          amount: "amount",
          filled: "filled",
          total: "total",
          statusActions: "statusActions",
        };

        const updatedColumns = createOpenOrdersColumns.map((column) => {
          return { ...column };
        });
        setOpenOrdersColumns(updatedColumns);
        setOpenOrdersTableRows(openOrdersTableRows);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [setOpenOrdersColumns, setLoading, setOpenOrdersTableRows]);

  useEffect(() => {
    getUserOrderBook();
    getOpenOrdersRow();
  }, []);

  return {
    loading,
    openOrdersColumns,
    openOrdersTableRows,
  };
}
