import { FormInstance } from "../../../../../../ui/src";

export type UseVoteFormResult = {
  voteForm: FormInstance<VoteForm>;
  approvedMembers: number;
  removedMembers: number;
};

export type VoteForm = {
  password: string;
};
