import { FormInstance } from "../../../../../../ui/src";

export type UseVoteFormResult = {
  voteForm: FormInstance<VoteForm>;
};

export type VoteForm = {
  password: string;
};
