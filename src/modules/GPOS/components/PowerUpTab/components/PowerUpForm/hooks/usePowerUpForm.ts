import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useFees,
  useGPOSTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import {
  useUserContext,
  useViewportContext,
} from "../../../../../../../common/providers";
import { Asset } from "../../../../../../../common/types";
import { Form } from "../../../../../../../ui/src";

import {
  UsePowerUpFormArgs,
  UsePowerUpFormResult,
} from "./usePowerUpForm.types";

export function usePowerUpForm({
  gposBalances,
  //loading,
  getGposInfo,
}: UsePowerUpFormArgs): UsePowerUpFormResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [newBalance, setNewBalance] = useState<number>(0);

  const [powerUpForm] = Form.useForm();
  const depositAmount: number = Form.useWatch("depositAmount", powerUpForm);
  const { id, assets, localStorageAccount } = useUserContext();
  const { buildVestingBalanceCreateTransaction } = useGPOSTransactionBuilder();
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateGposVestingFee } = useFees();
  const { sm } = useViewportContext();

  const adjustDeposit = useCallback(
    (direction: string) => {
      const currentAmount = powerUpForm.getFieldValue("depositAmount");
      const minusDirection = currentAmount >= 1 ? currentAmount - 1 : 0;
      powerUpForm.setFieldsValue({
        depositAmount: direction === "+" ? currentAmount + 1 : minusDirection,
      });
      powerUpForm.validateFields();
    },
    [powerUpForm]
  );

  const handleVesting = useCallback(
    async (password: string) => {
      const values = powerUpForm.getFieldsValue();
      const depositAmount =
        values.depositAmount * 10 ** (gposBalances?.asset.precision as number);
      const trx = buildVestingBalanceCreateTransaction(
        gposBalances?.asset as Asset,
        depositAmount,
        id
      );
      setTransactionErrorMessage("");
      const activeKey = getPrivateKey(password, "active");
      try {
        setLoadingTransaction(true);
        const trxResult = await buildTrx([trx], [activeKey]);
        if (trxResult) {
          formAccountBalancesByName(localStorageAccount);
          await getGposInfo();
          powerUpForm.setFieldsValue({
            depositAmount: 0,
          });
          setTransactionErrorMessage("");
          setTransactionSuccessMessage(
            counterpart.translate(`field.success.successfully_deposited`, {
              depositAmount: values.depositAmount,
              symbol: gposBalances?.asset.symbol,
            })
          );
          setLoadingTransaction(false);
        } else {
          setTransactionErrorMessage(
            counterpart.translate(`field.errors.unable_transaction`)
          );
          setLoadingTransaction(false);
        }
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      powerUpForm,
      gposBalances,
      buildVestingBalanceCreateTransaction,
      id,
      setTransactionErrorMessage,
      getPrivateKey,
      setLoadingTransaction,
      buildTrx,
      formAccountBalancesByName,
      localStorageAccount,
      getGposInfo,
      setTransactionSuccessMessage,
    ]
  );

  const validateDepositAmount = async (_: unknown, value: number) => {
    const accountAsset = assets.find(
      (asset) => asset.symbol === gposBalances?.asset.symbol
    );
    const total = Number(value) + feeAmount;
    if (value <= 0) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.deposit_amount_should_greater`)
        )
      );
    }
    if (!accountAsset) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.balance_not_enough`))
      );
    } else {
      if (total > (accountAsset.amount as number)) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.balance_not_enough`))
        );
      }
    }
    return Promise.resolve();
  };

  const formValidation = {
    depositAmount: [
      {
        required: true,
        message: counterpart.translate(`field.errors.deposit_amount_required`),
      },
      { validator: validateDepositAmount },
    ],
  };

  useEffect(() => {
    if (gposBalances) {
      if (!sm) {
        powerUpForm.setFieldsValue({
          openingBalance:
            gposBalances.openingBalance + " " + gposBalances.asset.symbol,
          newBalance:
            gposBalances.openingBalance + " " + gposBalances.asset.symbol,
        });
      } else {
        powerUpForm.setFieldsValue({
          openingBalance: gposBalances.asset.symbol,
          newBalance: gposBalances.asset.symbol,
        });
      }
    }
  }, [gposBalances, powerUpForm, sm]);

  useEffect(() => {
    const gposVestingFee = calculateGposVestingFee();
    if (gposVestingFee) setFeeAmount(gposVestingFee);
  }, [calculateGposVestingFee, setFeeAmount]);

  useEffect(() => {
    if (gposBalances) {
      const newBalance = gposBalances?.openingBalance + depositAmount;
      setNewBalance(newBalance);
      if (!sm) {
        powerUpForm.setFieldsValue({
          newBalance: newBalance + " " + gposBalances?.asset.symbol,
        });
      } else {
        powerUpForm.setFieldsValue({
          newBalance: gposBalances?.asset.symbol,
        });
      }
    }
  }, [depositAmount, gposBalances, powerUpForm, sm, setNewBalance]);

  return {
    powerUpForm,
    formValidation,
    adjustDeposit,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handleVesting,
    loadingTransaction,
    feeAmount,
    depositAmount,
    newBalance,
  };
}
