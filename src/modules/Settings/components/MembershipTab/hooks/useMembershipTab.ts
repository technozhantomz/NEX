import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useFees,
  useMaintenace,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { GlobalProperties } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import { UseMembershipTabResult } from "./useMembershipTab.types";

export function useMembershipTab(): UseMembershipTabResult {
  const { defaultAsset, setPrecision } = useAsset();
  const { name, id, assets } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey, getFullAccount } = useAccount();
  const { dbApi } = usePeerplaysApiContext();
  const { calculateAccountUpgradeFee } = useFees();
  const { maintenanceInterval, nextMaintenanceTime } = useMaintenace();

  const [membershipForm] = Form.useForm();
  const [submittingPassword, setSubmittingPassword] = useState<boolean>(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [isMembershipModalVisible, setIsMembershipModalVisible] =
    useState<boolean>(false);
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
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

  const getAccountMembership = useCallback(async () => {
    const fullAccount = await getFullAccount(name, false);
    const gpo: GlobalProperties = await dbApi("get_global_properties");
    if (fullAccount && defaultAsset) {
      let expirationDate = fullAccount.account.membership_expiration_date;
      if (expirationDate === "1970-01-01T00:00:00") {
        expirationDate = "N/A";
      } else if (expirationDate === "1969-12-31T23:59:59") {
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
      if (memberShipPrice) {
        setMembershipPrice(memberShipPrice);
      }
      setExpirationDate(expirationDate);
      setLifetimeReferrerName(lifetimeReferrerName);
      setReferrerName(referrerName);
      setRegistrarName(registrarName);
      setPaidFees(paidFees);
      setIsLifetimeMember(isLifetimeMember);
      setFeesCashback(100 - networkFee);
      setNetworkFee(networkFee);
      setLifetimeFee(lifeTimeFee);
      setReferrerTotalFee(referrerTotalFee);
      setReferrerFee(referrerFee);
      setRegistrarFee(registrarFee);
      setVestingThreshold(
        setPrecision(
          false,
          gpo.parameters.cashback_vesting_threshold,
          defaultAsset.precision
        )
      );
      setVestingPeriod(
        gpo.parameters.cashback_vesting_period_seconds / (60 * 60 * 24)
      );
    }
  }, [
    calculateAccountUpgradeFee,
    dbApi,
    defaultAsset,
    getFullAccount,
    name,
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
  ]);

  const onFormFinish = (name: string, info: any) => {
    const { values, forms } = info;
    const { passwordModal } = forms;

    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleMembershipUpgrade(values.password);
      });
    }
  };

  const handleMembershipUpgrade = useCallback(
    async (password: string) => {
      setSubmittingPassword(true);
      setIsPasswordModalVisible(false);
      setIsMembershipModalVisible(true);

      const fee = { amount: 0, asset_id: defaultAsset?.id };
      const activeKey = getPrivateKey(password, "active");

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
        setLoadingTransaction(true);
        trxResult = await trxBuilder([trx], [activeKey]);
        setLoadingTransaction(false);
      } catch (error) {
        console.log(error);
        setTransactionErrorMessage("Unable to process the transaction!");
        setLoadingTransaction(false);
        setSubmittingPassword(false);
      }

      if (trxResult) {
        setSubmittingPassword(false);
        setIsLifetimeMember(true);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          "Your account successfuly upgraded to lifetime membership account"
        );
        setTimeout(() => {
          setIsMembershipModalVisible(false);
          setTransactionSuccessMessage("");
        }, 2000);
      }
    },
    [
      defaultAsset,
      id,
      setIsPasswordModalVisible,
      setIsMembershipModalVisible,
      getPrivateKey,
      setLoadingTransaction,
      trxBuilder,
      setTransactionErrorMessage,
      setTransactionSuccessMessage,
      setIsLifetimeMember,
    ]
  );

  const confirm = () => {
    if (membershipPrice > 0) {
      setIsMembershipModalVisible(true);
    }
  };

  const handleMembershipModalCancel = () => {
    setIsMembershipModalVisible(false);
    setTransactionSuccessMessage("");
    setTransactionErrorMessage("");
  };

  const handleMembershipModalConfirm = () => {
    if (
      !defaultAsset ||
      !assets ||
      assets.length === 0 ||
      assets.filter((asset) => asset.id === defaultAsset.id).length === 0 ||
      (assets.filter((asset) => asset.id === defaultAsset.id)[0]
        .amount as number) < membershipPrice
    ) {
      setTransactionErrorMessage("Balance is not enough.");
    } else {
      setIsMembershipModalVisible(false);
      setTransactionErrorMessage("");
      setIsPasswordModalVisible(true);
    }
  };

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  useEffect(() => {
    getAccountMembership();
  }, [getAccountMembership]);

  return {
    isMembershipModalVisible,
    handleMembershipUpgrade,
    handleMembershipModalCancel,
    handleMembershipModalConfirm,
    isPasswordModalVisible,
    submittingPassword,
    handlePasswordModalCancel,
    onFormFinish,
    membershipForm,
    confirm,
    loadingTransaction,
    transactionErrorMessage,
    transactionSuccessMessage,
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
  };
}
