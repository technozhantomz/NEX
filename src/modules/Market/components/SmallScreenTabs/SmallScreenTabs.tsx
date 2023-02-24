import counterpart from "counterpart";
import { useRouter } from "next/router";

import { useViewportContext } from "../../../../common/providers";
import { DepthChart } from "../DepthChart";
import { HistoryTable } from "../HistoryTable";
import { OrderBook } from "../OrderBook";
import { ExpandableUserOrders } from "../UserOrdersTable";

import * as Styled from "./SmallScreenTabs.styled";

export function SmallScreenTabs(): JSX.Element {
  const { lg } = useViewportContext();
  const router = useRouter();
  const { pair } = router.query;

  const tabItems = [
    {
      label: counterpart.translate("pages.market.order_book"),
      key: "order-book",
      children: (
        <Styled.TabContentContainer>
          <OrderBook currentPair={pair as string} />
        </Styled.TabContentContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.tabs.history.all`),
      key: "trade-history",
      children: (
        <Styled.HistoryTabContainer>
          <HistoryTable />
        </Styled.HistoryTabContainer>
      ),
    },
    {
      label: counterpart.translate(`pages.market.orders`),
      key: "orders",
      children: (
        <Styled.TabContentContainer>
          <ExpandableUserOrders />
        </Styled.TabContentContainer>
      ),
    },
  ];
  if (!lg) {
    tabItems.push({
      label: counterpart.translate(`pages.market.market_depth`),
      key: "market-depth",
      children: (
        <Styled.TabContentContainer>
          <DepthChart />
        </Styled.TabContentContainer>
      ),
    });
  }
  return (
    <Styled.Tabs
      defaultActiveKey="order-book"
      centered={true}
      items={tabItems}
    />
  );
}
