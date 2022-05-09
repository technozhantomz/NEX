import counterpart from "counterpart";

import { Button } from "../../../ui/src";
import { Proxy } from "../../types";

import * as Styled from "./TransactionModal.styled";
import { AccountUpdate, AccountUpgrade } from "./components";
import { useTransactionModal } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  transactionType: string;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  account?: string;
  fee?: number;
  proxy?: Proxy;
  desiredMembers?: number;
  memberType?: string;
};

export const TransactionModal = ({
  visible,
  onCancel,
  transactionType,
  transactionErrorMessage,
  transactionSuccessMessage,
  loadingTransaction,
  account,
  fee,
  proxy,
  desiredMembers,
  memberType,
}: Props): JSX.Element => {
  const transactionDetails: {
    [transactionType: string]: JSX.Element;
  } = {
    account_upgrade: (
      <AccountUpgrade account={account as string} fee={fee as number} />
    ),
    account_update: (
      <AccountUpdate
        account={account as string}
        fee={fee as number}
        proxy={proxy}
        desiredMembers={desiredMembers}
        memberType={memberType}
      />
    ),
  };

  const { useResetFormOnCloseModal, transactionModalForm } =
    useTransactionModal();

  useResetFormOnCloseModal(transactionModalForm, visible);

  return (
    <>
      <Styled.TransactionModal
        title="Please confirm the transaction"
        visible={visible}
        onOk={() => {
          transactionModalForm.submit();
        }}
        onCancel={!loadingTransaction ? onCancel : undefined}
        centered={true}
        footer={
          transactionErrorMessage !== "" ? (
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>
          ) : transactionSuccessMessage !== "" ? (
            <Button key="back" onClick={onCancel}>
              Done
            </Button>
          ) : (
            [
              <Button
                key="back"
                onClick={onCancel}
                disabled={loadingTransaction}
              >
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  transactionModalForm.submit();
                }}
                loading={loadingTransaction}
              >
                Confirm
              </Button>,
            ]
          )
        }
      >
        <Styled.TransactionModalForm
          form={transactionModalForm}
          name="transactionModal"
          size="large"
        ></Styled.TransactionModalForm>
        <Styled.DetailContainer>
          <Styled.TransactionType>
            {counterpart.translate(`transaction.trxTypes.${transactionType}`)}
          </Styled.TransactionType>
        </Styled.DetailContainer>
        {transactionDetails[transactionType] !== undefined
          ? transactionDetails[transactionType]
          : ""}
        {transactionErrorMessage !== "" ? (
          <Styled.TransactionError>
            {transactionErrorMessage}
          </Styled.TransactionError>
        ) : (
          ""
        )}
        {transactionSuccessMessage !== "" ? (
          <Styled.TransactionSuccess>
            {transactionSuccessMessage}
          </Styled.TransactionSuccess>
        ) : (
          ""
        )}
      </Styled.TransactionModal>
    </>
  );
};
