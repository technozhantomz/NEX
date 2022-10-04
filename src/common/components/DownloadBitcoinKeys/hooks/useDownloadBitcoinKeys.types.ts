export type UseDownloadBitcoinKeysResult = {
  downloaded: boolean;
  downloadPrivateKeys: (sidechainDepositAddress: string) => void;
};
