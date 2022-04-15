export type GenerateBitcoinAddressResult = {
  isPasswordModalVisible: boolean;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  handlePasswordModalCancel: () => void;
  confirm: () => void;
  status: string;
  submittingPassword: boolean;
};
