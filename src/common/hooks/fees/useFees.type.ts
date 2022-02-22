export type IUseFees = {
  getFees: () => Promise<IFee[]>;
  feeCalculator: IFeedCalculator;
  //fees: IFee[] | undefined;
};

type IFeedCalculator = {
  transfer: (memo: string) => number;
};

export type IFee = {
  fee: number;
  membership_lifetime_fee: number;
  name: string;
  price_per_kbyte: number;
};

export type ITransactionFee = {
  amount: number;
  asset_id: string;
};
