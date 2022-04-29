import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { CommitteeMember, SonAccount, WitnessAccount } from "../../types";

import { UseMembersResult } from "./useMembers.types";

export function useMembers(): UseMembersResult {
  const { dbApi } = usePeerplaysApiContext();
  const getWitnesses = useCallback(async () => {
    try {
      const witnessesIds: [string, string][] = await dbApi(
        "lookup_witness_accounts",
        ["", 100]
      );
      const witnesses: WitnessAccount[] = await dbApi("get_witnesses", [
        witnessesIds.map((witnessId) => witnessId[1]),
      ]);

      return { witnesses, witnessesIds };
    } catch (e) {
      console.log(e);
      return { witnesses: [], witnessesIds: [] };
    }
  }, [dbApi]);

  const getCommittees = useCallback(async () => {
    try {
      const committeesIds: [string, string][] = await dbApi(
        "lookup_committee_member_accounts",
        ["", 100]
      );
      const committees: CommitteeMember[] = await dbApi(
        "get_committee_members",
        [committeesIds.map((committeeId) => committeeId[1])]
      );
      return { committees, committeesIds };
    } catch (e) {
      console.log(e);
      return { committees: [], committeesIds: [] };
    }
  }, [dbApi]);

  const getSons = useCallback(async () => {
    try {
      const sonsIds: [string, string][] = await dbApi("lookup_son_accounts", [
        "",
        100,
      ]);
      const sons: SonAccount[] = await dbApi("get_sons", [
        sonsIds.map((sonIds) => sonIds[1]),
      ]);
      return { sons, sonsIds };
    } catch (e) {
      console.log(e);
      return { sons: [], sonsIds: [] };
    }
  }, [dbApi]);

  return {
    getWitnesses,
    getCommittees,
    getSons,
  };
}
