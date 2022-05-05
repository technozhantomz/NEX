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
