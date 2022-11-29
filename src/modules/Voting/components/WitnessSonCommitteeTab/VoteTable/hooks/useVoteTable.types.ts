import { Dispatch, SetStateAction } from "react";

import { VoteRow } from "../../../../types";

export type UseVoteTableResult = {
  searchDataSource: VoteRow[];
  setSearchDataSource: Dispatch<SetStateAction<VoteRow[]>>;
};
