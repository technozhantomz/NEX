import { useCallback, useMemo } from "react";

import { Form } from "../../../../../../ui/src";

import { UseVoteFormResult, VoteForm } from "./useVoteForm.types";

type Args = {
  localApprovedVotesIds: string[];
  tabServerApprovedVotesIds: string[];
  isVotesChanged: boolean;
};

export function useVoteForm({
  localApprovedVotesIds,
  tabServerApprovedVotesIds,
  isVotesChanged,
}: Args): UseVoteFormResult {
  const [voteForm] = Form.useForm<VoteForm>();

  const serverApprovedVotesCount = useMemo(() => {
    return tabServerApprovedVotesIds.length;
  }, [tabServerApprovedVotesIds]);

  const calculateremoveddMembersCount = useCallback(
    (localApprovedVotesIds: string[]) => {
      const removedVotesCount = tabServerApprovedVotesIds.filter(
        (voteId) => !localApprovedVotesIds.includes(voteId)
      ).length;

      return removedVotesCount;
    },
    [tabServerApprovedVotesIds]
  );

  const approvedMembers = useMemo(() => {
    return !isVotesChanged
      ? serverApprovedVotesCount
      : localApprovedVotesIds.length;
  }, [isVotesChanged, serverApprovedVotesCount, localApprovedVotesIds]);

  const removedMembers = useMemo(() => {
    return isVotesChanged
      ? calculateremoveddMembersCount(localApprovedVotesIds)
      : 0;
  }, [isVotesChanged, calculateremoveddMembersCount, localApprovedVotesIds]);

  return {
    voteForm,
    approvedMembers,
    removedMembers,
  };
}
