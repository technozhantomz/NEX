import { Asset } from "./index";

export type IUserHistory = {
  blockNum: number;
  id: string;
  op: unknown[];
  opInTrx: number;
  result: unknown[];
  trxInBlock: number;
  virtualOp: number;
};

export type IUserKeys = {
  active: IUserKey | string;
  memo: { memo_key: string } | string;
  owner: IUserKey | string;
};

export type IUserKey = {
  account_auths: unknown[];
  address_auths: unknown[];
  key_auths: [][];
  weight: number;
};

export type IOptions = {
  extensions: unknown[];
  memo_key: string;
  num_committee: number;
  num_witness: number;
  votes: unknown[];
  voting_account: string;
};

export type IAccountData = {
  id: string;
  // membership_expiration_date?: string;
  // registrar?: string;
  // referrer?: string;
  // lifetime_referrer?: string;
  // network_fee_percentage?: number;
  // lifetime_referrer_fee_percentage?: number;
  // referrer_rewards_percentage?: number;
  name: string;
  // owner?: IUserKey;
  // options?: IOptions;
  // statistics?: IStatistics;
  // whitelisting_accounts?: unknown[];
  // whitelisted_accounts?: unknown[];
  // owner_special_authority?: unknown[];
  // top_n_control_flags?: number;
  // active?: IUserKey;
  // active_special_authority?: unknown[];
  // blacklisted_accounts?: unknown[];
  // blacklisting_accounts?: unknown[];
  assets: Asset[];
  history: IUserHistory[];
  keys: IUserKeys;
  limit_orders: unknown[];
  call_orders: unknown[];
  votes: unknown[];
  membership: unknown;
  sidechainAccounts: unknown[];
  contacts: unknown[];
};

export type IFullAccount = {
  account: IAccountData;
  assets: unknown[];
  balances: IBalance[];
  call_orders: unknown[];
  lifetime_referrer_name: string;
  limit_orders: unknown[];
  pending_dividend_payments: unknown[];
  proposals: unknown[];
  referrer_name: string;
  registrar_name: string;
  settle_orders: unknown[];
  statistics: unknown[];
  vesting_balance: unknown[];
  votes: unknown[];
  withdraws: unknown[];
};

export type IBalance = {
  asset_type: string;
  balance: number;
  id: string;
  maintance_flag: boolean;
  owner: string;
};

export type IStatistics = {
  id?: string;
  owner?: string;
  name?: string;
  most_recent_op?: string;
  total_ops?: number;
  removed_ops?: number;
  total_core_in_orders?: number;
  core_in_balance?: number;
  has_cashback_vb?: boolean;
  is_voting?: boolean;
  lifetime_fees_paid?: number;
  pending_fees?: number;
  pending_vested_fees?: number;
  last_vote_time?: string;
};

export type IFormAssetData = {
  asset_type: string;
  asset_id: string;
  id: string;
  symbol: string;
  balance: number;
  amount: number;
  precision: number;
};

export type ISignupFormData = {
  username: string;
  password: string;
  passwordCheck: string;
  confirm: boolean;
  saved: boolean;
  referrer?: string;
};
