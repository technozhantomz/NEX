import { UserOrderColumnType } from "../../components";
import { OrderTableRow } from "../../types";

export type UseAccountOrdersResult = {
  getOrdersRows: () => Promise<{
    openOrdersRows: OrderTableRow[];
    historiesRows: OrderTableRow[];
  }>;
  updateOrdersHistoriesColumns: (
    historiesRows: OrderTableRow[]
  ) => UserOrderColumnType[];
  updateOpenOrdersColumns: (
    openOrdersRows: OrderTableRow[],
    onCancelClick: (orderId: string) => void
  ) => UserOrderColumnType[];
};
