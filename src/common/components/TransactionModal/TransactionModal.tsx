import counterpart from "counterpart";

import { Button } from "../../../ui/src";
import { GeneratedKey, Proxy } from "../../types";

import * as Styled from "./TransactionModal.styled";
import {
  AccountUpdate,
  AccountUpgrade,
  CancelLimitOrder,
  CreateLimitOrder,
  CreateVestingBalance,
  Transfer,
  WithdrawVestingBalance,
} from "./components";
import { useTransactionModal } from "./hooks";

type Props = {
  visible: boolean;
  onCancel: () => void;
  transactionType: string;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  account?: string;
  fee: number;
  proxy?: Proxy;
  desiredMembers?: number;
  memberType?: string;
  generatedKeys?: GeneratedKey[];
  price?: string;
  sell?: string;
  buy?: string;
  expiration?: string;
  vestingAmount?: number;
  withdrawalAmount?: number;
  asset?: string;
  to?: string;
  quantity?: number;
  orderId?: string;
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
  generatedKeys,
  price,
  sell,
  buy,
  expiration,
  vestingAmount,
  withdrawalAmount,
  asset,
  to,
  quantity,
  orderId,
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
        generatedKeys={generatedKeys}
      />
    ),
    limit_order_create: (
      <CreateLimitOrder
        account={account as string}
        fee={fee as number}
        price={price as string}
        sell={sell as string}
        buy={buy as string}
        expiration={expiration as string}
      />
    ),
    limit_order_cancel: (
      <CancelLimitOrder
        account={account as string}
        fee={fee as number}
        orderId={orderId as string}
      />
    ),
    vesting_balance_create: (
      <CreateVestingBalance
        vestingAmount={vestingAmount}
        fee={fee}
        account={account}
      />
    ),
    vesting_balance_withdraw: (
      <WithdrawVestingBalance
        withdrawalAmount={withdrawalAmount}
        fee={fee}
        account={account}
      />
    ),
    transfer: (
      <Transfer
        account={account as string}
        fee={fee as number}
        asset={asset as string}
        to={to as string}
        quantity={quantity as number}
      />
    ),
  };

  const { useResetFormOnCloseModal, transactionModalForm } =
    useTransactionModal();

  useResetFormOnCloseModal(transactionModalForm, visible);

  return (
    <>
      <Styled.TransactionModal
        title={counterpart.translate(`pages.modal.transaction_modal.heading`)}
        visible={visible}
        onOk={() => {
          transactionModalForm.submit();
        }}
        onCancel={!loadingTransaction ? onCancel : undefined}
        centered={true}
        footer={
          transactionErrorMessage !== "" ? (
            <Button key="back" onClick={onCancel}>
              {counterpart.translate(`buttons.cancel`)}
            </Button>
          ) : transactionSuccessMessage !== "" ? (
            <Button key="back" onClick={onCancel}>
              {counterpart.translate(`buttons.done`)}
            </Button>
          ) : (
            [
              <Button
                key="back"
                onClick={onCancel}
                disabled={loadingTransaction}
              >
                {counterpart.translate(`buttons.cancel`)}
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  transactionModalForm.submit();
                }}
                loading={loadingTransaction}
              >
                {counterpart.translate(`buttons.confirm`)}
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
            {counterpart.translate(
              `transaction.trxTypes.${transactionType}.title`
            )}
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
