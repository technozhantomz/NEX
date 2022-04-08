import Link from "next/link";
import React from "react";

import { defaultToken } from "../../../../../../api/params";
import { Button } from "../../../../../../ui/src";

import * as Styled from "./MembershipModal.styled";

type Props = {
  visible: boolean;
  onCancel: () => void;
  handleOk: () => void;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  account: string;
  fee: number;
};

export const MembershipModal = ({
  visible,
  onCancel,
  handleOk,
  transactionErrorMessage,
  transactionSuccessMessage,
  loadingTransaction,
  account,
  fee,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.MembershipModal
        title="Please confirm the transaction"
        visible={visible}
        onOk={handleOk}
        onCancel={onCancel}
        centered={true}
        footer={
          transactionErrorMessage !== "" || transactionSuccessMessage !== "" ? (
            <Button key="back" onClick={onCancel}>
              Cancel
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
                onClick={handleOk}
                disabled={loadingTransaction}
              >
                Confirm
              </Button>,
            ]
          )
        }
      >
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
          <Styled.TransactionError>
            {transactionSuccessMessage}
          </Styled.TransactionError>
        ) : (
          ""
        )}
      </Styled.MembershipModal>
    </>
  );
};
