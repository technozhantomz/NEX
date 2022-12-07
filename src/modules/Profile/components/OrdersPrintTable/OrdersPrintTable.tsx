import { ColumnsType } from "antd/lib/table";
import React from "react";

import { OrderColumnType } from "..";
import { OrderTableRow } from "../../types";
import * as Styled from "../OrdersTable/OrdersTable.styled";

type Props = {
  loading: boolean;
  ordersColumns: OrderColumnType[];
  ordersTableRows: OrderTableRow[];
};

export const OrdersPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.OrdersTable
          dataSource={props.ordersTableRows}
          columns={props.ordersColumns as ColumnsType<OrderColumnType>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
