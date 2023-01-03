import { useCallback, useEffect, useState } from "react";

import { useAsset, useGpos } from "../../../common/hooks";
import { useUserContext } from "../../../common/providers";
import { GPOSBalances } from "../types";

import { UseGposPageResult } from "./useGposPage.types";

export function useGposPage(): UseGposPageResult {
  const [gposBalances, setGposBalances] = useState<GPOSBalances>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileDropdownvisible, _setIsMobileDropdownvisible] =
    useState<boolean>(false);

  const { getGposInfo } = useGpos();
  const { getAssetById } = useAsset();
  const { id } = useUserContext();

  const setIsMobileDropdownvisible = useCallback(
    (isMobileDropdownvisible: boolean) => {
      _setIsMobileDropdownvisible(isMobileDropdownvisible);
    },
    [_setIsMobileDropdownvisible]
  );

  const calculateGposBalances = useCallback(async () => {
    if (id) {
      try {
        setLoading(true);
        const gposInfo = await getGposInfo(id);
        if (gposInfo) {
          const openingBalance = gposInfo.gposBalance;
          const availableBalance = gposInfo.availableBalance;
          setGposBalances({
            openingBalance: openingBalance,
            availableBalance: availableBalance,
            newBalance: openingBalance,
            symbol: gposInfo.symbol,
          });

          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  }, [getGposInfo, setLoading, getAssetById, setGposBalances, id]);

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
