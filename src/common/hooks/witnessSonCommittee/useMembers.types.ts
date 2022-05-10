import { CommitteeMember, SonAccount, WitnessAccount } from "../../types";

export type UseMembersResult = {
  getWitnesses: () => Promise<{
    witnesses: WitnessAccount[];
    witnessesIds: [string, string][];
  }>;
  getCommittees: () => Promise<{
    committees: CommitteeMember[];
    committeesIds: [string, string][];
  }>;
  getSons: () => Promise<{ sons: SonAccount[]; sonsIds: [string, string][] }>;
};
