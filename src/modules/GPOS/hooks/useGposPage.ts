import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../common/providers";
import { GPOSInfoType } from "../../../common/types";
import { GPOSBalances } from "../types";

import { UseGposPageResult } from "./useGposPage.types";

export function useGposPage(): UseGposPageResult {
  const [gposBalances, setGposBalances] = useState<GPOSBalances>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileDropdownvisible, _setIsMobileDropdownvisible] =
    useState<boolean>(false);

  const { getAssetById } = useAsset();
  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();

  const setIsMobileDropdownvisible = useCallback(
    (isMobileDropdownvisible: boolean) => {
      _setIsMobileDropdownvisible(isMobileDropdownvisible);
    },
    [_setIsMobileDropdownvisible]
  );

  const getGposInfo = useCallback(async () => {
    try {
      if (id) {
        const gposInfo: GPOSInfoType = await dbApi("get_gpos_info", [id]);
        return gposInfo;
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi, id]);

  const calculateGposBalances = useCallback(async () => {
    try {
      setLoading(true);
      const gposInfo = await getGposInfo();
      if (gposInfo) {
        const asset = await getAssetById(gposInfo.award.asset_id);
        if (asset) {
          const openingBalance =
            gposInfo.account_vested_balance / 10 ** asset.precision;
          const availableBalance =
            gposInfo.allowed_withdraw_amount / 10 ** asset.precision;
          setGposBalances({
            openingBalance: openingBalance,
            availableBalance: availableBalance,
            newBalance: openingBalance,
            asset: asset,
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
  }, [getGposInfo, setLoading, getAssetById, setGposBalances]);

  useEffect(() => {
    calculateGposBalances();
  }, [calculateGposBalances]);

  return {
    gposBalances,
    loading,
    calculateGposBalances,
    isMobileDropdownvisible,
    setIsMobileDropdownvisible,
  };
}
