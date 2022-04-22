import { Form } from "antd";
import { useEffect, useState } from "react";

import { useAsset } from "../../../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../../../common/providers";
import { Asset, GPOSInfoResponse } from "../../../../../../../common/types";

import { GPOSBalances, UsePowerDownForm } from "./usePowerDownForm.types";

export function usePowerDownForm(): UsePowerDownForm {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [gposBalances, setGOPSBalances] = useState<GPOSBalances>();
  const [powerDownForm] = Form.useForm();
  const withdrawAmount = Form.useWatch("withdrawAmount", powerDownForm);
  const { id } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { getAssetById } = useAsset();

  useEffect(() => {
    getGPOSInfo();
  }, [id]);

  useEffect(() => {
    //TODO: check that new amount not less then 0 or grater then account balance
    const newBalance = gposBalances?.openingBalance + withdrawAmount;
    const newAvailableBalance =
      (gposBalances?.availableBalance as number) - withdrawAmount;
    if (newAvailableBalance >= 0) {
      powerDownForm.setFieldsValue({
        availableBalance:
          newAvailableBalance + " " + gposBalances?.asset.symbol,
        newBalance: newBalance + " " + gposBalances?.asset.symbol,
      });
      setGOPSBalances({
        openingBalance: gposBalances?.openingBalance as number,
        newBalance: newBalance,
        availableBalance: newAvailableBalance,
        asset: gposBalances?.asset as Asset,
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
        //handlePowerUp(values.password);
        console.log(values);
      });
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
  return {
    powerDownForm,
    submittingPassword,
    isPasswordModalVisible,
    confirm,
    onFormFinish,
    adjustWithdraw,
    handlePasswordModalCancel,
  };
}
