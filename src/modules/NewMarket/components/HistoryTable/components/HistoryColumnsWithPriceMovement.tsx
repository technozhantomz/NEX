import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import { TradeHistoryRow } from "../../../../../common/types";
import { TradeHistoryColumn } from "../hooks/useHistoryTable.types";

export const renderTradeHistoryColumnsWithPriceMovement = (
  historyColumns?: TradeHistoryColumn[]
): TradeHistoryColumn[] => {
  if (historyColumns) {
    return [
      {
        ...historyColumns[0],
        render: (_: any, record: TradeHistoryRow) => (
          <>
            {record.price}{" "}
            {record.isPriceUp !== undefined ? (
              record.isPriceUp ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )
            ) : (
              ""
            )}
          </>
        ),
      },
      {
        ...historyColumns[1],
      },
      { ...historyColumns[2] },
    ];
  } else {
    return [];
  }
};
