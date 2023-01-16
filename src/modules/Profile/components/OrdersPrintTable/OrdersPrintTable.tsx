import { ColumnsType } from "antd/lib/table";
import React from "react";

import { UserOrderColumnType } from "../../../../common/components";
import { OrderTableRow } from "../../../../common/types";
import * as Styled from "../OrdersTable/OrdersTable.styled";

type Props = {
  loading: boolean;
  ordersColumns: UserOrderColumnType[];
  ordersTableRows: OrderTableRow[];
};

export const OrdersPrintTable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <Styled.OrdersTable
          dataSource={props.ordersTableRows}
          columns={props.ordersColumns as ColumnsType<UserOrderColumnType>}
          loading={props.loading}
          pagination={false}
        />
      </div>
    );
  }
);
