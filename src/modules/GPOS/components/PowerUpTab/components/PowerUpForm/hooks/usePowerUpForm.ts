import { Form } from "antd";
import { useEffect, useState } from "react";

import {
  useAccount,
  useAsset,
  useTransactionBuilder,
} from "../../../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../../../common/providers";
import { Asset, GPOSInfoResponse } from "../../../../../../../common/types";

import { GPOSBalances, UsePowerUpForm } from "./usePowerUpForm.types";

export function usePowerUpForm(): UsePowerUpForm {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [gposBalances, setGOPSBalances] = useState<GPOSBalances>();
  const [powerUpForm] = Form.useForm();
  const depositAmount = Form.useWatch("depositAmount", powerUpForm);
  const { id } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { trxBuilder } = useTransactionBuilder();
  const { getAssetById } = useAsset();
  const { getPrivateKey } = useAccount();

  useEffect(() => {
    getGPOSInfo();
  }, [id]);

  useEffect(() => {
    //TODO: check that new amount not less then 0 or grater then account balance
    const newBalance = gposBalances?.openingBalance + depositAmount;
    powerUpForm.setFieldsValue({
      newBalance: newBalance + " " + gposBalances?.asset.symbol,
    });
    setGOPSBalances({
      openingBalance: gposBalances?.openingBalance as number,
      newBalance: newBalance,
      asset: gposBalances?.asset as Asset,
    });
  }, [depositAmount]);

  const confirm = () => {
    powerUpForm.validateFields().then(() => {
      setIsPasswordModalVisible(true);
    });
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        handlePowerUp(values.password);
      });
    }
  };

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const adjustDeposit = (direction: string) => {
    const currentAmount = powerUpForm.getFieldValue("depositAmount");
    powerUpForm.setFieldsValue({
      depositAmount: direction === "+" ? currentAmount + 1 : currentAmount - 1,
    });
  };

  const handlePowerUp = async (password: string) => {
    setSubmittingPassword(true);
    const begin_timestamp = new Date().toISOString().replace("Z", "");
    const values = powerUpForm.getFieldsValue();
    const activeKey = getPrivateKey(password, "active");
    const depositAmount =
      values.depositAmount * 10 ** gposBalances?.asset.precision;
    const trx = {
      type: "vesting_balance_create",
      params: {
        fee: {
          amount: 0,
          asset_id: gposBalances?.asset.id,
        },
        creator: id,
        owner: id,
        amount: {
          amount: depositAmount,
          asset_id: gposBalances?.asset.id,
        },
        asset_symbol: gposBalances?.asset.symbol,
        policy: [
          0,
          {
            begin_timestamp,
            vesting_cliff_seconds: 0,
            vesting_duration_seconds: 0,
          },
        ],
        balance_type: "gpos",
      },
    };
    try {
      const trxResult = await trxBuilder([trx], [activeKey]);
      if (trxResult) {
        getGPOSInfo();
        setIsPasswordModalVisible(false);
        setSubmittingPassword(false);
        setStatus(
          `Successfull Deposited ${values.depositAmount} ${gposBalances?.asset.symbol}`
        );
      }
    } catch (e) {
      setSubmittingPassword(false);
      console.log(e);
      return;
    }
  };

  const getGPOSInfo = async () => {
    await dbApi("get_gpos_info", [id]).then(
      async (result: GPOSInfoResponse) => {
        if (result) {
          const asset = await getAssetById(result.award.asset_id);
          const openingBalance =
            result.account_vested_balance / 10 ** asset.precision;
          setGOPSBalances({
            openingBalance: openingBalance,
            newBalance: openingBalance,
            asset: asset,
          });
          powerUpForm.setFieldsValue({
            openingBalance: openingBalance + " " + asset.symbol,
            depositAmount: 0,
            newBalance: openingBalance + " " + asset.symbol,
          });
        }
      }
    );
  };
  return {
    status,
    powerUpForm,
    submittingPassword,
    isPasswordModalVisible,
    confirm,
    onFormFinish,
    adjustDeposit,
    handlePasswordModalCancel,
  };
}
