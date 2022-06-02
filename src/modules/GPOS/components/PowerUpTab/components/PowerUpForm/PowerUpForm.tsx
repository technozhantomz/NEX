import counterpart from "counterpart";
import { useRouter } from "next/router";

import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../../common/hooks";
import {
  useUserContext,
  useViewportContext,
} from "../../../../../../common/providers";
import { Button, Form, Input, InputNumber } from "../../../../../../ui/src";
import { GPOSBalances } from "../../../../types";

import * as Styled from "./PowerUpForm.styled";
import { usePowerUpForm } from "./hooks";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export const PowerUpForm = ({
  gposBalances,
  loading,
  getGposInfo,
}: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const router = useRouter();
  const {
    powerUpForm,
    formValidation,
    adjustDeposit,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handleVesting,
    loadingTransaction,
    feeAmount,
    depositAmount,
  } = usePowerUpForm({
    gposBalances,
    loading,
    getGposInfo,
  });
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hideTransactionModal,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleVesting,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });
  const { sm } = useViewportContext();

  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.PowerUpForm
          form={powerUpForm}
          layout="vertical"
          name="powerUpForm"
          onFinish={showPasswordModal}
          size="large"
          initialValues={{
            openingBalance: "",
            depositAmount: 0,
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
                  ? ""
                  : counterpart.translate(`field.placeholder.opening_balance`)
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
            <InputNumber
              controls={false}
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
                sm ? "" : counterpart.translate(`field.placeholder.new_balance`)
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
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
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
