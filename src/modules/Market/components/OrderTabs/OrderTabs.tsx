import { HistoryBook } from "../HistoryBook";
import { OrderBook } from "../OrderBook";

import * as Styled from "./OrderTabs.styled";

const { TabPane } = Styled.Tabs;

type Props = {
  forUser?: boolean;
};

export const OrderTabs = ({ forUser = false }: Props): JSX.Element => {
  return (
    <Styled.Tabs defaultActiveKey="1" centered={true}>
      <TabPane tab={forUser ? "My Open Orders" : "Order Book"} key="1">
        <OrderBook forUser={forUser} />
      </TabPane>
      <TabPane tab={forUser ? "My Order History" : "History"} key="2">
        <HistoryBook forUser={forUser} />
      </TabPane>
    </Styled.Tabs>
  );
};
