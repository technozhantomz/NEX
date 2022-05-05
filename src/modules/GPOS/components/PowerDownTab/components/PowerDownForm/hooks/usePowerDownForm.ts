import { Form } from "antd";
import { useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../../../common/providers";
import { Asset, GPOSInfoResponse } from "../../../../../../../common/types";

import { GPOSBalances, UsePowerDownForm } from "./usePowerDownForm.types";

export function usePowerDownForm(): UsePowerDownForm {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<string>("");
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [gposBalances, setGOPSBalances] = useState<GPOSBalances>();
  const [powerDownForm] = Form.useForm();
  const withdrawAmount = Form.useWatch("withdrawAmount", powerDownForm);
  const { localStorageAccount, id, assets } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { trxBuilder } = useTransactionBuilder();
  const { getAssetById } = useAsset();
  const { getPrivateKey } = useAccount();
  const { calulateGPOSFees } = useFees();

  useEffect(() => {
    getGPOSInfo();
  }, [id]);

  useEffect(() => {
    const withdrawVestingBalanceFee = calulateGPOSFees("withdraw");
    if (withdrawVestingBalanceFee) setFeeAmount(withdrawVestingBalanceFee);
  }, [localStorageAccount, calulateGPOSFees, assets]);

  useEffect(() => {
    //TODO: check that new amount not less then 0 or grater then account balance
    const newBalance =
      (gposBalances?.openingBalance as number) - withdrawAmount;
    const newAvailableBalance =
      (gposBalances?.availableBalance as number) - withdrawAmount;
    if (newAvailableBalance >= 0) {
      powerDownForm.setFieldsValue({
        availableBalance:
          newAvailableBalance + " " + gposBalances?.asset.symbol,
        newBalance: newBalance + " " + gposBalances?.asset.symbol,
      });
    }
  }, [withdrawAmount]);

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const confirm = () => {
    powerDownForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handlePowerDown(values.password);
      });
    }
  };

  const handlePowerDown = async (password: string) => {
    setSubmittingPassword(true);
    const values = powerDownForm.getFieldsValue();
    const activeKey = getPrivateKey(password, "active");
    const vestingBalance = await dbApi("get_vesting_balances", [id]).then(
      (balances: any[]) =>
        balances.filter((balance) => balance.balance_type == "gpos")
    );
    const withdrawAmount =
      values.withdrawAmount * 10 ** (gposBalances?.asset.precision as number);
    const trx = {
      type: "vesting_balance_withdraw",
      params: {
        fee: {
          amount: 0,
          asset_id: gposBalances?.asset.id,
        },
        vesting_balance: vestingBalance[0].id,
        owner: id,
        amount: {
          amount: withdrawAmount,
          asset_id: gposBalances?.asset.id,
        },
      },
    };
    try {
      const trxResult = await trxBuilder([trx], [activeKey]);
      if (trxResult) {
        getGPOSInfo();
        setIsPasswordModalVisible(false);
        setSubmittingPassword(false);
        setStatus(
          `Successfull Withdrawn ${values.withdrawAmount} ${gposBalances?.asset.precision}`
        );
        setStatusType("success");
      }
    } catch (e) {
      setSubmittingPassword(false);
      setStatus("An Error has occurred");
      setStatusType("error");
      console.log(e);
      return;
    }
  };

  const adjustWithdraw = (direction: string) => {
    const currentAmount = powerDownForm.getFieldValue("withdrawAmount");
    powerDownForm.setFieldsValue({
      withdrawAmount: direction === "+" ? currentAmount + 1 : currentAmount - 1,
    });
  };

  const getGPOSInfo = async () => {
    await dbApi("get_gpos_info", [id]).then(
      async (result: GPOSInfoResponse) => {
        if (result) {
          const asset = await getAssetById(result.award.asset_id);
          const openingBalance =
            result.account_vested_balance / 10 ** asset.precision;
          const availableBalance =
            result.allowed_withdraw_amount / 10 ** asset.precision;
          setGOPSBalances({
            openingBalance: openingBalance,
            availableBalance: availableBalance,
            newBalance: openingBalance,
            asset: asset,
          });
          powerDownForm.setFieldsValue({
            openingBalance: openingBalance + " " + asset.symbol,
            availableBalance: availableBalance + " " + asset.symbol,
            withdrawAmount: 0,
            newBalance: openingBalance + " " + asset.symbol,
          });
        }
      }
    );
  };

  const validateWithdrawAmount = async (_: unknown, value: number) => {
    const accountAsset = assets.find(
      (asset) => asset.symbol === gposBalances?.asset.symbol
    );
    if (value <= 0)
      return Promise.reject(new Error("Amount should be greater than 0"));
    if (value > (gposBalances?.availableBalance as number))
      return Promise.reject(
        new Error("Can not be greater than Available Balance")
      );
    if (feeAmount > (accountAsset?.amount as number))
      return Promise.reject(new Error("Balance is not enough to pay fees"));
  };

  const formValdation = {
    withdrawAmount: [
      { required: true, message: "From is required" },
      { validator: validateWithdrawAmount },
    ],
  };

  return {
    status,
    statusType,
    powerDownForm,
    formValdation,
    submittingPassword,
    isPasswordModalVisible,
    confirm,
    onFormFinish,
    adjustWithdraw,
    handlePasswordModalCancel,
  };
}
