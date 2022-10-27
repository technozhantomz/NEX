import counterpart from "counterpart";

import { utils } from "../../../api/utils";
import { Form, Input } from "../../../ui/src";
import { useHandleTransactionForm } from "../../hooks";
import { useAssetsContext, useUserContext } from "../../providers";
import { PasswordModal } from "../PasswordModal";
import { TransactionModal } from "../TransactionModal";

import * as Styled from "./TransferForm.styled";
import { useTransferForm } from "./hooks";

type Props = {
  asset: string;
};

export const TransferForm = ({ asset }: Props): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    feeAmount,
    transferForm,
    formValdation,
    handleValuesChange,
    setTransactionErrorMessage,
    transactionErrorMessage,
    setTransactionSuccessMessage,
    transactionSuccessMessage,
    transfer,
    loadingTransaction,
    toAccount,
    amount,
    transferFee,
  } = useTransferForm();
  const { defaultAsset } = useAssetsContext();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: transfer,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  return (
    <Form.Provider onFormFinish={handleFormFinish}>
      <Styled.TransferForm
        form={transferForm}
        name="transferForm"
        onFinish={showPasswordModal}
        size="large"
        onValuesChange={handleValuesChange}
        validateTrigger={["onBlur", "onSubmit"]}
      >
        <div className="two-input-row">
          <Form.Item
            name="from"
            rules={formValdation.from}
            validateFirst={true}
            validateTrigger="onBlur"
            initialValue={localStorageAccount}
          >
            <Input disabled={true} placeholder="From" />
          </Form.Item>
          <Form.Item
            name="amount"
            validateFirst={true}
            rules={formValdation.amount}
            validateTrigger="onBlur"
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.amount`)}
              type="number"
              min={0}
              onKeyPress={utils.ensureInputNumberValidity}
              step="any"
              autoComplete="off"
            />
          </Form.Item>
        </div>
        <div className="two-input-row">
          <Form.Item
            name="to"
            validateFirst={true}
            rules={formValdation.to}
            validateTrigger="onBlur"
          >
            <Input
              placeholder={counterpart.translate(`field.placeholder.to`)}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="asset"
            validateFirst={true}
            rules={formValdation.asset}
            validateTrigger="onBlur"
            initialValue={`${asset}`}
          >
            <Input disabled={true} />
          </Form.Item>
        </div>
        <p>{counterpart.translate(`field.comments.public_memo`)}</p>
        <Styled.MemoFormItem
          name="memo"
          validateFirst={true}
          rules={formValdation.memo}
          validateTrigger="onChange"
        >
          <Styled.Memo
            placeholder={counterpart.translate(`field.placeholder.memo`)}
            maxLength={256}
          />
        </Styled.MemoFormItem>
        <p>
          {counterpart.translate(`field.labels.fees`, {
            feeAmount: transferFee,
            defaultAsset: defaultAsset ? defaultAsset.symbol : "",
          })}
        </p>

        <Styled.FormItem>
          <Styled.TransferFormButton type="primary" htmlType="submit">
            {counterpart.translate(`buttons.send`)}
          </Styled.TransferFormButton>
        </Styled.FormItem>
      </Styled.TransferForm>
      <PasswordModal
        neededKeyType="active"
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
        asset={asset}
        to={toAccount?.name}
        amount={amount}
        transactionType="transfer"
      />
    </Form.Provider>
  );
};
