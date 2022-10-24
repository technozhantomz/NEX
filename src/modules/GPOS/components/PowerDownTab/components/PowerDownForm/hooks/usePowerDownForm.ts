import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useFees,
  useGPOSTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import {
  useAssetsContext,
  usePeerplaysApiContext,
  useUserContext,
  useViewportContext,
} from "../../../../../../../common/providers";
import {
  Asset,
  SignerKey,
  VestingBalance,
} from "../../../../../../../common/types";
import { Form } from "../../../../../../../ui/src";

import {
  PowerDownForm,
  UsePowerDownFormArgs,
  UsePowerDownFormResult,
} from "./usePowerDownForm.types";

export function usePowerDownForm({
  gposBalances,
  //loading,
  calculateGposBalances,
}: UsePowerDownFormArgs): UsePowerDownFormResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [newBalance, setNewBalance] = useState<number>(0);
  const [newAvailableBalance, setNewAvailableBalance] = useState<number>(0);

  const [powerDownForm] = Form.useForm<PowerDownForm>();
  const withdrawAmount: number = Form.useWatch("withdrawAmount", powerDownForm);
  const { localStorageAccount, id, assets } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { buildVestingWithdrawTransaction } = useGPOSTransactionBuilder();
  const { buildTrx } = useTransactionBuilder();
  const { formAccountBalancesByName } = useAccount();
  const { calculateGposWithdrawFee } = useFees();
  const { sm } = useViewportContext();
  const { limitByPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();

  const handleWithdraw = useCallback(
    async (signerKey: SignerKey) => {
      setTransactionErrorMessage("");
      const values = powerDownForm.getFieldsValue();
      try {
        setLoadingTransaction(true);
        const vestingBalances: VestingBalance[] = await dbApi(
          "get_vesting_balances",
          [id]
        );
        const gposVestingBalances = vestingBalances.filter(
          (balance) => balance.balance_type == "gpos"
        );

        const trx = buildVestingWithdrawTransaction(
          gposBalances?.asset as Asset,
          values.withdrawAmount,
          gposVestingBalances,
          id
        );

        const trxResult = await buildTrx([trx], [signerKey]);
        if (trxResult) {
          formAccountBalancesByName(localStorageAccount);
          await calculateGposBalances();
          powerDownForm.setFieldsValue({
            withdrawAmount: 0,
          });
          setTransactionErrorMessage("");
          setTransactionSuccessMessage(
            counterpart.translate(`field.success.successfully_withdrawn`, {
              withdrawAmount: values.withdrawAmount,
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
      powerDownForm,
      setLoadingTransaction,
      dbApi,
      id,
      gposBalances,
      setTransactionErrorMessage,
      buildVestingWithdrawTransaction,
      buildTrx,
      formAccountBalancesByName,
      calculateGposBalances,
      setTransactionSuccessMessage,
    ]
  );

  const adjustWithdraw = useCallback(
    (direction: string) => {
      const currentAmount = powerDownForm.getFieldValue("withdrawAmount");
      const minusDirection = currentAmount > 0 ? currentAmount - 1 : 0;
      powerDownForm.setFieldsValue({
        withdrawAmount: direction === "+" ? currentAmount + 1 : minusDirection,
      });
      powerDownForm.validateFields();
    },
    [powerDownForm]
  );

  const validateWithdrawAmount = async (_: unknown, value: number) => {
    const accountAsset = assets.find(
      (asset) => asset.symbol === gposBalances?.asset.symbol
    );
    if (value <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.amount_should_greater`))
      );
    }
    if (value > (gposBalances?.availableBalance as number)) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.available_balance_cannot_greater`)
        )
      );
    }
    if (!accountAsset) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.balance_not_enough`))
      );
    } else {
      if (feeAmount > (accountAsset?.amount as number))
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.balance_not_enough_to_pay`)
          )
        );
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (gposBalances) {
      if (!sm) {
        powerDownForm.setFieldsValue({
          openingBalance:
            gposBalances.openingBalance + " " + gposBalances.asset.symbol,
          availableBalance:
            gposBalances.availableBalance + " " + gposBalances.asset.symbol,
          newBalance:
            gposBalances.openingBalance + " " + gposBalances.asset.symbol,
        });
      } else {
        powerDownForm.setFieldsValue({
          openingBalance: gposBalances.asset.symbol,
          availableBalance: gposBalances.asset.symbol,
          newBalance: gposBalances.asset.symbol,
        });
      }
    }
  }, [gposBalances, powerDownForm, sm]);

  useEffect(() => {
    const gposWithdrawFee = calculateGposWithdrawFee();
    if (gposWithdrawFee) {
      setFeeAmount(gposWithdrawFee);
    }
  }, [calculateGposWithdrawFee, setFeeAmount]);

  useEffect(() => {
    console.log("defaultAsset", defaultAsset);
    console.log("gposBalances", gposBalances);
    if (gposBalances) {
      powerDownForm.setFieldsValue({
        withdrawAmount: Number(
          limitByPrecision(String(withdrawAmount), defaultAsset?.precision)
        ),
      });
      const newBalance = Number(
        limitByPrecision(
          String(gposBalances.openingBalance - withdrawAmount),
          defaultAsset?.precision
        )
      );
      const newAvailableBalance = Number(
        limitByPrecision(
          String(gposBalances.availableBalance - withdrawAmount),
          defaultAsset?.precision
        )
      );
      console.log("new", newAvailableBalance);
      if (newAvailableBalance >= 0) {
        console.log("abbas");
        setNewBalance(newBalance);
        setNewAvailableBalance(newAvailableBalance);
        if (!sm) {
          powerDownForm.setFieldsValue({
            // withdrawAmount: Number(
            //   limitByPrecision(String(withdrawAmount), defaultAsset?.precision)
            // ),
            availableBalance:
              newAvailableBalance + " " + gposBalances.asset.symbol,
            newBalance: newBalance + " " + gposBalances.asset.symbol,
          });
        } else {
          powerDownForm.setFieldsValue({
            // withdrawAmount: Number(
            //   limitByPrecision(String(withdrawAmount), defaultAsset?.precision)
            // ),
            availableBalance: gposBalances.asset.symbol,
            newBalance: gposBalances.asset.symbol,
          });
        }
      }
    }
  }, [
    withdrawAmount,
    gposBalances,
    powerDownForm,
    sm,
    setNewBalance,
    setNewAvailableBalance,
  ]);

  const formValidation = {
    withdrawAmount: [
      {
        required: true,
        message: counterpart.translate(`field.errors.withdraw_amount_required`),
      },
      { validator: validateWithdrawAmount },
    ],
  };

  return {
    powerDownForm,
    formValidation,
    adjustWithdraw,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    handleWithdraw,
    feeAmount,
    withdrawAmount,
    newBalance,
    newAvailableBalance,
  };
}
