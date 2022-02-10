import * as Styled from "./LimitOrderForm.styled";
import { InputPrefix } from "./components/InputPrefix/InputPrefix";
import { useCreateLimitOrder } from "./hooks/useCreateLimitOrder";
//import { useOrderBook } from "./hooks/useOrderBook";

type Props = {
  isBuyOrder: boolean;
};

export const LimitOrderForm = ({ isBuyOrder }: Props): JSX.Element => {
  const { activePair, handleValuesChange, form } = useCreateLimitOrder({
    isBuyOrder,
  });
  return (
    <>
      <Styled.FormContainer>
        <Styled.FormTitle>{isBuyOrder ? "BUY" : "SELL"}</Styled.FormTitle>
        <Styled.Form
          form={form}
          initialValues={{ price: 0.0, quantity: 0.0, total: 0.0 }}
          onValuesChange={handleValuesChange}
        >
          <Styled.FormItem
            validateFirst={true}
            name="price"
            rules={[
              { required: true, message: "This field is required" },
              () => ({
                validator(_, value) {
                  if (value <= 0) {
                    return Promise.reject(
                      new Error("Price should be greater than 0")
                    );
                  }
                },
              }),
            ]}
          >
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
          <Styled.FormItem
            name="quantity"
            validateFirst={true}
            rules={[
              { required: true, message: "This field is required" },
              () => ({
                validator(_, value) {
                  if (value <= 0) {
                    return Promise.reject(
                      new Error("Quantity should be greater than 0")
                    );
                  }
                },
              }),
            ]}
          >
            <Styled.InputNumber
              prefix={
                <InputPrefix
                  constLabel="Quantity"
                  inputSymbol={activePair.split("_")[0]}
                />
              }
              type="number"
            />
          </Styled.FormItem>
          <Styled.FormItem
            validateFirst={true}
            rules={[
              { required: true, message: "This field is required" },
              () => ({
                validator(_, value) {
                  if (value <= 0) {
                    return Promise.reject(
                      new Error("Total should be greater than 0")
                    );
                  }
                },
              }),
            ]}
            name="total"
          >
            <Styled.InputNumber
              prefix={
                <InputPrefix
                  constLabel="Total"
                  inputSymbol={activePair.split("_")[1]}
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
