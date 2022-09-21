import { Dispatch, SetStateAction } from "react";

export type UseCommitteeTabResult = {
  loading: boolean;
  committeeTableRows: CommitteeTableRow[];
  activeCommittee: number;
  committeeStats: number[];
  searchDataSource: CommitteeTableRow[];
  setSearchDataSource: Dispatch<SetStateAction<CommitteeTableRow[]>>;
};

export type CommitteeTableRow = {
  key: number;
  rank: number;
  name: string;
  active: boolean;
  url: string;
  totalVotes: string;
};
