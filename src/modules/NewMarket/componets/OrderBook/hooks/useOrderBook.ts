import counterpart from "counterpart";
import { useMemo } from "react";

import { OrderColumn, Order, OrderRow, PairAssets } from "../../../types";

import { UseOrderResult } from "./useOrderBook.types";

type Args = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  loadingAsksBids: boolean;
};

export function useOrderBook({
  selectedAssets,
  loadingSelectedPair,
  loadingAsksBids,
}: Args): UseOrderResult {
  const columns: OrderColumn[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets && !loadingAsksBids) {
      return [
        {
          title: `${counterpart.translate("tableHead.price")} (${
            '$'
          })`,
          dataIndex: "price",
          key: "price",
          render: (value: any) =>
      typeof value === "number" ? value.toFixed(4) : Number(value).toFixed(3),
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${
            selectedAssets.quote.symbol
          })`,
          dataIndex: "quote",
          key: "quote",
          render: (value: any) =>
      typeof value === "number" ? value.toFixed(4) : Number(value).toFixed(4),
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${
            selectedAssets.base.symbol
          })`,
          dataIndex: "quote",
          key: "quote",
          render: (value: any) =>
      typeof value === "number" ? value.toFixed(4) : Number(value).toFixed(4),
        },
      ];
    } else {
      return [];
    }
  }, [loadingAsksBids, loadingSelectedPair, selectedAssets]);

  return {
    columns,
  };
}
