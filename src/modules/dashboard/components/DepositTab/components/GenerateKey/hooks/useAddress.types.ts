export type AddressDetails = {
  address: string;
  publicKey: string;
};

export type GenerateAddress = {
  generateAddress: () => Promise<void>;
};
