import Link from "next/link";
import React from "react";

import { defaultToken } from "../../../api/params";
import { Button } from "../../../ui/src";

import * as Styled from "./TransactionModal.styled";
import { useTransactionModal } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  //handleOk: () => void;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  account: string;
  fee: number;
};

export const TransactionModal = ({
  visible,
  onCancel,
  //handleOk,
  transactionErrorMessage,
  transactionSuccessMessage,
  loadingTransaction,
  account,
  fee,
}: Props): JSX.Element => {
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
          <p>Account to upgrade</p>
          <Link href={`/user/${account}`}>{account}</Link>
        </Styled.DetailContainer>
        <Styled.DetailContainer>
          <p>Upgrade to lifetime member true</p>
          <p>true</p>
        </Styled.DetailContainer>
        <Styled.DetailContainer>
          <p>Fee</p>
          <p>{`${fee} ${defaultToken}`}</p>
        </Styled.DetailContainer>
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
