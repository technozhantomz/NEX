import { Asset } from "../../../../common/types";
import { HistoryBook } from "../HistoryBook";
import { OrderBook } from "../OrderBook";

import * as Styled from "./OrderTabs.styled";

const { TabPane } = Styled.Tabs;

type Props = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  forUser?: boolean;
};

export const OrderTabs = ({
  forUser = false,
  currentBase,
  currentQuote,
  loadingSelectedPair,
}: Props): JSX.Element => {
  return (
    <Styled.Tabs defaultActiveKey="1" centered={true}>
      <TabPane tab={forUser ? "My Open Orders" : "Order Book"} key="1">
        <OrderBook
          currentBase={currentBase}
          currentQuote={currentQuote}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
        />
      </TabPane>
      <TabPane tab={forUser ? "My Order History" : "History"} key="2">
        <HistoryBook
          currentBase={currentBase}
          currentQuote={currentQuote}
          loadingSelectedPair={loadingSelectedPair}
          forUser={forUser}
        />
      </TabPane>
    </Styled.Tabs>
  );
};
