import counterpart from "counterpart";
import Link from "next/link";
import { useRouter } from "next/router";

import { utils } from "../../../../api/utils";
import {
  FormDisclamer,
  PasswordModal,
  TransactionModal,
} from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import { useAssetsContext, useUserContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { Form, FormInstance } from "../../../../ui/src";
import { OrderForm } from "../../types";

import { InputPrefix } from "./InputPrefix";
import * as Styled from "./LimitOrderForm.styled";
import { useCreateLimitOrder } from "./hooks";

type Props = {
  activePair: string;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  isBuyOrder: boolean;
  showTitle?: boolean;
  orderForm: FormInstance<OrderForm>;
};

export const LimitOrderForm = ({
  activePair,
  currentBase,
  currentQuote,
  loadingSelectedPair,
  isBuyOrder,
  showTitle = true,
  orderForm,
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const { defaultAsset } = useAssetsContext();
  const {
    feeAmount,
    marketFeePercent,
    balance,
    formValidation,
    handleCreateLimitOrder,
    handleValuesChange,
    setTransactionErrorMessage,
    transactionErrorMessage,
    setTransactionSuccessMessage,
    transactionSuccessMessage,
    loadingTransaction,
    price,
    quantity,
    total,
  } = useCreateLimitOrder({
    currentBase,
    currentQuote,
    loadingSelectedPair,
    isBuyOrder,
    orderForm,
  });

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleCreateLimitOrder,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  const isLoggedIn = localStorageAccount !== null && localStorageAccount !== "";
  const buyOrSellText = isBuyOrder
    ? counterpart.translate(`buttons.buy`)
    : counterpart.translate(`buttons.sell`);
  const loggedInSubmitButton = buyOrSellText + " " + activePair.split("_")[0];
  const nonLoggedInSubmitButton =
    counterpart.translate(`buttons.login`) + " & " + loggedInSubmitButton;

  return (
    <>
      <Styled.FormContainer>
        <Form.Provider onFormFinish={handleFormFinish}>
          {showTitle ? (
            <Styled.FormTitle>
              {isBuyOrder
                ? counterpart.translate(`pages.market.buy`)
                : counterpart.translate(`pages.market.sell`)}
            </Styled.FormTitle>
          ) : (
            ""
          )}
          <Styled.Form
            form={orderForm}
            name="orderForm"
            onFinish={showPasswordModal}
            size="large"
            initialValues={{ price: 0.0, quantity: 0.0, total: 0.0 }}
            onValuesChange={handleValuesChange}
          >
            <Styled.FormItem
              name="price"
              rules={formValidation.price}
              validateFirst={true}
              validateTrigger="onBlur"
            >
              <Styled.InputNumber
                prefix={
                  <InputPrefix
                    constLabel={counterpart.translate(
                      `field.placeholder.price`
                    )}
                    inputSymbol={activePair.split("_")[1]}
                    quoteSymbol={activePair.split("_")[0]}
                    baseSymbol={activePair.split("_")[1]}
                  />
                }
                type="number"
                min={0}
                step="any"
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyPress={utils.ensureInputNumberValidity}
                autoComplete="off"
              />
            </Styled.FormItem>
            <Styled.FormItem
              name="quantity"
              rules={formValidation.quantity}
              validateFirst={true}
              validateTrigger="onBlur"
            >
              <Styled.InputNumber
                prefix={
                  <InputPrefix
                    constLabel={counterpart.translate(
                      `field.placeholder.quantity`
                    )}
                    inputSymbol={activePair.split("_")[0]}
                    quoteSymbol={activePair.split("_")[0]}
                  />
                }
                type="number"
                min={0}
                step="any"
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyPress={utils.ensureInputNumberValidity}
                autoComplete="off"
              />
            </Styled.FormItem>
            <Styled.FormItem
              name="total"
              rules={formValidation.total}
              validateFirst={true}
              validateTrigger="onBlur"
            >
              <Styled.InputNumber
                prefix={
                  <InputPrefix
                    constLabel={counterpart.translate(
                      `field.placeholder.total`
                    )}
                    inputSymbol={activePair.split("_")[1]}
                    quoteSymbol={activePair.split("_")[1]}
                  />
                }
                type="number"
                min={0}
                step="any"
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyPress={utils.ensureInputNumberValidity}
                disabled={true}
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Styled.OrderInfo>
                <Styled.OderInfoItem>
                  <span>
                    {counterpart.translate(`pages.blocks.fees.fees`)}:
                  </span>
                  <span>{`${feeAmount} ${
                    defaultAsset ? defaultAsset.symbol : ""
                  }`}</span>
                </Styled.OderInfoItem>

                <Styled.OderInfoItem>
                  <span>
                    {counterpart.translate(`field.labels.market_fee`)}:
                  </span>
                  <span>{`${marketFeePercent}%`}</span>
                </Styled.OderInfoItem>

                <Styled.OderInfoItem>
                  <span>{counterpart.translate(`field.labels.balance`)}:</span>
                  <span>{`${balance} ${
                    isBuyOrder
                      ? activePair.split("_")[1]
                      : activePair.split("_")[0]
                  }`}</span>
                </Styled.OderInfoItem>
              </Styled.OrderInfo>
            </Styled.FormItem>
            <Styled.FormItem>
              {isLoggedIn ? (
                <Styled.FormButton type="primary" htmlType="submit">
                  {loggedInSubmitButton}
                </Styled.FormButton>
              ) : (
                <Styled.FormButton
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  {nonLoggedInSubmitButton}
                </Styled.FormButton>
              )}
            </Styled.FormItem>
          </Styled.Form>
          {isLoggedIn ? (
            ""
          ) : (
            <FormDisclamer>
              <span>
                {counterpart.translate(`buttons.dont_have_peerplays_account`)}
              </span>
              <Link href="/signup">
                <a>{counterpart.translate(`links.create_account`)}</a>
              </Link>
            </FormDisclamer>
          )}
          <TransactionModal
            visible={isTransactionModalVisible}
            onCancel={hideTransactionModal}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={localStorageAccount}
            fee={feeAmount}
            transactionType="limit_order_create"
            price={`${price} ${activePair.split("_")[1]} / ${
              activePair.split("_")[0]
            }`}
            buy={
              isBuyOrder
                ? `${quantity} ${activePair.split("_")[0]}`
                : `${total} ${activePair.split("_")[1]}`
            }
            sell={
              isBuyOrder
                ? `${total} ${activePair.split("_")[1]}`
                : `${quantity} ${activePair.split("_")[0]}`
            }
          />
          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={hidePasswordModal}
            neededKeyType="active"
          />
        </Form.Provider>
      </Styled.FormContainer>
    </>
  );
};
