import { useCallback, useEffect, useState } from "react";

import { isArrayEqual } from "../../../api/utils";
import {
  useAccount,
  useAsset,
  useMembers,
  useUpdateAccountTransactionBuilder,
} from "../../../common/hooks";
import { useUserContext } from "../../../common/providers";
import { Asset, FullAccount, Vote } from "../../../common/types";
import { VoteRow } from "../types";

import { UseVotingResult } from "./useVoting.types";

// should add tab: string for the arg, to use in publish function
export function useVoting(): UseVotingResult {
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverApprovedVotes, setServerApprovedVotes] = useState<VoteRow[]>([]);
  const [localApprovedVotes, setLocalApprovedVotes] = useState<VoteRow[]>([]);
  const [allMembersVotes, setAllMembersVotes] = useState<VoteRow[]>([]);
  const [allMembers, setAllMembers] = useState<Vote[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [voteSearchValue, setVoteSearchValue] = useState<string>("");
  const [sonsFee, setSonsFee] = useState<number>(0);

  const { localStorageAccount, id } = useUserContext();
  const { getFullAccount } = useAccount();
  const { getCommittees, getSons, getWitnesses } = useMembers();
  const { defaultAsset, formAssetBalanceById } = useAsset();
  const { buildUpdateAccountTransaction } =
    useUpdateAccountTransactionBuilder();

  const getSelectedTabUpdateAccountTrx = useCallback(
    (memberIdentifier: 1 | 0 | 3) => {
      if (fullAccount !== undefined) {
        const new_options = fullAccount.account.options;

        const serverApprovedMembers = allMembers.filter((member) =>
          serverApprovedVotes.map((vote) => vote.id).includes(member.vote_id)
        );

        const localApprovedMembers = allMembers.filter((member) =>
          localApprovedVotes.map((vote) => vote.id).includes(member.vote_id)
        );

        const selectedTabLocalApprovedMembersIds = localApprovedMembers
          .filter(
            (approvedMember) =>
              parseInt(approvedMember.vote_id.split(":")[0]) ===
              memberIdentifier
          )
          .map((selectedMember) => selectedMember.vote_id);

        const otherTabsServerApprovedMembersIds = serverApprovedMembers
          .filter(
            (approvedMember) =>
              parseInt(approvedMember.vote_id.split(":")[0]) !==
              memberIdentifier
          )
          .map((otherMember) => otherMember.vote_id);
        new_options.votes = otherTabsServerApprovedMembersIds
          .concat(selectedTabLocalApprovedMembersIds)
          .sort((a, b) => {
            const aSplit = a.split(":");
            const bSplit = b.split(":");

            return parseInt(aSplit[1], 10) - parseInt(bSplit[1], 10);
          });
        const trx = buildUpdateAccountTransaction(
          {
            new_options,
            extensions: { value: { update_last_voting_time: true } },
          },
          id
        );
        return trx;
      }
    },
    [
      fullAccount,
      allMembers,
      serverApprovedVotes,
      localApprovedVotes,
      buildUpdateAccountTransaction,
      id,
    ]
  );

  // const getSelectedTabUpdateAccountFee = useCallback((memberIdentifier: 1 | 0 | 3) => {
  //   const trx =
  // }, [
  //   getSelectedTabUpdateAccountTrx,
  // ]);

  const handleVoteSearch = useCallback(
    (name: string) => {
      setLoading(true);
      setVoteSearchValue(name);
      setLoading(false);
    },
    [setVoteSearchValue, setLoading]
  );

  const sortVotesRows = useCallback((votes: VoteRow[]) => {
    return votes.sort(
      (a, b) => Number(b.votes.split(" ")[0]) - Number(a.votes.split(" ")[0])
    );
  }, []);

  const formVoteRow = useCallback(
    async (
      vote: Vote,
      votesIds: [string, string][],
      action: "add" | "remove" | ""
    ): Promise<VoteRow> => {
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
        key: vote.vote_id,
        type: voteType,
        name: name,
        website: vote.url,
        votes: `${votesAsset.amount} ${votesAsset.symbol}`,
        action: action,
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

      setAllMembers(allMembers);
      const allMembersVotes = await Promise.all(
        allMembers.map((member) => {
          return formVoteRow(member, allMembersIds, "add");
        })
      );
      setAllMembersVotes(sortVotesRows(allMembersVotes));

      if (fullAccount !== undefined) {
        const votes = fullAccount.votes;
        const serverApprovedVotes = await Promise.all(
          votes.map((vote) => {
            return formVoteRow(vote, allMembersIds, "remove");
          })
        );
        setServerApprovedVotes(sortVotesRows([...serverApprovedVotes]));
        setLocalApprovedVotes(sortVotesRows([...serverApprovedVotes]));
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
    setAllMembers,
    setAllMembersVotes,
    setServerApprovedVotes,
    setLocalApprovedVotes,
  ]);

  const checkVotesChanged = useCallback(
    (serverApprovedVotes: VoteRow[], localApprovedVotes: VoteRow[]) => {
      const isVotesChanged = !isArrayEqual(
        serverApprovedVotes,
        localApprovedVotes
      );
      setIsVotesChanged(isVotesChanged);
    },
    [setIsVotesChanged]
  );

  const approveVote = useCallback(
    (voteId: string) => {
      if (localApprovedVotes.find((vote) => vote.id === voteId) === undefined) {
        const selectedVote = allMembersVotes.find((vote) => vote.id === voteId);
        if (selectedVote !== undefined) {
          setLocalApprovedVotes(
            sortVotesRows([
              { ...selectedVote, action: "remove" },
              ...localApprovedVotes,
            ])
          );
          checkVotesChanged(serverApprovedVotes, [
            { ...selectedVote, action: "remove" },
            ...localApprovedVotes,
          ]);
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
          sortVotesRows(localApprovedVotes.filter((vote) => vote.id !== voteId))
        );
        checkVotesChanged(
          serverApprovedVotes,
          localApprovedVotes.filter((vote) => vote.id !== voteId)
        );
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
    loading,
    serverApprovedVotes,
    localApprovedVotes,
    isVotesChanged,
    allMembersVotes,
    voteSearchValue,
    approveVote,
    removeVote,
    resetChanges,
    handleVoteSearch,
  };
}
