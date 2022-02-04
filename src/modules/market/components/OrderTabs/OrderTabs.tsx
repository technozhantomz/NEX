import { HistoryBook } from "../HistoryBook";
import { OrderBook } from "../OrderBook";

import * as Styled from "./OrderTabs.styled";

const { TabPane } = Styled.Tabs;

export const OrderTabs = (): JSX.Element => {
  return (
    <Styled.Tabs defaultActiveKey="1" centered={true}>
      <TabPane tab="Order Book" key="1">
        <OrderBook />
      </TabPane>
      <TabPane tab="History" key="2">
        <HistoryBook />
      </TabPane>
    </Styled.Tabs>
  );
};
