export type UseDownloadEthereumKeysResult = {
  downloaded: boolean;
  downloadPrivateKeys: (sidechainDepositAddress: string) => void;
};
