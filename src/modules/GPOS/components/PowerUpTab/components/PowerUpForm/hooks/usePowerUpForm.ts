import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useFees,
  useGPOSTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import { useUserContext } from "../../../../../../../common/providers";
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

  const [powerUpForm] = Form.useForm();
  const depositAmount = Form.useWatch("depositAmount", powerUpForm);
  const { id, assets, localStorageAccount } = useUserContext();
  const { buildVestingBalanceCreateTransaction } = useGPOSTransactionBuilder();
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { calculateGposVestingFee } = useFees();

  const adjustDeposit = useCallback(
    (direction: string) => {
      const currentAmount = powerUpForm.getFieldValue("depositAmount");
      powerUpForm.setFieldsValue({
        depositAmount:
          direction === "+"
            ? currentAmount + 1
            : currentAmount > 0
            ? currentAmount - 1
            : 0,
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
          setTransactionErrorMessage("");
          setTransactionSuccessMessage(
            `Successfully Deposited ${values.depositAmount} ${gposBalances?.asset.symbol}`
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
        new Error("Deposit amount should be greater than 0")
      );
    }
    if (!accountAsset) {
      return Promise.reject(new Error("Balance is not enough"));
    } else {
      if (total > (accountAsset.amount as number)) {
        return Promise.reject(new Error("Balance is not enough"));
      }
    }
    return Promise.resolve();
  };

  const formValidation = {
    depositAmount: [
      { required: true, message: "Deposit amount in required" },
      { validator: validateDepositAmount },
    ],
  };

  useEffect(() => {
    if (gposBalances) {
      powerUpForm.setFieldsValue({
        openingBalance:
          gposBalances.openingBalance + " " + gposBalances.asset.symbol,
        newBalance:
          gposBalances.openingBalance + " " + gposBalances.asset.symbol,
      });
    }
  }, [gposBalances, powerUpForm]);

  useEffect(() => {
    const gposVestingFee = calculateGposVestingFee();
    if (gposVestingFee) setFeeAmount(gposVestingFee);
  }, [calculateGposVestingFee, setFeeAmount]);

  useEffect(() => {
    //TODO: check that new amount not less then 0 or grater then account balance
    if (gposBalances) {
      const newBalance = gposBalances?.openingBalance + depositAmount;
      powerUpForm.setFieldsValue({
        newBalance: newBalance + " " + gposBalances?.asset.symbol,
      });
    }
  }, [depositAmount, gposBalances, powerUpForm]);

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
  };
}
