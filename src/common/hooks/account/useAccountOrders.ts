import counterpart from "counterpart";
import { uniq } from "lodash";
import { useCallback } from "react";

import { defaultToken } from "../../../api/params";
import { createUserOrderColumns, UserOrderColumnType } from "../../components";
import { useAssetsContext, useUserContext } from "../../providers";
import { Asset, History, LimitOrder, OrderTableRow } from "../../types";
import { useAsset } from "../asset";
import { useBlockchain } from "../blockchain";
import { useFormDate } from "../utils";

import { useAccount } from "./useAccount";
import { useAccountHistory } from "./useAccountHistory";
import { UseAccountOrdersResult } from "./useAccountOrders.types";

export function useAccountOrders(): UseAccountOrdersResult {
  const { getFullAccount } = useAccount();
  const { getAccountHistoryById } = useAccountHistory();
  const { localStorageAccount, id } = useUserContext();
  const { getAllAssets, setPrecision, ceilPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { formLocalDate } = useFormDate();
  const { getBlockHeader } = useBlockchain();

  const formFilledLimitOrderRow = useCallback(
    async (
      filledOrder: History,
      base: Asset,
      defaultAsset: Asset,
      openOrder?: LimitOrder
    ) => {
      const blockHeader = await getBlockHeader(filledOrder.block_num);
      const operationDetails = filledOrder.op[1];
      let amount = 0;
      let total = 0;
      let filled = "";
      let numberdFilled = 100;
      // buy history (asset/PPY)
      if (operationDetails.receives.asset_id === base.id) {
        amount = setPrecision(
          false,
          operationDetails.receives.amount,
          base.precision
        );

        total = setPrecision(
          false,
          operationDetails.pays.amount,
          defaultAsset.precision
        );

        //sell history (asset/ppy)
      } else {
        amount = setPrecision(
          false,
          operationDetails.pays.amount,
          base.precision
        );

        total = setPrecision(
          false,
          operationDetails.receives.amount,
          defaultAsset.precision
        );
      }
      const price = ceilPrecision(total / amount, defaultAsset.precision);
      if (openOrder) {
        numberdFilled =
          (operationDetails.pays.amount / openOrder.sell_price.base.amount) *
          100;
        filled = `${numberdFilled.toFixed(1)}%`;
      } else {
        filled = "100%";
      }
      return {
        key: filledOrder.id,
        date: blockHeader
          ? formLocalDate(blockHeader.timestamp, [
              "date",
              "month",
              "year",
              "time",
            ])
          : "",
        pair: `${base.symbol}_${defaultToken}`,
        type: counterpart.translate("general.limit"),
        side:
          operationDetails.receives.asset_id === base.id
            ? counterpart.translate("pages.profile.orders_tab.buy")
            : counterpart.translate("pages.profile.orders_tab.sell"),
        price: `${price} ${defaultAsset.symbol}`,
        amount: `${amount} ${base.symbol}`,
        total: `${total} ${defaultAsset.symbol}`,
        filled: filled,
        statusActions:
          numberdFilled === 100
            ? counterpart.translate("pages.profile.orders_tab.complete")
            : counterpart.translate("pages.profile.orders_tab.partial"),
      } as OrderTableRow;
    },
    [getBlockHeader, setPrecision, formLocalDate, defaultToken]
  );

  const formOpenLimitOrderRow = useCallback(
    (openOrder: LimitOrder, base: Asset, defaultAsset: Asset) => {
      let price = "";
      let amount = "";
      let total = "";
      // sell (asset/PPY)
      if (openOrder.sell_price.base.asset_id === base.id) {
        amount = String(
          setPrecision(false, openOrder.sell_price.base.amount, base.precision)
        );
        price = ceilPrecision(
          setPrecision(
            false,
            openOrder.sell_price.quote.amount,
            defaultAsset.precision
          ) /
            setPrecision(
              false,
              openOrder.sell_price.base.amount,
              base.precision
            ),

          defaultAsset.precision
        );
        total = String(
          setPrecision(
            false,
            openOrder.sell_price.quote.amount,
            defaultAsset.precision
          )
        );
        //buy (asset/ppy)
      } else {
        amount = String(
          setPrecision(false, openOrder.sell_price.quote.amount, base.precision)
        );
        price = ceilPrecision(
          setPrecision(
            false,
            openOrder.sell_price.base.amount,
            defaultAsset.precision
          ) /
            setPrecision(
              false,
              openOrder.sell_price.quote.amount,
              base.precision
            ),
          defaultAsset.precision
        );
        total = String(
          setPrecision(
            false,
            openOrder.sell_price.base.amount,
            defaultAsset.precision
          )
        );
      }
      const filled = `${(
        ((Number(openOrder.sell_price.base.amount) -
          Number(openOrder.for_sale)) /
          Number(openOrder.sell_price.base.amount)) *
        100
      ).toFixed(1)}%`;
      return {
        key: openOrder.id,
        date: formLocalDate(openOrder.expiration, [
          "date",
          "month",
          "year",
          "time",
        ]),
        pair: `${base.symbol}_${defaultToken}`,
        type: counterpart.translate("general.limit"),
        side:
          openOrder.sell_price.base.asset_id === defaultAsset.id
            ? counterpart.translate("pages.profile.orders_tab.buy")
            : counterpart.translate("pages.profile.orders_tab.sell"),
        price: `${price} ${defaultAsset.symbol}`,
        amount: `${amount} ${base.symbol}`,
        total: `${total} ${defaultAsset.symbol}`,
        filled: filled,
      } as OrderTableRow;
    },
    [formLocalDate, defaultToken, setPrecision, ceilPrecision]
  );

  const getOrdersRows = useCallback(async () => {
    try {
      const [fullAccount, userOperationsHistories, allAssets] =
        await Promise.all([
          getFullAccount(localStorageAccount, false),
          getAccountHistoryById(id),
          getAllAssets(),
        ]);
      if (fullAccount && allAssets && defaultAsset) {
        const limitOrders = fullAccount.limit_orders;
        const openOrdersRows = limitOrders.map((order) => {
          const base = allAssets.find(
            (asset) =>
              (asset.id === order.sell_price.base.asset_id ||
                asset.id === order.sell_price.quote.asset_id) &&
              asset.id !== defaultAsset.id
          ) as Asset;
          return formOpenLimitOrderRow(order, base, defaultAsset);
        });

        const filledOrdersHistories = userOperationsHistories.filter(
          (userOperationHistory) => userOperationHistory.op[0] === 4
        );
        const historiesRows = await Promise.all(
          filledOrdersHistories.map((filledOrder) => {
            const operationDetails = filledOrder.op[1];
            const base = allAssets.find(
              (asset) =>
                (asset.id === operationDetails.receives.asset_id ||
                  asset.id === operationDetails.pays.asset_id) &&
                asset.id !== defaultAsset.id
            ) as Asset;
            const openOrder = limitOrders.find(
              (order) => order.id === operationDetails.order_id
            );
            return formFilledLimitOrderRow(
              filledOrder,
              base,
              defaultAsset,
              openOrder
            );
          })
        );

        return {
          openOrdersRows,
          historiesRows,
        };
      } else {
        return {
          openOrdersRows: [] as OrderTableRow[],
          historiesRows: [] as OrderTableRow[],
        };
      }
    } catch (e) {
      console.log(e);
      return {
        openOrdersRows: [] as OrderTableRow[],
        historiesRows: [] as OrderTableRow[],
      };
    }
  }, [
    getFullAccount,
    localStorageAccount,
    getAccountHistoryById,
    id,
    getAllAssets,
    defaultAsset,
    formOpenLimitOrderRow,
  ]);

  const updateOrdersHistoriesColumns = useCallback(
    (historiesRows: OrderTableRow[]) => {
      const historyColumns = createUserOrderColumns(true);
      const allPairs = historiesRows.map((history) => history.pair);
      const allTypes = historiesRows.map((history) => history.type);
      const uniqPairs = uniq(allPairs);
      const uniqTypes = uniq(allTypes);
      const updatedColumns: UserOrderColumnType[] = historyColumns.map(
        (column) => {
          switch (true) {
            case column.key === "pair":
              column.filters = uniqPairs.map((pair) => {
                return { text: pair, value: pair };
              });
              break;
            case column.key === "type":
              column.filters = uniqTypes.map((type) => {
                return { text: type, value: type };
              });
              break;
          }
          return { ...column };
        }
      );
      return updatedColumns;
    },
    [createUserOrderColumns]
  );

  const updateOpenOrdersColumns = useCallback(
    (
      openOrdersRows: OrderTableRow[],
      onCancelClick: (orderId: string) => void
    ) => {
      const openOrdersColumns = createUserOrderColumns(false, onCancelClick);
      const allPairs = openOrdersRows.map((order) => order.pair);
      const allTypes = openOrdersRows.map((order) => order.type);
      const uniqPairs = uniq(allPairs);
      const uniqTypes = uniq(allTypes);
      const updatedColumns: UserOrderColumnType[] = openOrdersColumns.map(
        (column) => {
          switch (true) {
            case column.key === "pair":
              column.filters = uniqPairs.map((pair) => {
                return { text: pair, value: pair };
              });
              break;
            case column.key === "type":
              column.filters = uniqTypes.map((type) => {
                return { text: type, value: type };
              });
              break;
          }
          return { ...column };
        }
      );
      return updatedColumns;
    },
    [createUserOrderColumns]
  );

  return {
    getOrdersRows,
    updateOrdersHistoriesColumns,
    updateOpenOrdersColumns,
  };
}
