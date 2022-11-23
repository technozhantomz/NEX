import { Dispatch, SetStateAction } from "react";

import { FormInstance } from "../../../../../../ui/src";
import { VoteRow } from "../../../../types";

export type UseVoteTableResult = {
  searchDataSource: VoteRow[];
  setSearchDataSource: Dispatch<SetStateAction<VoteRow[]>>;
  getActionString: (action: string) => string;
  reconfirmVoteForm: FormInstance<ReconfirmVoteForm>;
};

export type ReconfirmVoteForm = {
  password: string;
};
