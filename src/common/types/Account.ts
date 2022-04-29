import { Vote } from ".";

export type FullAccount = {
  account: Account;
  lifetime_referrer_name: string;
  limit_orders: LimitOrder[];
  referrer_name: string;
  registrar_name: string;
  balances: Balance[];
  statistics: AccountStatistics;
  votes: Vote[];
};

export type Account = {
  active: UserKey;
  id: string;
  lifetime_referrer: string;
  lifetime_referrer_fee_percentage: number;
  membership_expiration_date: string;
  name: string;
  network_fee_percentage: number;
  options: AccountOptions;
  owner: UserKey;
  referrer: string;
  referrer_rewards_percentage: number;
  registrar: string;
  statistics: string;
  top_n_control_flags: number;
};

export type Balance = {
  asset_type: string;
  balance: number;
  id: string;
  maintenance_flag: boolean;
  owner: string;
};

export type LimitOrder = {
  deferred_fee: number;
  expiration: string;
  for_sale: number;
  id: string;
  sell_price: {
    base: {
      amount: number;
      asset_id: string;
    };
    quote: {
      amount: number;
      asset_id: string;
    };
  };
  seller: string;
};

export type UserKey = {
  account_auths: unknown[];
  address_auths: unknown[];
  key_auths: [string, number][];
  weight_threshold: number;
};

export type UserKeys = {
  active: UserKey | string;
  memo: UserKey | string;
  owner: UserKey | string;
};

export type AccountOptions = {
  extensions: unknown[];
  memo_key: string;
  num_committee: number;
  num_witness: number;
  votes: string[];
  voting_account: string;
};

export type ISignupFormData = {
  username: string;
  password: string;
  passwordCheck: string;
  confirm: boolean;
  saved: boolean;
  referrer?: string;
};

export type SidechainAcccount = {
  deposit_address: string;
  deposit_address_data: string;
  deposit_public_key: string;
  expires: string;
  id: string;
  sidechain: string;
  sidechain_address_account: string;
  valid_from: string;
  withdraw_address: string;
  withdraw_public_key: string;
};

export type AccountStatistics = {
  core_in_balance: number;
  has_cashback_vb: boolean;
  id: string;
  is_voting: false;
  last_vote_time: string;
  lifetime_fees_paid: number;
  most_recent_op: string;
  name: string;
  owner: string;
  pending_fees: number;
  pending_vested_fees: number;
  removed_ops: number;
  total_core_in_orders: number;
  total_ops: number;
};
