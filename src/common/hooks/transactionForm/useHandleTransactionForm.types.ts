export type UseHandleTransactionFormResult = {
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  hidePasswordModal: () => void;
  showPasswordModal: () => void;
  showTransactionModal: () => void;
  hideTransactionModal: () => void;
  handleFormFinish: (name: string, info: any) => void;
};
