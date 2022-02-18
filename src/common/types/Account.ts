export type FullAccount = {
  account: Account;
  lifetime_referrer_name: string;
  limit_orders: LimitOrder[];
  referrer_name: string;
  registrar_name: string;
  balances: Balance[];
};

export type Account = {
  id: string;
  lifetime_referrer: string;
  lifetime_referrer_fee_percentage: number;
  membership_expiration_date: string;
  name: string;
  network_fee_percentage: number;
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
