import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../common/providers";
import { GPOSInfoResponse } from "../../../common/types";

import { GPOSBalances, UseGposPageResult } from "./useGposPage.types";

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
        setLoading(true);
        const gposInfo: GPOSInfoResponse = await dbApi("get_gpos_info", [id]);
        if (gposInfo) {
          const asset = await getAssetById(gposInfo.award.asset_id);
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
        } else {
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [id, dbApi, setLoading, getAssetById, setGposBalances]);

  useEffect(() => {
    getGposInfo();
  }, [getGposInfo]);

  return {
    gposBalances,
    loading,
    getGposInfo,
    isMobileDropdownvisible,
    setIsMobileDropdownvisible,
  };
}
