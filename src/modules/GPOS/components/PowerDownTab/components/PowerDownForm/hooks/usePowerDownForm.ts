import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useFees,
  useGPOSTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
  useViewportContext,
} from "../../../../../../../common/providers";
import { Asset, VestingBalance } from "../../../../../../../common/types";
import { Form } from "../../../../../../../ui/src";

import {
  UsePowerDownFormArgs,
  UsePowerDownFormResult,
} from "./usePowerDownForm.types";

export function usePowerDownForm({
  gposBalances,
  //loading,
  getGposInfo,
}: UsePowerDownFormArgs): UsePowerDownFormResult {
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [newBalance, setNewBalance] = useState<number>(0);
  const [newAvailableBalance, setNewAvailableBalance] = useState<number>(0);

  const [powerDownForm] = Form.useForm();
  const withdrawAmount: number = Form.useWatch("withdrawAmount", powerDownForm);
  const { localStorageAccount, id, assets } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { buildVestingWithdrawTransaction } = useGPOSTransactionBuilder();
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateGposWithdrawFee } = useFees();
  const { sm } = useViewportContext();

  const handleWithdraw = useCallback(
    async (password: string) => {
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
        const withdrawAmount =
          values.withdrawAmount *
          10 ** (gposBalances?.asset.precision as number);

        const trx = buildVestingWithdrawTransaction(
          gposBalances?.asset as Asset,
          withdrawAmount,
          gposVestingBalances,
          id
        );
        const activeKey = getPrivateKey(password, "active");
        const trxResult = await buildTrx([trx], [activeKey]);
        if (trxResult) {
          formAccountBalancesByName(localStorageAccount);
          await getGposInfo();
          powerDownForm.setFieldsValue({
            withdrawAmount: 0,
          });
          setTransactionErrorMessage("");
          setTransactionSuccessMessage(
            `Successfully Withdrawn ${values.withdrawAmount} ${gposBalances?.asset.precision}`
          );
          setLoadingTransaction(false);
        } else {
          setTransactionErrorMessage("Unable to process the transaction!");
          setLoadingTransaction(false);
        }
      } catch (e) {
        console.log(e);
        setTransactionErrorMessage("Unable to process the transaction!");
        setLoadingTransaction(false);
      }
    },
    [
      powerDownForm,
      getPrivateKey,
      setLoadingTransaction,
      dbApi,
      id,
      gposBalances,
      setTransactionErrorMessage,
      buildVestingWithdrawTransaction,
      buildTrx,
      formAccountBalancesByName,
      getGposInfo,
      setTransactionSuccessMessage,
    ]
  );

  const adjustWithdraw = useCallback(
    (direction: string) => {
      const currentAmount = powerDownForm.getFieldValue("withdrawAmount");
      powerDownForm.setFieldsValue({
        withdrawAmount:
          direction === "+"
            ? currentAmount + 1
            : currentAmount > 0
            ? currentAmount - 1
            : 0,
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
      return Promise.reject(new Error("Amount should be greater than 0"));
    }
    if (value > (gposBalances?.availableBalance as number)) {
      return Promise.reject(
        new Error("Can not be greater than available balance")
      );
    }
    if (!accountAsset) {
      return Promise.reject(new Error("Balance is not enough"));
    } else {
      if (feeAmount > (accountAsset?.amount as number))
        return Promise.reject(new Error("Balance is not enough to pay fees"));
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
    //TODO: check that new amount not less then 0 or grater then account balance
    if (gposBalances) {
      const newBalance =
        (gposBalances.openingBalance as number) - withdrawAmount;
      const newAvailableBalance =
        (gposBalances.availableBalance as number) - withdrawAmount;
      if (newAvailableBalance >= 0) {
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
      { required: true, message: "Withdraw amount is required" },
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
