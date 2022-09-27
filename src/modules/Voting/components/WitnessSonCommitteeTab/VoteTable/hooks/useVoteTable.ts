import { useEffect, useState } from "react";

import { VoteRow } from "../../../../types";

import { UseVoteTableResult } from "./useVoteTable.types";

type Args = {
  votes: VoteRow[];
};

export function useVoteTable({ votes }: Args): UseVoteTableResult {
  const [searchDataSource, setSearchDataSource] = useState<VoteRow[]>([]);

  useEffect(() => {
    if (votes.length > 0) {
      setSearchDataSource(votes);
    }
  }, [votes]);

  return {
    searchDataSource,
    setSearchDataSource,
  };
}
