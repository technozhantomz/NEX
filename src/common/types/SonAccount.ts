export type SonAccount = {
  deposit: string;
  id: string;
  pay_vb: string;
  sidechain_public_keys: [string, string];
  signing_key: string;
  son_account: string;
  statistics: string;
  status: string;
  total_votes: number;
  url: string;
  vote_id: string;
};

export type SonStatistics = {
  current_interval_downtime: number;
  deregistered_timestamp: Date;
  id: string;
  last_active_timestamp: Date;
  last_down_timestamp: Date;
  owner: string;
  sidechain_txs_reported: string[];
  total_downtime: number;
  total_sidechain_txs_reported: string[];
  total_txs_signed: string[];
  total_voted_time: number;
  txs_signed: string[];
};
