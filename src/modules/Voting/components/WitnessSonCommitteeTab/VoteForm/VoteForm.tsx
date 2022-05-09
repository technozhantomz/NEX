import { capitalize } from "lodash";
import { Dispatch, SetStateAction } from "react";

import {
  PasswordModal,
  TransactionModal,
} from "../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../common/hooks";

import * as Styled from "./VoteForm.styled";
import { useVoteForm } from "./hooks";

type Props = {
  tab: string;
  loading: boolean;
  isVotesChanged: boolean;
  resetChanges: () => void;
  handleVoteSearch: (name: string) => void;
  handlePublishChanges: (password: string) => Promise<void>;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  name: string;
  updateAccountFee: number;
};

export const VoteForm = ({
  tab,
  loading,
  isVotesChanged,
  resetChanges,
  handleVoteSearch,
  setTransactionErrorMessage,
  setTransactionSuccessMessage,
  handlePublishChanges,
  transactionErrorMessage,
  transactionSuccessMessage,
  loadingTransaction,
  name,
  updateAccountFee,
}: Props): JSX.Element => {
  const { voteForm } = useVoteForm();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handlePublishChanges,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });
  return (
    <>
      <Styled.Title>Vote for {capitalize(tab)}</Styled.Title>
      <Styled.VoteSearch
        size="large"
        placeholder="Search account"
        onSearch={handleVoteSearch}
        loading={loading}
      />
      <Styled.VoteForm.Provider onFormFinish={handleFormFinish}>
        <Styled.VoteForm
          form={voteForm}
          name="voteForm"
          onFinish={showPasswordModal}
        >
          <Styled.ActionsContainer>
            {!isVotesChanged ? (
              <Styled.CardFormLinkButtonDisabled>
                <Styled.Reset />
                Reset Changes
              </Styled.CardFormLinkButtonDisabled>
            ) : (
              <Styled.CardFormLinkButton
                onClick={() => {
                  resetChanges();
                }}
              >
                <Styled.Reset />
                Reset Changes
              </Styled.CardFormLinkButton>
            )}
            <Styled.Publish
              type="primary"
              htmlType="submit"
              disabled={!isVotesChanged}
            >
              Publish Changes
            </Styled.Publish>
          </Styled.ActionsContainer>
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
            account={name}
            fee={updateAccountFee}
            transactionType="account_upgrade"
          />
        </Styled.VoteForm>
      </Styled.VoteForm.Provider>
    </>
  );
};
