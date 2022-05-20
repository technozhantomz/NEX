import { Amount } from ".";

export type GPOSInfoResponse = {
  account_vested_balance: number;
  allowed_withdraw_amount: number;
  award: Amount;
  current_subperiod: number;
  last_voted_time: string;
  total_amount: number;
  vesting_factor: string;
};
