export type UseGenerateBitcoinAddressResult = {
  isPasswordModalVisible: boolean;
  bitcoinSidechainAccounts: BitcoinSidechainAccounts | undefined;
  status: string;
  submittingPassword: boolean;
  setBitcoinSidechainAccounts: (value: BitcoinSidechainAccounts) => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  handlePasswordModalCancel: () => void;
  confirm: () => void;
};

export type BitcoinSidechainAccounts =
  | {
      deposit: BitcoinAccount;
      withdraw: BitcoinAccount;
    }
  | undefined;

export type BitcoinAccount = {
  address: string;
  pubKey: string;
  privateKey: string;
};
