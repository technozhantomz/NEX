import counterpart from "counterpart";

import { UserOrderColumnType } from "../../../../common/components";
import { OrderTableRow } from "../../../../common/types";
import { UserOrdersTable } from "../UserOrdersTable";

import * as Styled from "./UserOrdersTabs.styled";

type Props = {
  userOpenOrdersRows: OrderTableRow[];
  userOrderHistoryRows: OrderTableRow[];
  userOpenOrdersColumns: UserOrderColumnType[];
  userOrdersHistoriesColumns: UserOrderColumnType[];
  loadingUserOrders: boolean;
};

export function UsersOrdersTabs({
  userOpenOrdersRows,
  userOrderHistoryRows,
  userOpenOrdersColumns,
  userOrdersHistoriesColumns,
  loadingUserOrders,
}: Props): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`pages.market.my_open_orders`),
      key: "user-open-orders",
      children: (
        <Styled.TabContentContainer>
          <UserOrdersTable
            userOrdersRows={userOpenOrdersRows}
            userOrdersColumns={userOpenOrdersColumns}
            loadingUserOrders={loadingUserOrders}
          />
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.my_order_history`),
      key: "user-orders-history",
      children: (
        <Styled.TabContentContainer>
          <UserOrdersTable
            userOrdersRows={userOrderHistoryRows}
            userOrdersColumns={userOrdersHistoriesColumns}
            loadingUserOrders={loadingUserOrders}
          />
        </Styled.TabContentContainer>
      ),
    },
  ];
  return (
    <Styled.Tabs
      defaultActiveKey="open-orders"
      centered={true}
      items={tabItems}
    />
  );
}
