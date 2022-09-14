import { Dispatch, SetStateAction } from "react";

export type UseSonsTabResult = {
  loading: boolean;
  sonsTableRows: SonsTableRow[];
  searchDataSource: SonsTableRow[];
  sonsStats: SonsStats;
  activeSons: number;
  setSearchDataSource: Dispatch<SetStateAction<SonsTableRow[]>>;
};

export type SonsStats = {
  active: number[];
};

export type SonsTableRow = {
  key: number;
  rank: number;
  name: string;
  active: boolean;
  url: string;
  totalVotes: string;
};
