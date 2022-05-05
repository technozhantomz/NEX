import { useCallback, useEffect, useState } from "react";

import { isArrayEqual } from "../../../api/utils";
import { useAccount, useAsset, useMembers } from "../../../common/hooks";
import { useUserContext } from "../../../common/providers";
import { Asset, FullAccount, Vote } from "../../../common/types";
import { VoteRow } from "../types";

import { UseVotingResult } from "./useVoting.types";

// should add tab: string for the arg, to use in publish function
export function useVoting(voteType: string): UseVotingResult {
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverApprovedVotes, setServerApprovedVotes] = useState<VoteRow[]>([]);
  const [localApprovedVotes, setLocalApprovedVotes] = useState<VoteRow[]>([]);
  const [localNotApprovedVotes, setLocalNotApprovedVotes] = useState<VoteRow[]>(
    []
  );
  const [allMembersVotes, setAllMembersVotes] = useState<VoteRow[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [voteSearchValue, setVoteSearchValue] = useState<string>("");
  const [isPassModalVisible, setIsPassModalVisible] = useState<boolean>(false);
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);

  const { localStorageAccount } = useUserContext();
  const { getFullAccount } = useAccount();
  const { getCommittees, getSons, getWitnesses } = useMembers();
  const { defaultAsset, formAssetBalanceById } = useAsset();

  const confirm = () => {
    if (isVotesChanged) setIsPassModalVisible(true);
  };

  const publishChanges = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handlePublishChanges(values.password);
      });
    }
  };

  const handlePublishChanges = (password: string) => {
    setSubmittingPassword(true);
    console.log(password);
    console.log(serverApprovedVotes);
    console.log(localApprovedVotes);
    setSubmittingPassword(false);
  };

  const handleVoteSearch = useCallback(
    (name: string) => {
      setLoading(true);
      setVoteSearchValue(name);
      setLoading(false);
    },
    [setVoteSearchValue, setLoading]
  );

  const filterLocalVotes = useCallback(
    (voteRows: VoteRow[], searchValue: string): VoteRow[] => {
      return searchValue === ""
        ? voteRows.filter((vote) => vote.type === voteType)
        : voteRows
            .filter((vote) => vote.type === voteType)
            .filter((vote) =>
              vote.name.toLowerCase().startsWith(searchValue.toLowerCase())
            );
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
      let _voteType;
      switch (parseInt(vote.vote_id.charAt(0))) {
        case 0:
          _voteType = "committees";
          break;
        case 1:
          _voteType = "witnesses";
          break;
        case 3:
          _voteType = "sons";
          break;
        default:
          _voteType = "witnesses";
      }
      const name = votesIds.filter((voteId) => voteId[1] === vote.id)[0][0];
      const votesAsset = await formAssetBalanceById(
        (defaultAsset as Asset).id,
        Number(vote.total_votes)
      );
      return {
        id: vote.vote_id,
        key: vote.vote_id,
        type: _voteType,
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
      switch (true) {
        case voteType === "committees":
          allMembers = [...committees];
          allMembersIds = [...committeesIds];
          break;
        case voteType === "sons":
          allMembers = [...sons];
          allMembersIds = [...sonsIds];
          break;
        case voteType === "witnessess":
          allMembers = [...witnesses];
          allMembersIds = [...witnessesIds];
          break;
        default:
          allMembers = [...committees, ...sons, ...witnesses];
          allMembersIds = [...committeesIds, ...sonsIds, ...witnessesIds];
      }

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
    setLocalNotApprovedVotes(
      allMembersVotes
        .filter((vote) => vote.type === voteType)
        .filter(
          (vote) =>
            !localApprovedVotes
              .map((approvedVote) => approvedVote.id)
              .includes(vote.id)
        )
    );
  }, [localApprovedVotes, setLocalApprovedVotes, checkVotesChanged]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

  return {
    loading,
    serverApprovedVotes,
    localApprovedVotes,
    localNotApprovedVotes,
    isVotesChanged,
    allMembersVotes,
    voteSearchValue,
    isPassModalVisible,
    submittingPassword,
    confirm,
    publishChanges,
    approveVote,
    removeVote,
    resetChanges,
    handleVoteSearch,
    setIsPassModalVisible,
    filterLocalVotes,
  };
}
