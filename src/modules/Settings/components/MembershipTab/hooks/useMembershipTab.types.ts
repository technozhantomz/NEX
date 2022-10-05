import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../common/types";
import { FormInstance } from "../../../../../ui/src";

export type UseMembershipTabResult = {
  handleMembershipUpgrade: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
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
  loadingAccountMembership: boolean;
};

export type MembershipForm = {
  password: string;
};
