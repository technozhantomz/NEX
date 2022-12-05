import { useState } from "react";

import { VoteRow } from "../../../../types";

import { UseVoteTableResult } from "./useVoteTable.types";

type Args = {
  votesRows: VoteRow[];
};

export function useVoteTable({ votesRows }: Args): UseVoteTableResult {
  const [searchDataSource, setSearchDataSource] = useState<VoteRow[]>([]);
  const [prevVotesRows, setPrevVotesRows] = useState<VoteRow[]>(votesRows);
  if (votesRows !== prevVotesRows) {
    setPrevVotesRows(votesRows);
    setSearchDataSource(votesRows);
  }

  return {
    searchDataSource,
    setSearchDataSource,
  };
}
