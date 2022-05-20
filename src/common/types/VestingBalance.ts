import { Amount } from ".";

export type VestingBalance = {
  balance: Amount;
  balance_type: string;
  id: string;
  owner: string;
  policy: VestingPolicy;
};

export type VestingPolicy = [
  number,
  {
    begin_balance: number;
    begin_timestamp: string;
    vesting_cliff_seconds: number;
    vesting_duration_seconds: number;
  }
];
