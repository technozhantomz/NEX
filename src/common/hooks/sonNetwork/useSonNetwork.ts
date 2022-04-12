import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { Account, GlobalProperties } from "../../types";

import { SonNetworkStatus, UseSonNetworkResult } from "./useSonNetwork.types";

export function useSonNetwork(): UseSonNetworkResult {
  const [sonAccount, setSonAccount] = useState<Account>();
  const { dbApi } = usePeerplaysApiContext();

  const getSonAccount = useCallback(async () => {
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      const son_id = gpo.parameters.extensions.son_account;
      const son_account: Account = (await dbApi("get_accounts", [[son_id]]))[0];
      if (son_account) {
        setSonAccount(son_account);
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi, setSonAccount]);

  const getSonNetworkStatus = useCallback(async () => {
    const result = { status: [], isSonNetworkOk: false } as SonNetworkStatus;
    let activeSons = 0;
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      if (!gpo.active_sons || gpo.active_sons.length == 0) {
        return result;
      }
      const sonIds = gpo.active_sons.map(
        (active_son: any) => active_son.son_id
      );
      const sons = await dbApi("get_sons", [sonIds]);
      for (const son of sons) {
        if (son) {
          const sonStatisticsObject = (
            await dbApi("get_objects", [[son.statistics]])
          )[0];
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
            new Date(sonStatisticsObject.last_active_timestamp).getTime() +
              gpo.parameters.extensions.son_heartbeat_frequency * 1000 >
            utcNowMS
          ) {
            result.status.push([son.id, "OK, regular SON heartbeat"]);
            activeSons = activeSons + 1;
          } else {
            if (
              new Date(sonStatisticsObject.last_active_timestamp).getTime() +
                gpo.parameters.extensions.son_down_time * 1000 >
              utcNowMS
            ) {
              result.status.push([
                son.id,
                "OK, irregular SON heartbeat, but not triggering SON down proposal",
              ]);
            } else {
              result.status.push([
                son.id,
                "NOT OK, irregular SON heartbeat, triggering SON down proposal",
              ]);
            }
          }
        } else {
          result.status.push([son.id, "NOT OK, invalid SON id"]);
        }
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
  }, [dbApi]);

  useEffect(() => {
    getSonAccount();
  }, [getSonAccount]);

  return {
    sonAccount,
    getSonNetworkStatus,
  };
}
