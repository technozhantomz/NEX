export type IUseFees = {
  getFees: () => Promise<IFee[]>;
};

export type IFee = {
  fee: number;
  membership_lifetime_fee: number;
  name: string;
  price_per_kbyte: number;
};
