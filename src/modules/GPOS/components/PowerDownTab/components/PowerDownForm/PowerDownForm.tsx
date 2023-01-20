import counterpart from "counterpart";
import { useRouter } from "next/router";

import { utils } from "../../../../../../api/utils";
import {
  PasswordModal,
  TransactionModal,
} from "../../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../../common/hooks";
import {
  useUserContext,
  useViewportContext,
} from "../../../../../../common/providers";
import { Button, Form, Input } from "../../../../../../ui/src";
import { GPOSBalances } from "../../../../types";

import * as Styled from "./PowerDownForm.styled";
import { usePowerDownForm } from "./hooks";

type Props = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  calculateGposBalances: () => Promise<void>;
};

export const PowerDownForm = ({
  gposBalances,
  loading,
  calculateGposBalances,
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const {
    powerDownForm,
    formValidation,
    adjustWithdraw,
    transactionMessageState,
    transactionMessageDispatch,
    handleWithdraw,
    feeAmount,
    newAvailableBalance,
    newBalance,
    withdrawAmount,
  } = usePowerDownForm({
    gposBalances,
    loading,
    calculateGposBalances,
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
    transactionMessageDispatch,
    neededKeyType: "active",
  });
  const { sm } = useViewportContext();
  const mobileOpeningBalancePrefix = gposBalances
    ? `${gposBalances.openingBalance}`
    : "";
  const mobileAvailableBalancePrefix = gposBalances
    ? `${newAvailableBalance}`
    : "";
  const mobileNewBalancePrefix = gposBalances ? `${newBalance}` : "";

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
            withdrawAmount: "0",
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
            name="withdrawAmount"
            label={counterpart.translate(`buttons.withdraw`)}
            rules={formValidation.withdrawAmount}
            validateFirst={true}
            validateTrigger="onChange"
          >
            <Input
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
              type="number"
              min={0}
              step="any"
              onKeyPress={utils.ensureInputNumberValidity}
              onPaste={utils.numberedInputsPasteHandler}
              autoComplete="off"
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
            <Styled.PowerDownFormButton type="primary" htmlType="submit">
              {counterpart.translate(`buttons.withdraw`)}
            </Styled.PowerDownFormButton>
          </Form.Item>
        </Styled.PowerDownForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
          neededKeyType="active"
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionMessageState={transactionMessageState}
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
