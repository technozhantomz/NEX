export type UseCommitteeTabResult = {
  loading: boolean;
  committeeTableRows: CommitteeTableRow[];
  activeCommittee: number;
  committeeStats: number[];
  searchValue: string;
  handleSearch: (name: string) => void;
};

export type CommitteeTableRow = {
  key: number;
  rank: number;
  name: string;
  totalVotes: string;
  url: string;
};
