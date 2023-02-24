import counterpart from "counterpart";
import { useRouter } from "next/router";

import { utils } from "../../../../../../api/utils";
import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useTransactionForm } from "../../../../../../common/hooks";
import {
  useUserContext,
  useViewportContext,
} from "../../../../../../common/providers";
import { Button, Form, Input } from "../../../../../../ui/src";
import { GPOSBalances } from "../../../../types";

import * as Styled from "./PowerUpForm.styled";
import { usePowerUpForm } from "./hooks";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  calculateGposBalances: () => Promise<void>;
};

export const PowerUpForm = ({
  gposBalances,
  loading,
  calculateGposBalances,
}: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const router = useRouter();
  const {
    powerUpForm,
    formValidation,
    adjustDeposit,
    transactionMessageState,
    dispatchTransactionMessage,
    handleVesting,
    feeAmount,
    depositAmount,
    newBalance,
    userAvailableBalance,
  } = usePowerUpForm({
    gposBalances,
    loading,
    calculateGposBalances,
  });
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hideTransactionModal,
    hidePasswordModal,
    handleFormFinish,
  } = useTransactionForm({
    executeTransaction: handleVesting,
    dispatchTransactionMessage,
    neededKeyType: "active",
  });
  const { sm } = useViewportContext();

  const mobileOpeningBalancePrefix = gposBalances
    ? `${gposBalances.openingBalance}`
    : "";
  const mobileNewBalancePrefix = gposBalances ? `${newBalance}` : "";
  const mobileAvailableBalancePrefix = gposBalances
    ? `${userAvailableBalance}`
    : "";

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.PowerUpForm
          form={powerUpForm}
          layout="vertical"
          name="powerUpForm"
          size="large"
          initialValues={{
            openingBalance: "",
            depositAmount: "0",
            newBalance: "",
          }}
        >
          <Form.Item
            name="openingBalance"
            label={
              sm
                ? counterpart.translate(`field.placeholder.opening_balance`)
                : ""
            }
          >
            <Input
              prefix={
                sm
                  ? mobileOpeningBalancePrefix
                  : counterpart.translate(`field.placeholder.opening_balance`)
              }
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="availableBalance"
            label={
              sm
                ? counterpart.translate(`field.placeholder.available_balance`)
                : ""
            }
          >
            <Input
              prefix={
                sm
                  ? mobileAvailableBalancePrefix
                  : counterpart.translate(`field.placeholder.available_balance`)
              }
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="depositAmount"
            label={counterpart.translate(`buttons.deposit`)}
            rules={formValidation.depositAmount}
            validateFirst={true}
            validateTrigger="onChange"
          >
            <Input
              autoComplete="off"
              addonBefore={
                <Button type="text" onClick={() => adjustDeposit("+")}>
                  +
                </Button>
              }
              addonAfter={
                <Button type="text" onClick={() => adjustDeposit("-")}>
                  -
                </Button>
              }
              type="number"
              min={0}
              step="any"
              onKeyPress={utils.ensureInputNumberValidity}
              onPaste={utils.numberedInputsPasteHandler}
            />
          </Form.Item>
          <Form.Item
            name="newBalance"
            label={
              sm ? counterpart.translate(`field.placeholder.new_balance`) : ""
            }
          >
            <Input
              prefix={
                sm
                  ? mobileNewBalancePrefix
                  : counterpart.translate(`field.placeholder.new_balance`)
              }
              disabled={true}
            />
          </Form.Item>

          <Form.Item>
            <Styled.PowerUpFormButton type="primary" htmlType="submit">
              {counterpart.translate(`buttons.vest`)}
            </Styled.PowerUpFormButton>
          </Form.Item>
        </Styled.PowerUpForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
          neededKeyType="active"
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionMessageState={transactionMessageState}
          account={localStorageAccount}
          fee={feeAmount}
          vestingAmount={depositAmount}
          transactionType="vesting_balance_create"
        />
      </Form.Provider>
      <Styled.PowerUpFormButton
        type="link"
        onClick={() => router.push(`/voting`)}
      >
        {counterpart.translate(`buttons.cancel`)}
      </Styled.PowerUpFormButton>
    </>
  );
};
