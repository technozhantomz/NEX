import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { FormFinishInfo } from 'rc-field-form';
import { useCallback, useState } from 'react';
import {
    useAccount
} from '../../../../../common/hooks';
import { useTransactionBuilder } from '../../../../../common/hooks/useTransactionBuilder';

import { Swap } from './useSwapTab.types';

export function useSwap(): Swap {
  const [visible, setVisible] = useState<boolean>(false);
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();

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
        swap(values.password);
      });
    }
  };

  const swap = useCallback(async (password: string) => {

    const activeKey = getPrivateKey(password, 'active');
    const trx = {
      type: '',
      params: {
        
      },
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
