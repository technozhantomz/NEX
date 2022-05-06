import { SetStateAction } from "react";

import { PasswordModal } from "../../../../../common/components";

import * as Styled from "./VoteForm.styled";

type Props = {
  voteType: string;
  loading: boolean;
  isVotesChanged: boolean;
  isPassModalVisible: boolean;
  submittingPassword: boolean;
  resetChanges: () => void;
  confirm: () => void;
  publishChanges: (name: string, info: { values: any; forms: any }) => void;
  setIsPassModalVisible: (value: SetStateAction<boolean>) => void;
};

export const VoteForm = ({
  voteType,
  loading,
  isVotesChanged,
  isPassModalVisible,
  submittingPassword,
  resetChanges,
  confirm,
  publishChanges,
  setIsPassModalVisible,
}:
Props): JSX.Element => {
  return (
    <>
      <Styled.VoteForm.Provider onFormFinish={publishChanges}>
        <Styled.VoteForm
          //form={membershipForm}
          name={`${voteType}VoteForm`}
          onFinish={confirm}
        >
          {/* <MembershipModal
            visible={isMembershipModalVisible}
            onCancel={handleMembershipModalCancel}
            handleOk={handleMembershipModalConfirm}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={name}
            fee={membershipPrice}
          /> */}
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
        </Styled.VoteForm>
        <PasswordModal
          visible={isPassModalVisible}
          onCancel={() => {
            setIsPassModalVisible(false);
          }}
          submitting={submittingPassword}
        />
      </Styled.VoteForm.Provider>
    </>
  );
};
