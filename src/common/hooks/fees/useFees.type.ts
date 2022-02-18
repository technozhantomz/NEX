export type IUseFees = {
  getFees: () => Promise<IFee[]>;
  //fees: IFee[] | undefined;
};

export type IFee = {
  fee: number;
  membership_lifetime_fee: number;
  name: string;
  price_per_kbyte: number;
};
