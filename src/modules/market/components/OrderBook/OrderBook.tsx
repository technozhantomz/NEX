import * as Styled from "./OrderBook.styled";
import { useOrderBook } from "./hooks/useOrderBook";

export const OrderBook = (): JSX.Element => {
  const { bids, asks } = useOrderBook();
  console.log("this is bids", bids);
  console.log("this is asks", asks);
  return (
    <>
      <Styled.FilterContainer></Styled.FilterContainer>
    </>
  );
};
