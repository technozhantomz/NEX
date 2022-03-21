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
import { TransactionFee } from "../../../../../common/hooks/useFees.types";

import { MembershipTabTypes } from "./useMembershipTab.types";

export function useMembershipTab(): MembershipTabTypes {
  const [isMembershipModalVisible, setIsMembershipModalVisible] =
    useState<boolean>(false);
  const [requestedKey, setRequestedKey] = useState();
  const [membershipForm] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { getFees } = useFees();
  const { getAssetById } = useAsset();
  const { assets } = useUserContext();
  const [rawFee, setRawFee] = useState<number>(0);
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const [visible, setVisible] = useState<boolean>(false);
  const [isEnableToPay, setIsEnableToPay] = useState<boolean>(true);
  const [inProgress, setInProgress] = useState(false);

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
    setInProgress(true);

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
        setInProgress(false);

      }, 2000);
    }

    if (trxResult) {
      setModalText(`Transaction completed`);
      setTimeout(() => {
        setIsMembershipModalVisible(false);
        setInProgress(false);
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
    setModalText(
      `For this operations you'll have to pay 10000 TEST fee. Do you want to continue?`
    );
  };

  const handleCancel = () => {
    setIsMembershipModalVisible(false);
  };

  const getFeeData = async () => {
    const rawFeeData = (await getFees()).filter(
      (item) => item.name === "ACCOUNT UPGRADE"
    )[0];
    console.log(rawFeeData);
    setRawFee(rawFeeData.fee || rawFeeData.membership_lifetime_fee);

    setFeeData({
      amount: rawFeeData.fee,
      asset_id: "1.3.0",
    });
  };

  useEffect(() => {
    getFeeData();
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
    inProgress,
  };
}
