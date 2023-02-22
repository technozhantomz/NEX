export type UseHandleTransactionFormResult = {
  isPasswordModalVisible: boolean;
  isTransactionModalVisible: boolean;
  hidePasswordModal: () => void;
  showTransactionModal: () => void;
  hideTransactionModal: () => void;
  handleFormFinish: (name: string, info: any) => void;
  showPasswordModalIfNeeded: () => void;
};
