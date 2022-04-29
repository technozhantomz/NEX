import { useCallback, useEffect, useState } from "react";
import { isArrayEqual } from "../../../../../api/utils";

import { useAccount, useAsset, useMembers } from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset, FullAccount, Vote } from "../../../../../common/types";

import { UseVotingResult, VoteRow } from "./useVoting.types";

// should add tab: string for the arg, to use in publish function
export function useVoting(): UseVotingResult {
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverApprovedVotes, setServerApprovedVotes] = useState<VoteRow[]>([]);
  const [localApprovedVotes, setLocalApprovedVotes] = useState<VoteRow[]>([]);
  const [allMembersVotes, setAllMemebersVotes] = useState<VoteRow[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { localStorageAccount } = useUserContext();
  const { getFullAccount } = useAccount();
  const { getCommittees, getSons, getWitnesses } = useMembers();
  const { defaultAsset, formAssetBalanceById } = useAsset();

  const formVoteRow = useCallback(
    async (vote: Vote, votesIds: [string, string][]): Promise<VoteRow> => {
      let voteType: "committees" | "witnesses" | "sons";
      switch (parseInt(vote.vote_id.charAt(0))) {
        case 0:
          voteType = "committees";
          break;
        case 1:
          voteType = "witnesses";
          break;
        case 3:
          voteType = "sons";
          break;
        default:
          voteType = "witnesses";
      }
      const name = votesIds.filter((voteId) => voteId[1] === vote.id)[0][0];

      const votesAsset = await formAssetBalanceById(
        (defaultAsset as Asset).id,
        Number(vote.total_votes)
      );

      return {
        id: vote.vote_id,
        type: voteType,
        name: name,
        webpage: vote.url,
        votes: `${votesAsset.amount} ${votesAsset.symbol}`,
        action: "",
      } as VoteRow;
    },
    [formAssetBalanceById, defaultAsset]
  );

  const getVotes = useCallback(async () => {
    try {
      setLoading(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      setFullAccount(fullAccount);

      let allMembers: Vote[] = [];
      let allMembersIds: [string, string][] = [];
      const { committees, committeesIds } = await getCommittees();
      const { sons, sonsIds } = await getSons();
      const { witnesses, witnessesIds } = await getWitnesses();
      allMembers = [...committees, ...sons, ...witnesses];
      allMembersIds = [...committeesIds, ...sonsIds, ...witnessesIds];

      const allMembersVotes = await Promise.all(
        allMembers.map((member) => {
          return formVoteRow(member, allMembersIds);
        })
      );
      setAllMemebersVotes(allMembersVotes);

      if (fullAccount !== undefined) {
        const votes = fullAccount.votes;
        const serverApprovedVotes = await Promise.all(
          votes.map((vote) => {
            return formVoteRow(vote, allMembersIds);
          })
        );
        setServerApprovedVotes([...serverApprovedVotes, {} as VoteRow]);
        setLocalApprovedVotes([...serverApprovedVotes]);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    setLoading,
    localStorageAccount,
    setFullAccount,
    getCommittees,
    getSons,
    getWitnesses,
    formVoteRow,
    setAllMemebersVotes,
    setServerApprovedVotes,
    setLocalApprovedVotes,
  ]);

  const checkVotesChanged = useCallback(() => {
    const isVotesChanged = !isArrayEqual(
      serverApprovedVotes,
      localApprovedVotes
    );
    setIsVotesChanged(isVotesChanged);
  }, [setIsVotesChanged, serverApprovedVotes, localApprovedVotes]);

  const approveVote = useCallback(
    (voteId: string) => {
      if (localApprovedVotes.find((vote) => vote.id === voteId) === undefined) {
        const selectedVote = allMembersVotes.find((vote) => vote.id === voteId);
        if (selectedVote !== undefined) {
          setLocalApprovedVotes([selectedVote, ...localApprovedVotes]);
          checkVotesChanged();
        }
      }
    },
    [
      localApprovedVotes,
      allMembersVotes,
      setLocalApprovedVotes,
      checkVotesChanged,
    ]
  );

  const removeVote = useCallback(
    (voteId: string) => {
      if (localApprovedVotes.find((vote) => vote.id === voteId) !== undefined) {
        setLocalApprovedVotes(
          localApprovedVotes.filter((vote) => vote.id !== voteId)
        );
        checkVotesChanged();
      }
    },
    [localApprovedVotes, setLocalApprovedVotes, checkVotesChanged]
  );

  const resetChanges = useCallback(() => {
    setLocalApprovedVotes(serverApprovedVotes);
    setIsVotesChanged(false);
  }, [serverApprovedVotes, setLocalApprovedVotes, setLocalApprovedVotes]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

  return {
    isModalVisible,
    isPassModalVisible,
    loading,
    serverApprovedVotes,
    localApprovedVotes,
    isVotesChanged,
    allMembersVotes,
    approveVote,
    removeVote,
    resetChanges,
  };
}
