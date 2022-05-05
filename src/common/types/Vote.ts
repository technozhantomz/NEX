import { CommitteeMember, SonAccount, WitnessAccount } from ".";

export type Vote = WitnessAccount | SonAccount | CommitteeMember;

export type Candidate = {
  [key: string]: string;
  name: string;
  id: string;
};

export type VoteModalData = {
  account?: string;
  proxy?: string;
  candidateCount?: number;
  fee?: number;
};
