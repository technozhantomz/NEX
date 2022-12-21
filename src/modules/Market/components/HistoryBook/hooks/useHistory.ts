import counterpart from "counterpart";
import { useMemo } from "react";

import { OrderHistoryColumn, PairAssets } from "../../../types";

import { UseHistoryResult } from "./useHistory.types";

type Args = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  forUser: boolean;
};

export function useHistory({
  selectedAssets,
  loadingSelectedPair,
  forUser,
}: Args): UseHistoryResult {
  const columns: OrderHistoryColumn[] = useMemo(() => {
    if (!loadingSelectedPair && selectedAssets) {
      if (forUser) {
        return [
          {
            title: counterpart.translate(`tableHead.price`),
            dataIndex: "price",
            key: "price",
          },
          {
            title: selectedAssets.quote.symbol,
            dataIndex: "quote",
            key: "quote",
          },
          {
            title: selectedAssets.base.symbol,
            dataIndex: "base",
            key: "base",
          },
          {
            title: counterpart.translate(`tableHead.filled`),
            dataIndex: "filled",
            key: "filled",
          },
          {
            title: counterpart.translate(`tableHead.date`),
            dataIndex: "date",
            key: "date",
          },
        ];
      } else {
        return [
          {
            title: counterpart.translate(`tableHead.price`),
            dataIndex: "price",
            key: "price",
          },
          {
            title: selectedAssets.quote.symbol,
            dataIndex: "quote",
            key: "quote",
          },
          {
            title: selectedAssets.base.symbol,
            dataIndex: "base",
            key: "base",
          },
          {
            title: counterpart.translate(`tableHead.date`),
            dataIndex: "date",
            key: "date",
          },
        ];
      }
    } else {
      return [];
    }
  }, [loadingSelectedPair, selectedAssets, forUser]);

  return {
    columns,
  };
}
