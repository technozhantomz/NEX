import counterpart from "counterpart";

import { UserOrdersTable } from "../UserOrdersTable";

import * as Styled from "./UserOrdersTabs.styled";

export function UsersOrdersTabs(): JSX.Element {
  const tabItems = [
    {
      label: counterpart.translate(`pages.market.my_open_orders`),
      key: "user-open-orders",
      children: (
        <Styled.TabContentContainer>
          <UserOrdersTable isOpen={true} />
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.my_order_history`),
      key: "user-orders-history",
      children: (
        <Styled.TabContentContainer>
          <UserOrdersTable />
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
