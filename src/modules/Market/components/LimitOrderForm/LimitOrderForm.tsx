import { PasswordModal } from "../../../../common/components";
import { useAsset } from "../../../../common/hooks";
import { Form } from "../../../../ui/src";

import { InputPrefix } from "./InputPrefix";
import * as Styled from "./LimitOrderForm.styled";
import { useCreateLimitOrder } from "./hooks/useCreateLimitOrder";

type Props = {
  isBuyOrder: boolean;
  showTitle?: boolean;
};

export const LimitOrderForm = ({
  isBuyOrder,
  showTitle = true,
}: Props): JSX.Element => {
  const { defaultAsset } = useAsset();
  const {
    activePair,
    orderForm,
    visible,
    feeAmount,
    userBalances,
    onCancel,
    confirm,
    onFormFinish,
  } = useCreateLimitOrder({ isBuyOrder });

  return (
    <>
      <Styled.FormContainer>
        <Form.Provider onFormFinish={onFormFinish}>
          {showTitle ? (
            <Styled.FormTitle>{isBuyOrder ? "BUY" : "SELL"}</Styled.FormTitle>
          ) : (
            ""
          )}
          <Styled.Form
            form={orderForm}
            name="orderForm"
            onFinish={confirm}
            size="large"
          >
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
            <Styled.FormItem name="quantity">
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
            <Styled.FormItem name="total">
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
            <Styled.FormItem>
              <Styled.OrderInfo>
                <Styled.OderInfoItem>
                  <span>Fees:</span>
                  <span>{`${feeAmount} ${
                    defaultAsset ? defaultAsset.symbol : ""
                  }`}</span>
                </Styled.OderInfoItem>
                <Styled.OderInfoItem>
                  <span>Market Fee:</span>
                  <span>{`0 ${defaultAsset ? defaultAsset.symbol : ""}`}</span>
                </Styled.OderInfoItem>
                <Styled.OderInfoItem>
                  <span>Balance:</span>
                  <span>{`${
                    isBuyOrder
                      ? userBalances.buyBalance
                      : userBalances.sellBalance
                  } ${
                    isBuyOrder
                      ? activePair.split("_")[1]
                      : activePair.split("_")[0]
                  }`}</span>
                </Styled.OderInfoItem>
              </Styled.OrderInfo>
            </Styled.FormItem>
            <Styled.FormItem>
              <Styled.FormButton type="primary" htmlType="submit">
                {`${isBuyOrder ? "Buy" : "Sell"} ${activePair.split("_")[1]}`}
              </Styled.FormButton>
            </Styled.FormItem>
          </Styled.Form>
          <PasswordModal visible={visible} onCancel={onCancel} />
        </Form.Provider>
      </Styled.FormContainer>
    </>
  );
};
