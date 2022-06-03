export type UseGPOSTabResult = {
  GPOSInfo: GPOSInfo;
  setReadMore: (readMore: boolean) => void;
  readMore: boolean;
  loading: boolean;
  defaultAsset: any;
};

export type GPOSInfo = {
  gposBalance: number;
  performance: string;
  qualifiedReward: number;
  rakeReward: number;
  availableBalance: number;
  symbol: string;
};
