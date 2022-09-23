import counterpart from "counterpart";
import { capitalize } from "lodash";
import Link from "next/link";

import { VoteForm, VoteTable } from "..";
import { FullAccount, Proxy, Vote } from "../../../../../common/types";
import { InfoCircleOutlined } from "../../../../../ui/src";

import * as Styled from "./VoteTab.styled";
import { useVoteTab } from "./hooks";

type Props = {
  tab: string;
  votesLoading: boolean;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  totalGpos: number;
  proxy: Proxy;
};

export const VoteTab = ({
  tab,
  votesLoading,
  serverApprovedVotes,
  allMembers,
  fullAccount,
  getVotes,
  allMembersIds,
  totalGpos,
  proxy,
}: Props): JSX.Element => {
  const {
    loading,
    allMembersRows,
    localApprovedRows,
    isVotesChanged,
    handleVoteSearch,
    voteSearchValue,
    approveVote,
    removeVote,
    resetChanges,
    handlePublishChanges,
    loadingTransaction,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    transactionErrorMessage,
    transactionSuccessMessage,
    name,
    updateAccountFee,
    searchChange,
    searchError,
    isSameAccount,
    searchValue,
    pendingChanges,
  } = useVoteTab({
    tab,
    votesLoading,
    serverApprovedVotes,
    allMembers,
    fullAccount,
    getVotes,
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
        <Link href={""}>Learn More</Link>
      </Styled.Title>
      <Styled.VoteTabCard>
        {pendingChanges.length > 0 ? (
          <>
            <VoteTable
              tab={tab}
              type="pendingChanges"
              loading={votesLoading || loading}
              votes={
                voteSearchValue === ""
                  ? pendingChanges
                  : localApprovedRows.filter((approvedVote) =>
                      approvedVote.name
                        .toLowerCase()
                        .startsWith(voteSearchValue.toLowerCase())
                    )
              }
              approveVote={approveVote}
              removeVote={removeVote}
            />
            <VoteForm
              tab={tab}
              loading={loading}
              isVotesChanged={isVotesChanged}
              handleVoteSearch={handleVoteSearch}
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
              desiredMembers={localApprovedRows.length}
              searchChange={searchChange}
              searchError={searchError}
              isSameAccount={isSameAccount}
              searchValue={searchValue}
              votes={allMembersRows.filter(
                (vote) =>
                  !localApprovedRows
                    .map((approvedVote) => approvedVote.id)
                    .includes(vote.id)
              )}
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
          approveVote={approveVote}
          removeVote={removeVote}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
