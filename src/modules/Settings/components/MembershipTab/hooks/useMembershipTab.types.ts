import { Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../../../common/hooks";
import { SignerKey } from "../../../../../common/types";
import { FormInstance } from "../../../../../ui/src";

export type MembershipStatus = {
  memberShipPrice: number | undefined;
  expirationDate: string;
  lifetimeReferrerName: string;
  referrerName: string;
  paidFees: number;
  isLifetimeMember: boolean;
  feesCashback: number;
  networkFee: number;
  lifeTimeFee: number;
  referrerTotalFee: number;
  referrerFee: number;
  registrarFee: number;
  vestingThreshold: number;
  vestingPeriod: number;
  registrarName: string;
};

export type UseMembershipTabResult = {
  handleMembershipUpgrade: (signerKey: SignerKey) => Promise<void>;
  transactionMessageState: TransactionMessageState;
  transactionMessageDispatch: Dispatch<TransactionMessageAction>;
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
