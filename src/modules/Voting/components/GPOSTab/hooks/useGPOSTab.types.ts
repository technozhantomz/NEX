export type UseGPOSTab = {
  GPOSInfo: GPOSInfo;
};

export type GPOSInfo = {
  gposBalance: number;
  performance: string;
  qualifiedReward: number;
  rakeReward: number;
  availableBalance: number;
  symbol: string;
};

export type GPOSInfoResponse = {
  account_vested_balance: number;
  allowed_withdraw_amount: number;
  award: {
    amount: number;
    asset_id: string;
  };
  current_subperiod: number;
  last_voted_time: string;
  total_amount: number;
  vesting_factor: string;
};
