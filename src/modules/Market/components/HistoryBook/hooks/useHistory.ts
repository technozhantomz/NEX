import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { Asset } from "../../../../../common/types";
import { OrderHistoryColumn } from "../../../types";

import { UseHistoryResult } from "./useHistory.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
};

export function useHistory({
  currentBase,
  currentQuote,
  loadingSelectedPair,
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
          title: counterpart.translate(`tableHead.price`),
          dataIndex: "price",
          key: "price",
        },
        {
          title: counterpart.translate(`tableHead.date`),
          dataIndex: "date",
          key: "date",
        },
      ]);
    }
  }, [loadingSelectedPair, currentBase, currentQuote]);

  return {
    columns,
  };
}
