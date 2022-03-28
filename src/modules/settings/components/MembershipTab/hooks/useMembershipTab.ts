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
import { FullAccount, Membership } from "../../../../../common/types";

import { MembershipTabTypes } from "./useMembershipTab.types";

export function useMembershipTab(): MembershipTabTypes {
  const [isMembershipModalVisible, setIsMembershipModalVisible] =
    useState<boolean>(false);
  const [modalText, setModalText] = useState("");
  const [rawFee, setRawFee] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [membershipData, setMembershipData] = useState<Membership>();
  const [feeAmount, setFeeAmount] = useState<number>();
  const [membershipForm] = Form.useForm();
  const { findOperationFee, feeParameters } = useFees();
  const { formAssetBalanceById, defaultAsset, setPrecision } = useAsset();
  const { name, id } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey, getFullAccount } = useAccount();

  const onFormFinish = (name: string, info: FormFinishInfo) => {
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
      setVisible(false);
      setIsMembershipModalVisible(true);
      setModalText(`Transaction is being processed please wait`);
      setHideFooter(true);

      const fees = { amount: 0, asset_id: defaultAsset?.id };
      const activeKey = getPrivateKey(password, "active");

      const trx = {
        type: "account_upgrade",
        params: {
          fee: fees,
          account_to_upgrade: id,
          upgrade_to_lifetime_member: true,
        },
      };

      let trxResult;

      try {
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
      }
    },
    [defaultAsset]
  );

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

      const feeAmount = setPrecision(false, rawFee, defaultAsset.precision);
      setRawFee(rawFee);
      setFeeAmount(feeAmount);
    }
  }, [feeParameters, findOperationFee]);

  const getAccountMemberData = async () => {
    const fullAcc = await getFullAccount(name, false);
    if (fullAcc) {
      const membership = await formMembershipData(fullAcc);
      setMembershipData(membership);
    }
  };

  const formMembershipData = useCallback(
    async (fullAcc: FullAccount) => {
      if (defaultAsset) {
        const {
          account,
          lifetime_referrer_name,
          referrer_name,
          registrar_name,
          statistics,
        } = fullAcc;

        const isLifetimeMember = lifetime_referrer_name === account.name;

        const feeAmount = setPrecision(
          false,
          statistics.lifetime_fees_paid,
          defaultAsset.precision
        );

        const feesPaid = `${feeAmount} ${defaultAsset.symbol}`;

        const networkFee = account.network_fee_percentage / 100;
        const lifetimeFee = account.lifetime_referrer_fee_percentage / 100;
        const referrerFee =
          ((100 - networkFee - lifetimeFee) *
            account.referrer_rewards_percentage) /
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
      }
    },
    [defaultAsset, formAssetBalanceById]
  );

  useEffect(() => {
    getFeeData();
    getAccountMemberData();
  }, [name, feeParameters]);

  return {
    isMembershipModalVisible,
    handleMembershipUpgrade,
    handleCancel,
    handleOk,
    modalText,
    visible,
    onCancel,
    onFormFinish,
    membershipForm,
    confirm,
    hideFooter,
    name,
    membershipData,
  };
}
