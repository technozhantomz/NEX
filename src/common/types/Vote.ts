import { CommitteeMember, SonAccount, WitnessAccount } from ".";

export type Vote = WitnessAccount | SonAccount | CommitteeMember;

export type VoteType = "witnesses" | "sons" | "committees";
