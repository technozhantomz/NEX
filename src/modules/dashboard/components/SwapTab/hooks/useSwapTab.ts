/** @format */

import { Form } from 'antd';
import { FormFinishInfo } from 'rc-field-form';
import { useCallback, useEffect, useState } from 'react';
import {
  useAccount,
  useFees,
  useTransactionBuilder,
} from '../../../../../common/hooks/';
import { Swap } from './useSwapTab.types';
import { TransactionFee } from '../../../../../common/hooks/useFees.types';

export function useSwap(): Swap {
  const [visible, setVisible] = useState<boolean>(false);
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const [swapForm] = Form.useForm();
  const [feeData, setFeeData] = useState<TransactionFee>();
  const { getFees } = useFees();

  const handleAssetChange = (value: string) => {
    swapForm.setFieldsValue({ asset: value });
    console.log(swapForm.getFieldsValue());
  };

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setVisible(true);
  };

  // useEffect(() => {
  //   // getFeeData();

  // }, []);

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    console.log('ss');
    
    const { values, forms } = info;
    const { passwordModal } = forms;
    handleSwap(values.password);
    if (name === 'passwordModal') {
      passwordModal.validateFields().then(() => {});
    }
  };

  // const getFeeData = async () => {
  //   const rawFeeData = (await getFees()).filter(
  //     (item) => item.name === 'limit_order_create'
  //   )[0];
  //   setFeeData({
  //     amount: rawFeeData.fee,
  //     asset_id: '1.3.0',
  //   });
  // };

  const handleSwap = useCallback(async (password: string) => {
    const values = swapForm.getFieldsValue();
    console.log(values);
    const activeKey = getPrivateKey(password, 'active');
    const trx = {
      type: '',
      params: {},
    };

    let trxResult;

    try {
      console.log(trx);
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (error) {
      console.log(error);
      setVisible(false);
    }

    if (trxResult) {
      setVisible(false);
    }
  }, []);

  return {
    visible,
    onCancel,
    onFormFinish,
    confirm,
    handleAssetChange,
    swapForm,
  };
}
