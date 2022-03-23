import { Form } from "antd";
import { FormFinishInfo } from "rc-field-form";
import { useCallback, useEffect, useState } from "react";

import { useUserContext } from "../../../../../common/components/UserProvider";
import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { FeeParameter } from "../../../../../common/hooks/fees/useFees.types";
import { TransactionFee } from "../../../../../common/hooks/useFees.types";
import { FullAccount, Membership } from "../../../../../common/types";

import { MembershipTabTypes } from "./useMembershipTab.types";

export function useMembershipTab(): MembershipTabTypes {
  const [isMembershipModalVisible, setIsMembershipModalVisible] =
    useState<boolean>(false);
  const [requestedKey, setRequestedKey] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [rawFee, setRawFee] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEnableToPay, setIsEnableToPay] = useState<boolean>(true);
  const [hideFooter, setHideFooter] = useState(false);
  const [membershipData, setMembershipData] = useState<Membership>();
  const [feeAmount, setFeeAmount] = useState<number>();
  const [membershipForm] = Form.useForm();
  const { findOperationFee, feeParameters } = useFees();
  const { getAssetById, getAssetBySymbol, defaultAsset, setPrecision } =
    useAsset();
  const { assets, name } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey, getFullAccount } = useAccount();
  const { localStorageAccount } = useUserContext();

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;

    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handleMembershipUpgrade(values.password);
      });
    }
  };

  const handleMembershipUpgrade = useCallback(async (password: string) => {
    setVisible(false);
    setIsMembershipModalVisible(true);
    setModalText(`Transaction is being processed please wait`);
    setHideFooter(true);

    const fees = { amount: 0, asset_id: "1.3.0" };
    const activeKey = getPrivateKey(password, "active");

    const trx = {
      type: "account_upgrade",
      params: {
        fee: fees,
        account_to_upgrade: "1.2.78",
        upgrade_to_lifetime_member: true,
      },
    };

    let trxResult;

    try {
      console.log(trx);
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (error) {
      console.log(error);
      setModalText(`Transaction couldn't processed`);
      setTimeout(() => {
        setIsMembershipModalVisible(false);
        setHideFooter(false);
      }, 2000);
    }

    if (trxResult) {
      setModalText(`Transaction completed`);
      setTimeout(() => {
        setIsMembershipModalVisible(false);
        setHideFooter(false);
      }, 2000);
      console.log(trxResult);
    }
  }, []);

  const handleOk = () => {
    setIsMembershipModalVisible(false);
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setIsMembershipModalVisible(true);

    if (rawFee > 0) {
      if (
        defaultAsset?.amount &&
        feeAmount &&
        defaultAsset.amount < feeAmount
      ) {
        setModalText("Balance is not enough.");
        setHideFooter(true);
      } else {
        setModalText(
          `For this operations you'll have to pay 10000 TEST fee. Do you want to continue?`
        );
        setHideFooter(false);
      }
    }
  };

  const handleCancel = () => {
    setIsMembershipModalVisible(false);
  };

  const getFeeData = useCallback(() => {
    if (feeParameters.length && name && defaultAsset) {
      const accountUpgradeParameter = findOperationFee(
        "account_upgrade"
      ) as FeeParameter;
      const accountUpgradeFee = accountUpgradeParameter[1];
      const rawFee = accountUpgradeFee.membership_lifetime_fee as number;
      console.log(rawFee);

      const feeAmount = setPrecision(false, rawFee, defaultAsset.precision);
      setRawFee(rawFee);
      setFeeAmount(feeAmount);
      console.log(defaultAsset?.amount);
      console.log(feeAmount);
    }
  }, [feeParameters, findOperationFee]);

  useEffect(() => {
    getFeeData();
    getAccountMemberData();
  }, [name, feeParameters]);

  const getAccountMemberData = async () => {
    const fullAcc = await getFullAccount(name, false);
    const membership = await formMembershipData(fullAcc);
    setMembershipData(membership);
  };

  const formMembershipData = useCallback(async (fullAcc: FullAccount) => {
    const {
      account,
      lifetime_referrer_name,
      referrer_name,
      registrar_name,
      statistics,
    } = fullAcc;

    const isLifetimeMember = lifetime_referrer_name === account.name;

    // const asset = await formAssetData({
    //   symbol: defaultToken,
    //   amount: statistics.lifetime_fees_paid,
    // });
    // const asset = await getAssetBySymbol(defaultToken);
    // console.log(asset);

    const feesPaid = 0;

    const networkFee = account.network_fee_percentage / 100;
    const lifetimeFee = account.lifetime_referrer_fee_percentage / 100;
    const referrerFee =
      ((100 - networkFee - lifetimeFee) * account.referrer_rewards_percentage) /
      10000;
    const registrarFee = 100 - referrerFee - networkFee - lifetimeFee;

    let date = account.membership_expiration_date;

    if (date === "1970-01-01T00:00:00") {
      date = "N/A";
    } else if (date === "1969-12-31T23:59:59") {
      date = "Never";
    }

    const allocation = {
      network: {
        percent: networkFee,
      },
      reviewer: {
        user: lifetime_referrer_name,
        percent: lifetimeFee,
      },
      registrar: {
        user: registrar_name,
        percent: registrarFee,
      },
      referrer: {
        user: referrer_name,
        percent: referrerFee,
      },
      expiration: { date },
    };

    return { isLifetimeMember, feesPaid, allocation };
  }, []);

  return {
    isMembershipModalVisible,
    handleMembershipUpgrade,
    requestedKey,
    handleCancel,
    handleOk,
    confirmLoading,
    modalText,
    visible,
    onCancel,
    onFormFinish,
    membershipForm,
    confirm,
    isEnableToPay,
    hideFooter,
    name,
    membershipData,
  };
}
