import { FormInstance } from "../../../../../ui/src";

export type UseMembershipTabResult = {
  handleMembershipUpgrade: (password: string) => void;
  isMembershipModalVisible: boolean;
  isPasswordModalVisible: boolean;
  submittingPassword: boolean;
  loadingTransaction: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  confirm: () => void;
  handleMembershipModalCancel: () => void;
  handleMembershipModalConfirm: () => void;
  handlePasswordModalCancel: () => void;
  onFormFinish: (name: string, info: any) => void;
  membershipForm: FormInstance<MembershipForm>;
  name: string;
  feesCashback: number;
  membershipPrice: number;
  networkFee: number;
  lifetimeFee: number;
  referrerTotalFee: number;
  referrerFee: number;
  registrarFee: number;
  vestingThreshold: number;
  vestingPeriod: number;
  isLifetimeMember: boolean;
  maintenanceInterval: number;
  nextMaintenanceTime: string;
  lifetimeReferrerName: string;
  referrerName: string;
  registrarName: string;
  paidFees: number;
  expirationDate: string;
};

export type MembershipForm = {
  password: string;
};
