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
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [newBalance, setNewBalance] = useState<string>("0");
  const [newAvailableBalance, setNewAvailableBalance] = useState<string>("0");

  const [powerDownForm] = Form.useForm<PowerDownForm>();
  const withdrawAmount: string =
    Form.useWatch("withdrawAmount", powerDownForm) || "0";
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
      const minusDirection =
        Number(withdrawAmount) >= 1
          ? limitByPrecision(
              String(Number(withdrawAmount) - 1),
              defaultAsset?.precision
            )
          : "0";
      powerDownForm.setFieldsValue({
        withdrawAmount:
          direction === "+"
            ? limitByPrecision(
                String(Number(withdrawAmount) + 1),
                defaultAsset?.precision
              )
            : minusDirection,
      });
      powerDownForm.validateFields();
    },
    [powerDownForm, withdrawAmount]
  );

  const validateWithdrawAmount = async (_: unknown, value: string) => {
    const accountAsset = assets.find(
      (asset) => asset.symbol === gposBalances?.asset.symbol
    );
    if (Number(value) <= 0) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.amount_should_greater`))
      );
    }
    if (Number(value) > (gposBalances?.availableBalance as number)) {
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
    if (gposBalances) {
      powerDownForm.setFieldsValue({
        withdrawAmount: limitByPrecision(
          withdrawAmount,
          defaultAsset?.precision
        ),
      });
      const newBalance = limitByPrecision(
        String(gposBalances.openingBalance - Number(withdrawAmount)),
        defaultAsset?.precision
      );

      const newAvailableBalance = limitByPrecision(
        String(gposBalances.availableBalance - Number(withdrawAmount)),
        defaultAsset?.precision
      );

      if (Number(newAvailableBalance) >= 0) {
        setNewBalance(newBalance);
        setNewAvailableBalance(newAvailableBalance);
        if (!sm) {
          powerDownForm.setFieldsValue({
            availableBalance:
              newAvailableBalance + " " + gposBalances.asset.symbol,
            newBalance: newBalance + " " + gposBalances.asset.symbol,
          });
        } else {
          powerDownForm.setFieldsValue({
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
