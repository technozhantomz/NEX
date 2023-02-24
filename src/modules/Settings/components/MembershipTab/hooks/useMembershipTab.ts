//done
//Should change to useReducer

import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import {
  TransactionMessageActionType,
  useAccount,
  useAsset,
  useBlockchain,
  useFees,
  useMaintenance,
  useTransactionBuilder,
  useTransactionMessage,
} from "../../../../../common/hooks";
import {
  useAssetsContext,
  useUserContext,
} from "../../../../../common/providers";
import {
  FullAccount,
  GlobalProperties,
  SignerKey,
} from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import {
  MembershipStatus,
  UseMembershipTabResult,
} from "./useMembershipTab.types";

export function useMembershipTab(): UseMembershipTabResult {
  const { setPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { name, id, assets, localStorageAccount } = useUserContext();
  const { buildTrx } = useTransactionBuilder();
  const { getFullAccount, formAccountBalancesByName } = useAccount();
  const { calculateAccountUpgradeFee } = useFees();
  const { maintenanceInterval, nextMaintenanceTime } = useMaintenance();
  const { getGlobalProperties } = useBlockchain();
  const { transactionMessageState, dispatchTransactionMessage } =
    useTransactionMessage();

  const [membershipForm] = Form.useForm();
  const [loadingAccountMembership, setLoadingAccountMembership] =
    useState<boolean>(true);
  const [feesCashback, setFeesCashback] = useState<number>(0);
  const [membershipPrice, setMembershipPrice] = useState<number>(0);
  const [networkFee, setNetworkFee] = useState<number>(0);
  const [lifetimeFee, setLifetimeFee] = useState<number>(0);
  const [referrerTotalFee, setReferrerTotalFee] = useState<number>(0);
  const [referrerFee, setReferrerFee] = useState<number>(0);
  const [registrarFee, setRegistrarFee] = useState<number>(0);
  const [vestingThreshold, setVestingThreshold] = useState<number>(0);
  const [vestingPeriod, setVestingPeriod] = useState<number>(0);
  const [isLifetimeMember, setIsLifetimeMember] = useState<boolean>(false);
  const [lifetimeReferrerName, setLifetimeReferrerName] = useState<string>("");
  const [referrerName, setReferrerName] = useState<string>("");
  const [registrarName, setRegistrarName] = useState<string>("");
  const [paidFees, setPaidFees] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState<string>("");

  const _setMembershipStatus = useCallback(
    (membershipStatus?: MembershipStatus) => {
      if (membershipStatus) {
        if (membershipStatus.memberShipPrice) {
          setMembershipPrice(membershipStatus.memberShipPrice);
        }
        setExpirationDate(membershipStatus.expirationDate);
        setLifetimeReferrerName(membershipStatus.lifetimeReferrerName);
        setReferrerName(membershipStatus.referrerName);
        setRegistrarName(membershipStatus.registrarName);
        setPaidFees(membershipStatus.paidFees);
        setIsLifetimeMember(membershipStatus.isLifetimeMember);
        setFeesCashback(membershipStatus.feesCashback);
        setNetworkFee(membershipStatus.networkFee);
        setLifetimeFee(membershipStatus.lifeTimeFee);
        setReferrerTotalFee(membershipStatus.referrerTotalFee);
        setReferrerFee(membershipStatus.referrerFee);
        setRegistrarFee(membershipStatus.registrarFee);
        setVestingThreshold(membershipStatus.vestingThreshold);
        setVestingPeriod(membershipStatus.vestingPeriod);
      }
    },
    [
      setExpirationDate,
      setFeesCashback,
      setIsLifetimeMember,
      setLifetimeFee,
      setLifetimeReferrerName,
      setMembershipPrice,
      setNetworkFee,
      setPaidFees,
      setReferrerName,
      setReferrerTotalFee,
      setReferrerFee,
      setRegistrarFee,
      setRegistrarName,
      setVestingThreshold,
      setVestingPeriod,
    ]
  );

  const getAccountMembershipStatus = useCallback(async () => {
    try {
      const [fullAccount, gpo]: [
        FullAccount | undefined,
        GlobalProperties | undefined
      ] = await Promise.all([
        getFullAccount(name, false),
        getGlobalProperties(),
      ]);
      if (fullAccount && gpo && defaultAsset) {
        let expirationDate = fullAccount.account.membership_expiration_date;
        if (expirationDate === "1970-01-01T00:00:00") {
          expirationDate = "N/A";
        } else {
          expirationDate = "Never";
        }
        const lifetimeReferrerName = fullAccount.lifetime_referrer_name;
        const referrerName = fullAccount.referrer_name;
        const registrarName = fullAccount.registrar_name;
        const statistics = fullAccount.statistics;
        const paidFees = setPrecision(
          false,
          statistics.lifetime_fees_paid,
          defaultAsset.precision
        );
        const isLifetimeMember =
          fullAccount.lifetime_referrer_name === fullAccount.account.name;
        const networkFee = fullAccount.account.network_fee_percentage / 100;
        const lifeTimeFee =
          fullAccount.account.lifetime_referrer_fee_percentage / 100;
        const referrerTotalFee = 100 - networkFee - lifeTimeFee;
        const referrerFee =
          (referrerTotalFee * fullAccount.account.referrer_rewards_percentage) /
          10000;
        const registrarFee = 100 - referrerFee - lifeTimeFee - networkFee;
        const memberShipPrice = calculateAccountUpgradeFee();
        const membershipStatus: MembershipStatus = {
          memberShipPrice,
          expirationDate,
          lifetimeReferrerName,
          referrerName,
          registrarName,
          paidFees,
          isLifetimeMember,
          feesCashback: 100 - networkFee,
          networkFee,
          lifeTimeFee,
          referrerTotalFee,
          referrerFee,
          registrarFee,
          vestingThreshold: setPrecision(
            false,
            gpo.parameters.cashback_vesting_threshold,
            defaultAsset.precision
          ),
          vestingPeriod:
            gpo.parameters.cashback_vesting_period_seconds / (60 * 60 * 24),
        };
        return membershipStatus;
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    calculateAccountUpgradeFee,
    defaultAsset,
    getFullAccount,
    getGlobalProperties,
    name,
  ]);

  const handleMembershipUpgrade = useCallback(
    async (signerKey: SignerKey) => {
      if (
        !defaultAsset ||
        !assets ||
        assets.length === 0 ||
        assets.filter((asset) => asset.id === defaultAsset.id).length === 0 ||
        (assets.filter((asset) => asset.id === defaultAsset.id)[0]
          .amount as number) < membershipPrice
      ) {
        dispatchTransactionMessage({
          type: TransactionMessageActionType.ERROR,
          message: counterpart.translate(`field.errors.balance_not_enough`),
        });
      } else {
        dispatchTransactionMessage({
          type: TransactionMessageActionType.CLEAR,
        });
        const fee = { amount: 0, asset_id: defaultAsset?.id };
        const trx = {
          type: "account_upgrade",
          params: {
            fee: fee,
            account_to_upgrade: id,
            upgrade_to_lifetime_member: true,
          },
        };
        let trxResult;

        try {
          dispatchTransactionMessage({
            type: TransactionMessageActionType.LOADING,
          });
          trxResult = await buildTrx([trx], [signerKey]);
        } catch (error) {
          console.log(error);
          dispatchTransactionMessage({
            type: TransactionMessageActionType.LOADED_ERROR,
            message: counterpart.translate(`field.errors.transaction_unable`),
          });
        }

        if (trxResult) {
          formAccountBalancesByName(localStorageAccount);
          const membershipStatus = await getAccountMembershipStatus();

          _setMembershipStatus(membershipStatus);

          dispatchTransactionMessage({
            type: TransactionMessageActionType.LOADED_SUCCESS,
            message: counterpart.translate(
              `field.success.account_upgraded_successfully`
            ),
          });
        } else {
          dispatchTransactionMessage({
            type: TransactionMessageActionType.LOADED_ERROR,
            message: counterpart.translate(`field.errors.transaction_unable`),
          });
        }
      }
    },
    [
      assets,
      defaultAsset,
      membershipPrice,
      id,
      dispatchTransactionMessage,
      buildTrx,
      setIsLifetimeMember,
      formAccountBalancesByName,
      localStorageAccount,
      getAccountMembershipStatus,
      _setMembershipStatus,
    ]
  );

  useEffect(() => {
    let ignore = false;
    async function setMembershipStatus() {
      setLoadingAccountMembership(true);
      const membershipStatus = await getAccountMembershipStatus();
      if (!ignore) {
        _setMembershipStatus(membershipStatus);
        setLoadingAccountMembership(false);
      }
    }
    setMembershipStatus();

    return () => {
      ignore = true;
    };
  }, [
    getAccountMembershipStatus,
    setLoadingAccountMembership,
    _setMembershipStatus,
  ]);

  return {
    handleMembershipUpgrade,
    membershipForm,
    transactionMessageState,
    dispatchTransactionMessage,
    name,
    feesCashback,
    membershipPrice,
    networkFee,
    lifetimeFee,
    referrerTotalFee,
    referrerFee,
    registrarFee,
    vestingThreshold,
    vestingPeriod,
    isLifetimeMember,
    maintenanceInterval,
    nextMaintenanceTime,
    lifetimeReferrerName,
    referrerName,
    registrarName,
    paidFees,
    expirationDate,
    loadingAccountMembership,
  };
}
