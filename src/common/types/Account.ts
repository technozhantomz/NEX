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
  active: Permissions;
  id: string;
  lifetime_referrer: string;
  lifetime_referrer_fee_percentage: number;
  membership_expiration_date: string;
  name: string;
  network_fee_percentage: number;
  options: AccountOptions;
  owner: Permissions;
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

export type GeneratedKey = { label: string; key: string };

export type Permissions = {
  account_auths: [string, number][];
  address_auths: [string, number][];
  key_auths: [string, number][];
  weight_threshold: number;
};

export type UserPermissions = {
  active: Permissions | string;
  memo: Permissions | string;
  owner: Permissions | string;
};

export type AccountOptions = {
  extensions: any[];
  memo_key: string;
  num_committee: number;
  num_witness: number;
  num_son: number;
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

export type ActivityRow = {
  key: string;
  time: string;
  type: string;
  info: string;
  id: string;
  fee: string;
};
