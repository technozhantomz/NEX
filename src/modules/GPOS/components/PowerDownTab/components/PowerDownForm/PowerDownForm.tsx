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

import * as Styled from "./PowerDownForm.styled";
import { usePowerDownForm } from "./hooks";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export const PowerDownForm = ({
  gposBalances,
  loading,
  getGposInfo,
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const {
    powerDownForm,
    formValidation,
    adjustWithdraw,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    handleWithdraw,
    feeAmount,
    withdrawAmount,
  } = usePowerDownForm({
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
    handleTransactionConfirmation: handleWithdraw,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });
  const { sm } = useViewportContext();
  return (
    <>
      <Form.Provider onFormFinish={handleFormFinish}>
        <Styled.PowerDownForm
          form={powerDownForm}
          layout="vertical"
          name="powerDownForm"
          onFinish={showPasswordModal}
          size="large"
          initialValues={{
            openingBalance: "",
            withdrawAmount: 0,
            newBalance: "",
            availableBalance: "",
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
                  ? ""
                  : counterpart.translate(`field.placeholder.available_balance`)
              }
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="withdrawAmount"
            label={counterpart.translate(`buttons.withdraw`)}
            rules={formValidation.withdrawAmount}
            validateFirst={true}
            validateTrigger="onChange"
          >
            <InputNumber
              controls={false}
              addonBefore={
                <Button type="text" onClick={() => adjustWithdraw("+")}>
                  +
                </Button>
              }
              addonAfter={
                <Button type="text" onClick={() => adjustWithdraw("-")}>
                  -
                </Button>
              }
            />
          </Form.Item>
          <Form.Item
            name="newBalance"
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

          <Form.Item>
            <Styled.PowerDownFormButton type="primary" htmlType="submit">
              {counterpart.translate(`buttons.withdraw`)}
            </Styled.PowerDownFormButton>
          </Form.Item>
        </Styled.PowerDownForm>
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
          fee={feeAmount}
          account={localStorageAccount}
          withdrawalAmount={withdrawAmount}
          transactionType="vesting_balance_withdraw"
        />
      </Form.Provider>
      <Styled.PowerDownFormButton
        type="link"
        onClick={() => router.push(`/voting`)}
      >
        {counterpart.translate(`buttons.cancel`)}
      </Styled.PowerDownFormButton>
    </>
  );
};
