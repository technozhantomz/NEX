import { Tabs } from "../../../../ui/src";
import { HistoryBook } from "../HistoryBook";
import { OrderBook } from "../OrderBook";

const { TabPane } = Tabs;

export const OrderTabs = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey="1" centered={true}>
      <TabPane tab="Order Book" key="1">
        <OrderBook />
      </TabPane>
      <TabPane tab="History" key="2">
        <HistoryBook />
      </TabPane>
    </Tabs>
  );
};
