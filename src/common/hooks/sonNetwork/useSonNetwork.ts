//done
import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../providers";
import {
  Account,
  ActiveSons,
  GlobalProperties,
  SonAccount,
  SonData,
  SonNetwork,
  SonStatistics,
} from "../../types";

import { SonNetworkStatus, UseSonNetworkResult } from "./useSonNetwork.types";

export function useSonNetwork(): UseSonNetworkResult {
  const [sonAccount, _setSonAccount] = useState<Account>();
  const { dbApi } = usePeerplaysApiContext();

  const getSonAccount = useCallback(async () => {
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      const son_id = gpo.parameters.extensions.son_account;
      const son_account: Account = (await dbApi("get_accounts", [[son_id]]))[0];
      return son_account;
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  const getSons = useCallback(
    async (
      gpo: GlobalProperties
    ): Promise<{
      sons: SonAccount[];
      sonIds: string[];
    }> => {
      try {
        if (!gpo.active_sons || gpo.active_sons.length === 0) {
          return { sons: [], sonIds: [] };
        }
        const sonIds = getSonIds(gpo.active_sons);
        const sons: SonAccount[] = await dbApi("get_sons", [sonIds]);
        return { sons, sonIds };
      } catch (e) {
        console.log(e);
        return { sons: [], sonIds: [] };
      }
    },
    [dbApi]
  );

  const getSonIds = useCallback((activeSons: ActiveSons): string[] => {
    const sonIds: string[] = [];
    activeSons.forEach((sonNetwork: SonNetwork) => {
      sonNetwork.sons.forEach((sonAccount: SonData) => {
        if (!sonIds.includes(sonAccount.son_id)) {
          sonIds.push(sonAccount.son_id);
        }
      });
    });
    return sonIds;
  }, []);

  const getSonsStatistics = useCallback(
    async (sons: SonAccount[]): Promise<SonStatistics[]> => {
      try {
        const sonsStatistics: SonStatistics[] = await dbApi("get_objects", [
          sons.map((son) => {
            if (son) {
              return son.statistics;
            }
          }),
        ]);
        return sonsStatistics;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    [dbApi]
  );

  const getSonStatus = useCallback(
    (
      son: SonAccount,
      sonsStatistics: SonStatistics,
      gpo: GlobalProperties
    ): { status: [string, string]; isActive: boolean } => {
      const now = new Date();
      const utcNowMS = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
      ).getTime();
      if (
        new Date(sonsStatistics.last_active_timestamp).getTime() +
          gpo.parameters.extensions.son_heartbeat_frequency * 1000 >
        utcNowMS
      ) {
        return {
          status: [son.id, "OK, regular SON heartbeat"],
          isActive: true,
        };
      } else {
        if (
          new Date(sonsStatistics.last_active_timestamp).getTime() +
            gpo.parameters.extensions.son_down_time * 1000 >
          utcNowMS
        ) {
          return {
            status: [
              son.id,
              "OK, irregular SON heartbeat, but not triggering SON down proposal",
            ],
            isActive: false,
          };
        } else {
          return {
            status: [
              son.id,
              "NOT OK, irregular SON heartbeat, triggering SON down proposal",
            ],
            isActive: false,
          };
        }
      }
    },
    []
  );

  const getSonNetworkStatus = useCallback(async () => {
    const result = { status: [], isSonNetworkOk: false } as SonNetworkStatus;
    let activeSons = 0;
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      if (!gpo.active_sons || gpo.active_sons.length === 0) {
        return result;
      }
      const { sons, sonIds } = await getSons(gpo);
      const sonsStatistics = await getSonsStatistics(sons);

      let i = 0;
      for (const son of sons) {
        if (son) {
          const sonStatisticsObject = sonsStatistics.find(
            (sonStatistics) => sonStatistics.owner === son.id
          ) as SonStatistics;
          const { status, isActive } = getSonStatus(
            son,
            sonStatisticsObject,
            gpo
          );
          result.status.push(status);
          if (isActive) {
            activeSons = activeSons + 1;
          }
        } else {
          result.status.push([sonIds[i], "NOT OK, invalid SON id"]);
        }
        i++;
      }
      result.isSonNetworkOk =
        activeSons / gpo.parameters.extensions.maximum_son_count > 2 / 3
          ? true
          : false;
      return result;
    } catch (e) {
      console.log(e);
      return result;
    }
  }, [dbApi, getSons, getSonsStatistics, getSonStatus]);

  useEffect(() => {
    let ignore = false;

    async function setSonAccount() {
      const sonAccount = await getSonAccount();
      if (!ignore) {
        _setSonAccount(sonAccount);
      }
    }

    setSonAccount();

    return () => {
      ignore = true;
    };
  }, [getSonAccount, _setSonAccount]);

  return {
    sonAccount,
    getSonNetworkStatus,
  };
}
