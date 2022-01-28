import { Tabs } from "../../../../ui/src";
import { OrderBook } from "../OrderBook";

import * as Styled from "./OrderTabs.styles";

const { TabPane } = Tabs;

export const OrderTabs = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey="1" centered={true}>
      <TabPane tab="Order Book" key="1">
        <OrderBook />
      </TabPane>
      <TabPane tab="History" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );
};
