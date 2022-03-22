import { InputPrefix } from "./InputPrefix";
import * as Styled from "./LimitOrderForm.styled";
import { useCreateLimitOrder } from "./hooks/useCreateLimitOrder";
//import { useOrderBook } from "./hooks/useOrderBook";

type Props = {
  isBuyOrder: boolean;
};

export const LimitOrderForm = ({ isBuyOrder }: Props): JSX.Element => {
  const { activePair } = useCreateLimitOrder({ isBuyOrder });
  return (
    <>
      <Styled.FormContainer>
        <Styled.FormTitle>{isBuyOrder ? "BUY" : "SELL"}</Styled.FormTitle>
        <Styled.Form>
          <Styled.FormItem name="price">
            <Styled.InputNumber
              prefix={
                <InputPrefix
                  constLabel="Price"
                  inputSymbol={activePair.split("_")[1]}
                  quoteSymbol={activePair.split("_")[0]}
                  baseSymbol={activePair.split("_")[1]}
                />
              }
              type="number"
            />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.InputNumber
              prefix={
                <InputPrefix
                  constLabel="Quantity"
                  inputSymbol={activePair.split("_")[0]}
                  quoteSymbol={activePair.split("_")[0]}
                />
              }
              type="number"
            />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.InputNumber
              prefix={
                <InputPrefix
                  constLabel="Total"
                  inputSymbol={activePair.split("_")[0]}
                  quoteSymbol={activePair.split("_")[0]}
                />
              }
              type="number"
            />
          </Styled.FormItem>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};
