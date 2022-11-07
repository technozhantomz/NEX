import { useCallback, useEffect, useState } from "react";

import { utils } from "../../../../../api/utils";
import { useAsset } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { GPOSInfoType } from "../../../../../common/types";

import { GPOSInfo, UseGPOSTabResult } from "./useGPOSTab.types";

export function useGPOSTab(): UseGPOSTabResult {
  const [GPOSInfo, setGPOSInfo] = useState<GPOSInfo>({
    gposBalance: 0,
    performance: "",
    qualifiedReward: 0,
    rakeReward: 0,
    availableBalance: 0,
    symbol: "",
  });
  const [readMore, _setReadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();
  const { getAssetById } = useAsset();

  const setReadMore = useCallback(
    (readMore: boolean) => {
      _setReadMore(readMore);
    },
    [_setReadMore]
  );

  const getPerformanceString = useCallback((qualifiedReward: number) => {
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
  }, []);

  const getGposInfo = useCallback(async () => {
    try {
      if (id) {
        const gposInfo: GPOSInfoType = await dbApi("get_gpos_info", [id]);
        return gposInfo;
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, dbApi]);

  const calculateGposInfo = useCallback(async () => {
    try {
      setLoading(true);
      const gposInfo = await getGposInfo();
      if (gposInfo) {
        const asset = await getAssetById(gposInfo.award.asset_id);
        if (asset) {
          const totalBlockchainGPOS =
            gposInfo.total_amount / 10 ** asset.precision;
          const vestingFactor = parseInt(gposInfo.vesting_factor);
          const qualifiedReward = utils.trimNum(vestingFactor * 100 || 0, 2);
          const performance = getPerformanceString(qualifiedReward);
          setGPOSInfo({
            gposBalance:
              gposInfo.account_vested_balance / 10 ** asset.precision,
            performance: performance,
            qualifiedReward: qualifiedReward,
            rakeReward: utils.trimNum(
              (gposInfo.account_vested_balance /
                10 ** asset.precision /
                totalBlockchainGPOS) *
                utils.trimNum(vestingFactor * 100 || 0, 2),
              2
            ),
            availableBalance:
              gposInfo.allowed_withdraw_amount / 10 ** asset.precision,
            symbol: asset.symbol,
          });
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    getGposInfo,
    setLoading,
    getAssetById,
    getPerformanceString,
    setGPOSInfo,
  ]);

  useEffect(() => {
    if (id) {
      calculateGposInfo();
    }
  }, [calculateGposInfo]);

  return { GPOSInfo, setReadMore, readMore, loading };
}
