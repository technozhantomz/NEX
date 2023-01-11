import { ColumnsType } from "antd/lib/table";

import { UserOrderColumnType } from "../../../../common/components";
import { OrderTableRow } from "../../../../common/types";

import * as Styled from "./UserOrdersTable.styled";
import { useUserOpenOrders } from "./hooks";

type Props = {
  userOrdersRows: OrderTableRow[];
  userOrdersColumns: UserOrderColumnType[];
  loadingUserOrders: boolean;
};

export function UserOrdersTable({
  userOrdersRows,
  userOrdersColumns,
  loadingUserOrders,
}: Props): JSX.Element {
  const { defineTableRowClassName } = useUserOpenOrders();
  const desktopScroll = {
    y: 300,
    x: 940,
    scrollToFirstRowOnChange: false,
  };
  const scroll = userOrdersRows.length === 0 ? undefined : desktopScroll;
  return (
    <Styled.OrdersTable
      rowClassName={defineTableRowClassName}
      dataSource={userOrdersRows}
      columns={userOrdersColumns as ColumnsType<OrderTableRow>}
      loading={loadingUserOrders}
      pagination={false}
      scroll={loadingUserOrders ? undefined : scroll}
      size="small"
    />
  );
}
