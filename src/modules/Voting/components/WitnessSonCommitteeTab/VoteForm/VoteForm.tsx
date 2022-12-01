import counterpart from "counterpart";
import { Dispatch, SetStateAction } from "react";

import { DEFAULT_PROXY_ID } from "../../../../../api/params";
import {
  PasswordModal,
  TransactionModal,
} from "../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../common/hooks";
import { Proxy, SignerKey } from "../../../../../common/types";
import { Tooltip } from "../../../../../ui/src";

import * as Styled from "./VoteForm.styled";
import { useVoteForm } from "./hooks";

type Props = {
  confirmed: boolean;
  tab: string;
  isVotesChanged: boolean;
  resetChanges: () => void;
  handleVoting: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  name: string;
  updateAccountFee?: number;
  proxy: Proxy;
  localApprovedVotesIds: string[];
  tabServerApprovedVotesIds: string[];
  afterSuccessTransactionModalClose: (() => void) | undefined;
};

export const VoteForm = ({
  confirmed,
  tab,
  isVotesChanged,
  resetChanges,
  setTransactionErrorMessage,
  setTransactionSuccessMessage,
  handleVoting,
  transactionErrorMessage,
  transactionSuccessMessage,
  loadingTransaction,
  name,
  updateAccountFee,
  proxy,
  localApprovedVotesIds,
  tabServerApprovedVotesIds,
  afterSuccessTransactionModalClose,
}: Props): JSX.Element => {
  const { voteForm, approvedMembers, removedMembers } = useVoteForm({
    localApprovedVotesIds,
    tabServerApprovedVotesIds,
    isVotesChanged,
  });

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleVoting,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  const renderReconfirmActionButton = tabServerApprovedVotesIds.length ? (
    <Styled.Publish type="primary" htmlType="submit">
      {counterpart.translate(`buttons.reconfirm_votes`)}
    </Styled.Publish>
  ) : (
    <Tooltip
      placement="top"
      title={counterpart.translate(`tooltips.zero_votes`)}
    >
      <Styled.Publish type="primary" htmlType="submit" disabled={true}>
        {counterpart.translate(`buttons.reconfirm_votes`)}
      </Styled.Publish>
    </Tooltip>
  );

  const renderNotConfirmedActionButton = isVotesChanged ? (
    <Styled.Publish type="primary" htmlType="submit">
      {counterpart.translate(`buttons.confirm_votes`)}
    </Styled.Publish>
  ) : (
    renderReconfirmActionButton
  );

  const renderNotProxiedActionButton = confirmed ? (
    <Styled.Publish type="primary" htmlType="submit" disabled={true}>
      {counterpart.translate(`buttons.confirmed`)}
    </Styled.Publish>
  ) : (
    renderNotConfirmedActionButton
  );

  return (
    <Styled.VoteFormWrapper>
      <Styled.VoteForm.Provider onFormFinish={handleFormFinish}>
        <Styled.VoteForm
          form={voteForm}
          name="voteForm"
          onFinish={showPasswordModal}
        >
          <Styled.ActionsContainer>
            {proxy.id !== DEFAULT_PROXY_ID ? (
              <Tooltip
                placement="top"
                title={counterpart.translate(`tooltips.proxied_account`)}
              >
                <Styled.Publish
                  type="primary"
                  htmlType="submit"
                  disabled={true}
                >
                  {counterpart.translate(`buttons.proxied_account`)}
                </Styled.Publish>
              </Tooltip>
            ) : (
              renderNotProxiedActionButton
            )}
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
          </Styled.ActionsContainer>
          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={hidePasswordModal}
            neededKeyType="active"
          />
          <TransactionModal
            visible={isTransactionModalVisible}
            onCancel={hideTransactionModal}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={name}
            fee={updateAccountFee as number}
            transactionType="account_update"
            proxy={proxy}
            memberType={tab}
            approvedMembers={approvedMembers}
            removedMembers={removedMembers}
            afterClose={afterSuccessTransactionModalClose}
          />
        </Styled.VoteForm>
      </Styled.VoteForm.Provider>
    </Styled.VoteFormWrapper>
  );
};
