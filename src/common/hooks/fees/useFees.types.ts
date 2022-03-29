export type ChainOperations = {
  readonly [x: string]: number;
};

export type FeeAmounts = {
  fee?: number;
  price_per_kbyte?: number;
  basic_fee?: number;
  premium_fee?: number;
  lottery_asset?: number;
  distribution_base_fee?: number;
  distribution_fee_per_holder?: number;
  symbol3?: number;
  symbol4?: number;
  long_symbol?: number;
  membership_annual_fee?: number;
  membership_lifetime_fee?: number;
};

export type FeeParameter = [number, FeeAmounts];

export type UseFeesResult = {
  feeParameters: FeeParameter[];
  findOperationFee: (operationType: string) => FeeParameter | undefined;
  calculteTransferFee: (memo: string) => number | undefined;
};
