import counterpart from "counterpart";
import { capitalize } from "lodash";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { DEFAULT_PROXY_ID } from "../../../../../api/params";
import {
  PasswordModal,
  TransactionModal,
} from "../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../common/hooks";
import { Proxy } from "../../../../../common/types";
import { Form, Tooltip } from "../../../../../ui/src";

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
  proxy: Proxy;
  desiredMembers: number;
  searchError: boolean;
  searchChange: (inputEvent: ChangeEvent<HTMLInputElement>) => Promise<void>;
  searchValue: string;
  isSameAccount: boolean;
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
  proxy,
  desiredMembers,
  searchChange,
  searchError,
  isSameAccount,
  searchValue,
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
    <Styled.VoteFormWrapper>
      <Styled.Title>
        {counterpart.translate(`field.labels.vote_for`, {
          tab: capitalize(tab),
        })}
      </Styled.Title>

      <Form.Item
        className="search-input"
        validateStatus={searchError ? "error" : undefined}
        help={
          searchError
            ? isSameAccount
              ? counterpart.translate(`field.errors.same_account`)
              : counterpart.translate(`field.errors.no_account`)
            : undefined
        }
      >
        <Styled.VoteSearch
          size="large"
          placeholder={counterpart.translate(
            `field.placeholder.search_accounts`
          )}
          onSearch={handleVoteSearch}
          loading={loading}
          onChange={searchChange}
          value={searchValue}
        />
      </Form.Item>
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
                {counterpart.translate(`buttons.reset_changes`)}
              </Styled.CardFormLinkButtonDisabled>
            ) : (
              <Styled.CardFormLinkButton
                onClick={() => {
                  resetChanges();
                }}
              >
                <Styled.Reset />
                {counterpart.translate(`buttons.reset_changes`)}
              </Styled.CardFormLinkButton>
            )}
            {proxy.id !== DEFAULT_PROXY_ID ? (
              <Tooltip
                placement="top"
                title={"You have proxied your voting power"}
              >
                <Styled.Publish
                  type="primary"
                  htmlType="submit"
                  disabled={true}
                >
                  {counterpart.translate(`buttons.publish_changes`)}
                </Styled.Publish>
              </Tooltip>
            ) : (
              <Styled.Publish
                type="primary"
                htmlType="submit"
                disabled={!isVotesChanged}
              >
                {counterpart.translate(`buttons.publish_changes`)}
              </Styled.Publish>
            )}
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
            transactionType="account_update"
            proxy={proxy}
            desiredMembers={desiredMembers}
            memberType={tab}
          />
        </Styled.VoteForm>
      </Styled.VoteForm.Provider>
    </Styled.VoteFormWrapper>
  );
};
