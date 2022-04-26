import Link from "next/link";
import { useRouter } from "next/router";

import { FormDisclamer, PasswordModal } from "../../../../common/components";
import { useAsset } from "../../../../common/hooks";
import { useUserContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { Form } from "../../../../ui/src";

import { InputPrefix } from "./InputPrefix";
import * as Styled from "./LimitOrderForm.styled";
import { useCreateLimitOrder } from "./hooks/useCreateLimitOrder";

type Props = {
  activePair: string;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  isBuyOrder: boolean;
  showTitle?: boolean;
  refreshHistory: () => void;
  refreshOrderBook: () => void;
};

export const LimitOrderForm = ({
  activePair,
  currentBase,
  currentQuote,
  loadingSelectedPair,
  isBuyOrder,
  showTitle = true,
  refreshHistory,
  refreshOrderBook,
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const { defaultAsset } = useAsset();
  const {
    feeAmount,
    marketFeePercent,
    balance,
    orderForm,
    formValdation,
    isPasswordModalVisible,
    handleCancelPasswordModal,
    confirm,
    handleValuesChange,
    onFormFinish,
    submittingPassword,
  } = useCreateLimitOrder({
    currentBase,
    currentQuote,
    loadingSelectedPair,
    isBuyOrder,
    refreshHistory,
    refreshOrderBook,
  });

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
            initialValues={{ price: 0.0, quantity: 0.0, total: 0.0 }}
            onValuesChange={handleValuesChange}
          >
            <Styled.FormItem
              name="price"
              rules={formValdation.price}
              validateFirst={true}
              validateTrigger="onBlur"
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
              rules={formValdation.quantity}
              validateFirst={true}
              validateTrigger="onBlur"
            >
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
            <Styled.FormItem
              name="total"
              rules={formValdation.total}
              validateFirst={true}
              validateTrigger="onBlur"
            >
              <Styled.InputNumber
                prefix={
                  <InputPrefix
                    constLabel="Total"
                    inputSymbol={activePair.split("_")[1]}
                    quoteSymbol={activePair.split("_")[1]}
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
                  <span>{`${marketFeePercent}%`}</span>
                </Styled.OderInfoItem>

                <Styled.OderInfoItem>
                  <span>Balance:</span>
                  <span>{`${balance} ${
                    isBuyOrder
                      ? activePair.split("_")[1]
                      : activePair.split("_")[0]
                  }`}</span>
                </Styled.OderInfoItem>
              </Styled.OrderInfo>
            </Styled.FormItem>
            <Styled.FormItem>
              {localStorageAccount !== null && localStorageAccount !== "" ? (
                <Styled.FormButton type="primary" htmlType="submit">
                  {`${isBuyOrder ? "Buy" : "Sell"} ${activePair.split("_")[0]}`}
                </Styled.FormButton>
              ) : (
                <Styled.FormButton
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  {`Log in & ${isBuyOrder ? "Buy" : "Sell"} ${
                    activePair.split("_")[0]
                  }`}
                </Styled.FormButton>
              )}
            </Styled.FormItem>
          </Styled.Form>
          {localStorageAccount !== null && localStorageAccount !== "" ? (
            ""
          ) : (
            <FormDisclamer>
              <span>Don't have a Peerplays account? </span>
              <Link href="/signup">
                <a>Create account</a>
              </Link>
            </FormDisclamer>
          )}

          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={handleCancelPasswordModal}
            submitting={submittingPassword}
          />
        </Form.Provider>
      </Styled.FormContainer>
    </>
  );
};
