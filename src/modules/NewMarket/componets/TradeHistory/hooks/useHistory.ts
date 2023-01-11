import counterpart from "counterpart";
import { useMemo } from "react";

import { OrderHistoryColumn, PairAssets } from "../../../types";

import { UseHistoryResult } from "./useHistory.types";

type Args = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
};

export function useHistory({
  selectedAssets,
  loadingSelectedPair,
}: Args): UseHistoryResult {
  const columns: OrderHistoryColumn[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      return [
        {
          title: `${counterpart.translate("tableHead.price")} (${
            selectedAssets.base.symbol
          })`,
          dataIndex: "base",
          key: "base",
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${
            selectedAssets.quote.symbol
          })`,
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: counterpart.translate(`tableHead.time`),
          dataIndex: "date",
          key: "date",
        },
      ];
    } else {
      return [];
    }
  }, [loadingSelectedPair, selectedAssets]);

  return {
    columns,
  };
}
