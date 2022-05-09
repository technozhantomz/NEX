import { VoteForm, VoteTable } from "..";
import { FullAccount, Vote } from "../../../../../common/types";

import * as Styled from "./VoteTab.styled";
import { useVoteTab } from "./hooks";
//import { VoteRow } from "../../../types";

type Props = {
  tab: string;
  votesLoading: boolean;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  totalGpos: number;
  // loading: boolean;
  // isVotesChanged: boolean;
  // localApprovedVotes: VoteRow[];
  // localNotApprovedVotes: VoteRow[];
  // approveVote: (voteId: string) => void;
  // removeVote: (voteId: string) => void;
  // handleVoteSearch: (name: string) => void;
  // resetChanges: () => void;
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
}: Props): JSX.Element => {
  const {
    loading,
    allMembersRows,
    //serverApprovedRows,
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
              ? allMembersRows.filter(
                  (vote) =>
                    !localApprovedRows
                      .map((approvedVote) => approvedVote.id)
                      .includes(vote.id)
                )
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
