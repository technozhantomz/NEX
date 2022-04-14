export type GenerateBitcoinAddressResult = {
  isPasswordModalVisible: boolean;
  privateKeyResult: PrivateKeyResult | undefined;
  status: string;
  submittingPassword: boolean;
  setPrivateKeyResult: (value: PrivateKeyResult) => void;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  handlePasswordModalCancel: () => void;
  confirm: () => void;
};

export type PrivateKeyResult =
  | {
      deposit: AddressDetails;
      withdraw: AddressDetails;
    }
  | undefined;

export type AddressDetails = {
  address: string;
  pubKey: string;
  privateKey: string;
};
