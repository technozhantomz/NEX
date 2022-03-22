/** @format */

import { Form } from 'antd';
import { FormFinishInfo } from 'rc-field-form';
import { useCallback, useEffect, useState } from 'react';
import { defaultToken } from '../../../../../api/params';

// import { defaultToken } from "../../../../../api/params/networkparams";
import { useUserContext } from '../../../../../common/components/UserProvider';
import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from '../../../../../common/hooks';
import { TransactionFee } from '../../../../../common/hooks/useFees.types';
import { FullAccount, Membership } from '../../../../../common/types';

import { MembershipTabTypes } from './useMembershipTab.types';

export function useMembershipTab(): MembershipTabTypes {
  const [isMembershipModalVisible, setIsMembershipModalVisible] =
    useState<boolean>(false);
  const [requestedKey, setRequestedKey] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [rawFee, setRawFee] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEnableToPay, setIsEnableToPay] = useState<boolean>(true);
  const [inProgress, setInProgress] = useState(false);
  const [membershipData, setMembershipData] = useState<Membership>();
  const [membershipForm] = Form.useForm();
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { getFees } = useFees();
  const { getAssetById, getAssetBySymbol } = useAsset();
  const { assets, name } = useUserContext();
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey, getFullAccount } = useAccount();
  const { localStorageAccount } = useUserContext();

  console.log(feeData);
  console.log(rawFee);
  console.log(assets);

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;

    if (name === 'passwordModal') {
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

    const fees = { amount: 0, asset_id: '1.3.0' };
    const activeKey = getPrivateKey(password, 'active');

    const trx = {
      type: 'account_upgrade',
      params: {
        fee: fees,
        account_to_upgrade: '1.2.78',
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

    const userAsset = assets.find((asset) => asset.symbol === defaultToken);
    console.log(userAsset);

    const getasset = getAssetById('1.3.0');
    console.log(getasset);

    if (rawFee > 0) {
      console.log('low');
    }
    setModalText(
      `For this operations you'll have to pay 10000 TEST fee. Do you want to continue?`
    );
  };

  const handleCancel = () => {
    setIsMembershipModalVisible(false);
  };

  const getFeeData = async () => {
    const rawFeeData = (await getFees()).filter(
      (item) => item.name === 'ACCOUNT UPGRADE'
    )[0];

    setRawFee(rawFeeData.fee || rawFeeData.membership_lifetime_fee);

    setFeeData({
      amount: rawFeeData.fee,
      asset_id: '1.3.0',
    });
  };

  useEffect(() => {
    getFeeData();
    getAccountMemberData();
  }, [localStorageAccount]);

  const getAccountMemberData = async () => {
    console.log(name);
    const fullAcc = await getFullAccount(name, false);
    console.log(fullAcc);
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

    if (date === '1970-01-01T00:00:00') {
      date = 'N/A';
    } else if (date === '1969-12-31T23:59:59') {
      date = 'Never';
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
    inProgress,
    name,
    membershipData,
  };
}
