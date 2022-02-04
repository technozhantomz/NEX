import { Flex } from "../../../../ui/src";

import * as Styled from "./OrderBook.styled";
import { OrderType } from "./hooks/uesOrderBook.types";
import { useOrderBook } from "./hooks/useOrderBook";

export const OrderBook = (): JSX.Element => {
  const { bids, asks, orderType } = useOrderBook();
  const types: OrderType[] = ["total", "sell", "buy"];

  console.log("this is bids", bids);
  console.log("this is asks", asks);

  const thresholdMenu = (
    <Styled.ThresholdMenu>
      <Styled.ThresholdMenu.Item key="0.001">0.001</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.005">0.005</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.01">0.01</Styled.ThresholdMenu.Item>
    </Styled.ThresholdMenu>
  );

  return (
    <>
      <Styled.FilterContainer>
        <Flex>
          {types.map((type) => (
            <Styled.OrdersFilter
              key={type}
              className={`order-filters__type--${type}${
                type === orderType ? " active" : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Styled.OrdersFilter>
          ))}
        </Flex>
        <div></div>
      </Styled.FilterContainer>
    </>
  );
};
