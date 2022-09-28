import { Dispatch, SetStateAction } from "react";

export type UseProxyTableResult = {
  searchDataSource: ProxyRow[];
  setSearchDataSource: Dispatch<SetStateAction<ProxyRow[]>>;
  getActionString: (action: string) => string;
};

export type ProxyRow = {
  id: string;
  key: string;
  name: string;
  witnessVotes: number;
  sonsVotes: number;
  committeeVotes: number;
  lastVoted: string;
  status: string;
  action: string;
};
