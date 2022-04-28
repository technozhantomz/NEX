import { useEffect, useState } from "react";

import { Asset } from "../../../../../common/types";
import { OrderHistoryColumn } from "../../../types";

import { UseHistoryResult } from "./useHistory.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  getHistory: (base: Asset, quote: Asset) => Promise<void>;
  getUserHistory: (base: Asset, quote: Asset) => Promise<void>;
};

export function useHistory({
  currentBase,
  currentQuote,
  loadingSelectedPair,
  getHistory,
  getUserHistory,
}: Args): UseHistoryResult {
  const [columns, setColumns] = useState<OrderHistoryColumn[]>([]);

  useEffect(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      setColumns([
        {
          title: currentBase.symbol,
          dataIndex: "base",
          key: "base",
        },
        {
          title: currentQuote.symbol,
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
      ]);
      getHistory(currentBase, currentQuote);
      getUserHistory(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getHistory,
    getUserHistory,
  ]);

  return {
    columns,
  };
}
