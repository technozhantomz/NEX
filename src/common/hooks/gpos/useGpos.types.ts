export type GPOSInfo = {
  gposBalance: number;
  performance: string;
  qualifiedReward: number;
  rakeReward: number;
  availableBalance: number;
  symbol: string;
};

export enum GposPerformance {
  MAX_REWARDS = "Max Rewards",
  GREATE_REWARDS = "Great Rewards",
  GOOD_REWARDS = "Good Rewards",
  OK_REWARDS = "OK Rewards",
  LOW_REWARDS = "Low Rewards",
  LOWER_REWARDS = "Lower Rewards",
  CRITICAL_LOW = "Critical Low",
  NO_REWARDS = "No Rewards",
}

export type UseGposResult = {
  getGposInfo: (accountId: string) => Promise<GPOSInfo | undefined>;
  getPerformanceString: (qualifiedReward: number) => GposPerformance;
};
