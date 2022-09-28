import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { VoteRow } from "../../../../types";

import { UseVoteTableResult } from "./useVoteTable.types";

type Args = {
  votes: VoteRow[];
};

export function useVoteTable({ votes }: Args): UseVoteTableResult {
  const [searchDataSource, setSearchDataSource] = useState<VoteRow[]>([]);

  const getActionString = (action: string): string => {
    switch (action) {
      case "add":
        return counterpart.translate(`pages.voting.actions.add`);
      case "remove":
        return counterpart.translate(`pages.voting.actions.remove`);
      case "cancel":
        return counterpart.translate(`pages.voting.actions.cancel`);
      default:
        return counterpart.translate(`pages.voting.actions.add`);
    }
  };

  useEffect(() => {
    if (votes.length > 0) {
      setSearchDataSource(votes);
    }
  }, [votes]);

  return {
    searchDataSource,
    setSearchDataSource,
    getActionString,
  };
}
