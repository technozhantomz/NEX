export type UseFees = {
  getFees: () => Promise<Fee[]>;
  feeCalculator: FeedCalculator;
};

type FeedCalculator = {
  transfer: (memo: string) => Promise<number>;
};

export type Fee = {
  fee: number;
  membership_lifetime_fee: number;
  name: string;
  price_per_kbyte: number;
};

export type TransactionFee = {
  amount: number;
  asset_id: string;
};
