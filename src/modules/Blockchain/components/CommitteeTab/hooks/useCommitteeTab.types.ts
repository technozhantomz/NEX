export type CommitteeTab = {
  loading: boolean;
  committee: CommitteeData;
  searchValue: string;
  onSearch: (name: string) => void;
};

export type CommitteeData = {
  activeCommittee: number;
  data: CommitteeTableRow[];
  stats: CommitteeStats;
};

export type CommitteeStats = {
  active: number[];
};

export type CommitteeTableRow = {
  key: number;
  rank: number;
  name: string;
  totalVotes: string;
  // lastBlock: number;
  // missedBlocks: number;
  url: string;
};
