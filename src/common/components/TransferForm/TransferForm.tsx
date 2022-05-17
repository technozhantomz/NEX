import { Form, Input } from "../../../ui/src";
import { useAsset, useHandleTransactionForm } from "../../hooks";
import { useUserContext } from "../../providers";
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
    // status,
    //isPasswordModalVisible,
    feeAmount,
    transferForm,
    formValdation,
    //handlePasswordModalCancel,
    //confirm,
    //onFormFinish,
    submittingPassword,
    loadingTransaction,
    transactionErrorMessage,
    transactionSuccessMessage,
    transfer,
    handleValuesChange,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  } = useTransferForm();
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
    handleFormSubmit,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: transfer,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });
  const { defaultAsset } = useAsset();

  return (
    <Form.Provider onFormFinish={handleFormFinish}>
      <Styled.TransferForm
        form={transferForm}
        name="transferForm"
        onFinish={handleFormSubmit}
        size="large"
        onValuesChange={handleValuesChange}
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
            <Input placeholder="Quantity" type="number" />
          </Form.Item>
        </div>
        <div className="two-input-row">
          <Form.Item
            name="to"
            validateFirst={true}
            rules={formValdation.to}
            validateTrigger="onBlur"
          >
            <Input placeholder="To" />
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
        <p>Only members with memo key can read your memos</p>
        <Form.Item name="memo" validateFirst={true} rules={formValdation.memo}>
          <Input placeholder="Memo" />
        </Form.Item>
        <p>
          Fees: {feeAmount} {defaultAsset ? defaultAsset.symbol : ""}
        </p>
        {/* {status === "" ? "" : <p>{status}</p>} */}
        <Styled.FormItem>
          <Styled.TransferFormButton type="primary" htmlType="submit">
            Send
          </Styled.TransferFormButton>
        </Styled.FormItem>
      </Styled.TransferForm>
      <PasswordModal
        visible={isPasswordModalVisible}
        onCancel={hidePasswordModal}
        submitting={submittingPassword}
      />
      <TransactionModal
        visible={isTransactionModalVisible}
        onCancel={hideTransactionModal}
        transactionErrorMessage={transactionErrorMessage}
        transactionSuccessMessage={transactionSuccessMessage}
        loadingTransaction={loadingTransaction}
        account={localStorageAccount}
        fee={feeAmount}
        transactionType="transfer"
      />
    </Form.Provider>
  );
};
