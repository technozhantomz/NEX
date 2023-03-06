import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { CommitteeMember, SonAccount, WitnessAccount } from "../../types";

import { UseMembersResult } from "./useMembers.types";

export function useMembers(): UseMembersResult {
  const { dbApi } = usePeerplaysApiContext();
  const getWitnesses = useCallback(async () => {
    try {
      let witnessesIds: [string, string][] = [];
      let witnesses: WitnessAccount[] = [];
      witnessesIds = await dbApi("lookup_witness_accounts", ["", 100]);
      if (witnessesIds !== undefined && witnessesIds.length > 0) {
        witnesses = await dbApi("get_witnesses", [
          witnessesIds.map((witnessId) => witnessId[1]),
        ]);
      }

      return { witnesses, witnessesIds };
    } catch (e) {
      console.log(e);
      return { witnesses: [], witnessesIds: [] };
    }
  }, [dbApi]);

  const getCommittees = useCallback(async () => {
    try {
      let committeesIds: [string, string][] = [];
      let committees: CommitteeMember[] = [];
      committeesIds = await dbApi("lookup_committee_member_accounts", [
        "",
        100,
      ]);
      if (committeesIds !== undefined && committeesIds.length > 0) {
        committees = await dbApi("get_committee_members", [
          committeesIds.map((committeeId) => committeeId[1]),
        ]);
      }
      return { committees, committeesIds };
    } catch (e) {
      console.log(e);
      return { committees: [], committeesIds: [] };
    }
  }, [dbApi]);

  const getSons = useCallback(async () => {
    try {
      let sonsIds: [string, string][] = [];
      let sons: SonAccount[] = [];
      sonsIds = await dbApi("lookup_son_accounts", ["", 100]);
      if (sonsIds !== undefined && sonsIds.length > 0) {
        sons = await dbApi("get_sons", [sonsIds.map((sonIds) => sonIds[1])]);
      }
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
