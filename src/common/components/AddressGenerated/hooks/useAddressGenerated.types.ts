export type UseAddressGenerated = {
  downloaded: boolean;
  downloadPrivateKeys: (sidechainDepositAddress: string) => void;
};
