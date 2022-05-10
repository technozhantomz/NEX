export type WitnessAccount = {
  id: string;
  witness_account: string;
  last_aslot: number;
  signing_key: string;
  next_secret_hash: string;
  previous_secret: string;
  vote_id: string;
  total_votes: number;
  url: string;
  total_missed: number;
  last_confirmed_block_num: number;
  pay_vb: string;
};
