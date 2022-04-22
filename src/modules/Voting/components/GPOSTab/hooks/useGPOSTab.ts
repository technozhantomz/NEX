import { useEffect, useState } from "react";

import { useAsset } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { GPOSInfoResponse } from "../../../../../common/types";

import { GPOSInfo, UseGPOSTab } from "./useGPOSTab.types";

export function useGPOSTab(): UseGPOSTab {
  const [GPOSInfo, setGPOSInfo] = useState<GPOSInfo>({
    gposBalance: 0,
    performance: "",
    qualifiedReward: 0,
    rakeReward: 0,
    availableBalance: 0,
    symbol: "",
  });
  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();
  const { getAssetById } = useAsset();

  useEffect(() => {
    getGPOSInfo();
  }, [id]);

  const trimNum = (num: number, digits: number) => {
    // Early return if NaN
    if (isNaN(num)) {
      return 0;
    }
    const numString = num.toString();
    const decimalIndex = numString.indexOf(".");
    const subString =
      decimalIndex > 0
        ? numString.substring(0, decimalIndex + (digits + 1))
        : num;
    return parseFloat(subString as string);
  };

  const getPerformanceString = (qualifiedReward: number) => {
    switch (true) {
      case qualifiedReward === 100:
        return "Max Rewards";
      case qualifiedReward > 83.33 && qualifiedReward < 100:
        return "Great Rewards";
      case qualifiedReward > 66.66 && qualifiedReward <= 83.33:
        return "Good Rewards";
      case qualifiedReward > 50 && qualifiedReward <= 66.66:
        return "OK Rewards";
      case qualifiedReward > 33.33 && qualifiedReward <= 50:
        return "Low Rewards";
      case qualifiedReward > 16.68 && qualifiedReward <= 33.33:
        return "Lower Rewards";
      case qualifiedReward >= 1 && qualifiedReward <= 16.68:
        return "Critical Low";
      default:
        return "No Rewards";
    }
  };

  const getGPOSInfo = async () => {
    const _GPOSInfo = await dbApi("get_gpos_info", [id]).then(
      async (gposInfo: GPOSInfoResponse) => {
        if (gposInfo) {
          const asset = await getAssetById(gposInfo.award.asset_id);
          const totalBlockchainGPOS =
            gposInfo.total_amount / 10 ** asset.precision;
          const vestingFactor = parseInt(gposInfo.vesting_factor);
          const qualifiedReward = trimNum(vestingFactor * 100 || 0, 2);
          const performance = getPerformanceString(qualifiedReward);
          return {
            gposBalance:
              gposInfo.account_vested_balance / 10 ** asset.precision,
            performance: performance,
            qualifiedReward: qualifiedReward,
            rakeReward: trimNum(
              (gposInfo.account_vested_balance /
                10 ** asset.precision /
                totalBlockchainGPOS) *
                trimNum(vestingFactor * 100 || 0, 2),
              2
            ),
            availableBalance:
              gposInfo.allowed_withdraw_amount / 10 ** asset.precision,
            symbol: asset.symbol,
          };
        }
      }
    );
    setGPOSInfo(_GPOSInfo);
  };

  return { GPOSInfo };
}
