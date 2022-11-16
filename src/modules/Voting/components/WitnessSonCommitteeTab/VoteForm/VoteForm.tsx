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
import { VoteRow } from "../../../types";

import * as Styled from "./VoteForm.styled";
import { useVoteForm } from "./hooks";

type Props = {
  tab: string;
  loading: boolean;
  isVotesChanged: boolean;
  resetChanges: () => void;
  handlePublishChanges: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  name: string;
  updateAccountFee: number;
  proxy: Proxy;
  votes: VoteRow[];
  afterSuccessTransactionModalClose?: () => void;
  approvedMembers: number;
  removedMembers: number;
};

export const VoteForm = ({
  tab,
  isVotesChanged,
  resetChanges,
  setTransactionErrorMessage,
  setTransactionSuccessMessage,
  handlePublishChanges,
  transactionErrorMessage,
  transactionSuccessMessage,
  loadingTransaction,
  name,
  updateAccountFee,
  proxy,
  afterSuccessTransactionModalClose,
  approvedMembers,
  removedMembers,
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
    neededKeyType: "active",
  });

  return (
    <Styled.VoteFormWrapper>
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
            neededKeyType="active"
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
            approvedMembers={approvedMembers}
            removedMembers={removedMembers}
            memberType={tab}
            afterClose={afterSuccessTransactionModalClose}
          />
        </Styled.VoteForm>
      </Styled.VoteForm.Provider>
    </Styled.VoteFormWrapper>
  );
};
