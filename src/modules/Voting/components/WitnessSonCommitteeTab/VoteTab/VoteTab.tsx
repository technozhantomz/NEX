import { VoteForm, VoteTable } from "..";
import { FullAccount, Proxy, Vote } from "../../../../../common/types";

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
      <Styled.VoteTabCard>
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
        />
        <VoteTable
          type="approved"
          loading={votesLoading || loading}
          votes={
            voteSearchValue === ""
              ? localApprovedRows
              : localApprovedRows.filter((approvedVote) =>
                  approvedVote.name
                    .toLowerCase()
                    .startsWith(voteSearchValue.toLowerCase())
                )
          }
          approveVote={approveVote}
          removeVote={removeVote}
        />
        <VoteTable
          type="notApproved"
          loading={votesLoading || loading}
          votes={
            voteSearchValue === ""
              ? allMembersRows
              : allMembersRows
                  .filter(
                    (vote) =>
                      !localApprovedRows
                        .map((approvedVote) => approvedVote.id)
                        .includes(vote.id)
                  )
                  .filter((notApprovedVote) =>
                    notApprovedVote.name
                      .toLowerCase()
                      .startsWith(voteSearchValue.toLowerCase())
                  )
          }
          approveVote={approveVote}
          removeVote={removeVote}
        />
      </Styled.VoteTabCard>
    </Styled.Container>
  );
};
