export type Vote = {
  [key: string]: string | string[] | number | undefined;
  id: string;
  name?: string;
  vote_id: string;
  total_votes: number;
  url: string;
  last_aslot?: number;
  last_confirmed_block_num?: number;
  next_secret_hash?: string;
  pay_vb?: string;
  previous_secret?: string;
  signing_key?: string;
  total_missed?: number;
  witness_account?: string;
  son_account?: string;
  deposit?: string;
  statistics?: string;
  status?: string;
  sidechain_public_keys?: string[];
  committee_member_account?: string;
};

export type Candidate = {
  [key: string]: string;
  name: string;
  id: string;
};
