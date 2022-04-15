export type UseAddressGeneratedResult = {
  downloaded: boolean;
  downloadPrivateKeys: (sidechainDepositAddress: string) => void;
};
