import { useCallback, useState } from 'react';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { FormFinishInfo } from 'rc-field-form';
import { useAccount, useTransactionBuilder } from '../../../../../common/hooks';
import { WithdrawFund } from './useWithdraw.types';

export function useWithdrawFund(): WithdrawFund {
  const [visible, setVisible] = useState<boolean>(false);
  const { getPrivateKey } = useAccount();
  const { trxBuilder } = useTransactionBuilder();

  const handleAssetChange = (
    value: unknown,
    option:
      | DefaultOptionType
      | BaseOptionType
      | (DefaultOptionType | BaseOptionType)[]
  ) => {
    console.log(value);
    console.log(option);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setVisible(true);
  };

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === 'passwordModal') {
      passwordModal.validateFields().then(() => {
        withdrawFunds(values.password);
      });
    }
  };

  const withdrawFunds = useCallback(async (password: string) => {
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

  return { visible, onCancel, onFormFinish, confirm, handleAssetChange };
}
