import { Amount } from "../../../common/types";

export type GposInfo = {
  account_vested_balance: number;
  allowed_withdraw_amount: number;
  award: Amount;
  current_subperiod: number;
  last_voted_time: string;
  total_amount: string;
  vesting_factor: string;
};
