import counterpart from "counterpart";
import { capitalize, filter } from "lodash";
import Link from "next/link";

import { VoteForm, VoteTable } from "..";
import { FullAccount, Proxy, Vote } from "../../../../../common/types";
import { InfoCircleOutlined } from "../../../../../ui/src";

import * as Styled from "./VoteTab.styled";
import { useVoteTab } from "./hooks";

type Props = {
  tab: string;
  votesLoading: boolean;
  tabServerApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getUserVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  totalGpos: number;
  proxy: Proxy;
};

export const VoteTab = ({
  tab,
  votesLoading,
  tabServerApprovedVotes,
  allMembers,
  fullAccount,
  getUserVotes,
  allMembersIds,
  totalGpos,
  proxy,
}: Props): JSX.Element => {
  const {
    loading,
    allMembersRows,
    isVotesChanged,
    addChange,
    cancelChange,
    resetChanges,
    handlePublishChanges,
    loadingTransaction,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    transactionErrorMessage,
    transactionSuccessMessage,
    name,
    updateAccountFee,
    pendingChanges,
    afterSuccessTransactionModalClose,
  } = useVoteTab({
    tab,
    votesLoading,
    tabServerApprovedVotes,
    allMembers,
    fullAccount,
    getUserVotes,
    allMembersIds,
    totalGpos,
  });
  return (
    <Styled.Container>
      <Styled.Title>
        {counterpart.translate(`field.labels.vote_for`, {
          tab: capitalize(counterpart.translate(`pages.voting.${tab}.heading`)),
        })}
        <InfoCircleOutlined />
        <Link href={""}>
          <a>{counterpart.translate(`links.learn_more`)}</a>
        </Link>
      </Styled.Title>
      <Styled.VoteTabCard>
        {pendingChanges.length > 0 ? (
          <>
            <VoteTable
              tab={tab}
              type="pendingChanges"
              loading={votesLoading || loading}
              votes={pendingChanges}
              addChange={addChange}
              cancelChange={cancelChange}
            />
            <VoteForm
              tab={tab}
              loading={loading}
              isVotesChanged={isVotesChanged}
              resetChanges={resetChanges}
              name={name}
              handlePublishChanges={handlePublishChanges}
              loadingTransaction={loadingTransaction}
              setTransactionErrorMessage={setTransactionErrorMessage}
              setTransactionSuccessMessage={setTransactionSuccessMessage}
              transactionErrorMessage={transactionErrorMessage}
              transactionSuccessMessage={transactionSuccessMessage}
              updateAccountFee={updateAccountFee}
              proxy={proxy}
              approvedMembers={
                filter(pendingChanges, { status: "approved" }).length
              }
              removedMembers={
                filter(pendingChanges, { status: "unapproved" }).length
              }
              votes={pendingChanges}
              afterSuccessTransactionModalClose={
                afterSuccessTransactionModalClose
              }
            />
          </>
        ) : (
          ""
        )}

        <VoteTable
          tab={tab}
          type="allVotes"
          loading={votesLoading || loading}
          votes={allMembersRows}
          addChange={addChange}
          cancelChange={cancelChange}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
