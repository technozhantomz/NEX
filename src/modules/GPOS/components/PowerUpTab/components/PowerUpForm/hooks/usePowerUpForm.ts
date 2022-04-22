import { Form } from "antd";
import { useEffect, useState } from "react";

import { useAsset } from "../../../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../../../common/providers";
import { GPOSInfoResponse } from "../../../../../../../common/types";

import { GPOSBalances, UsePowerUpForm } from "./usePowerUpForm.types";

export function usePowerUpForm(): UsePowerUpForm {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [gposBalances, setGOPSBalances] = useState<GPOSBalances>();
  const [powerUpForm] = Form.useForm();
  const withdrawAmount = Form.useWatch("withdrawAmount", powerUpForm);
  const { id } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { getAssetById } = useAsset();

  useEffect(() => {
    getGPOSInfo();
  }, [id]);

  useEffect(() => {
    //update other inputs heret
    console.log(withdrawAmount);
  }, [withdrawAmount]);

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
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
    powerUpForm,
    submittingPassword,
    isPasswordModalVisible,
    handlePasswordModalCancel,
  };
}
