//done
import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../providers";
import {
  Account,
  ActiveSon,
  GlobalProperties,
  Sidechain,
  SonAccount,
  SonStatistics,
} from "../../types";
import { useAccount } from "../account";
import { useBlockchain } from "../blockchain";

import { SonNetworkStatus, UseSonNetworkResult } from "./useSonNetwork.types";

export function useSonNetwork(): UseSonNetworkResult {
  const [sonAccount, _setSonAccount] = useState<Account>();
  const { dbApi } = usePeerplaysApiContext();
  const { getGlobalProperties } = useBlockchain();
  const { getChainProperties } = useBlockchain();
  const { getAccounts } = useAccount();

  const getSonAccount = useCallback(async () => {
    const gpo = await getGlobalProperties();
    if (gpo) {
      const son_id = gpo.parameters.extensions.son_account;
      const accounts = await getAccounts([son_id]);
      const son_account = accounts ? accounts[0] : undefined;
      return son_account;
    }
  }, [getGlobalProperties, getAccounts]);

  const getSons = useCallback(
    async (
      chainActiveSonsDetails: ActiveSon[]
    ): Promise<{
      sons: SonAccount[];
      sonIds: string[];
    }> => {
      try {
        if (chainActiveSonsDetails.length === 0) {
          return { sons: [], sonIds: [] };
        }
        const sonIds = chainActiveSonsDetails.map(
          (sonDetails) => sonDetails.son_id
        );
        const sons: SonAccount[] = await dbApi("get_sons", [sonIds]);
        return { sons, sonIds };
      } catch (e) {
        console.log(e);
        return { sons: [], sonIds: [] };
      }
    },
    [dbApi]
  );

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
      chain: Sidechain,
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
      const chainLastActiveTimeStamp =
        sonsStatistics.last_active_timestamp.find(
          (timestamp) => timestamp[0] === chain
        ) as [Sidechain, string];
      if (
        new Date(chainLastActiveTimeStamp[1]).getTime() +
          gpo.parameters.extensions.son_heartbeat_frequency * 1000 >
        utcNowMS
      ) {
        return {
          status: [son.id, "OK, regular SON heartbeat"],
          isActive: true,
        };
      } else {
        if (
          new Date(chainLastActiveTimeStamp[1]).getTime() +
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

  const getSonNetworkStatus = useCallback(
    async (chain: Sidechain) => {
      const result = { status: [], isSonNetworkOk: false } as SonNetworkStatus;
      let activeSons = 0;
      try {
        const gpo = await getGlobalProperties();
        const chainProperties = await getChainProperties();
        if (!gpo || !chainProperties) {
          return result;
        }
        const chainActiveSons = gpo.active_sons.find(
          (sons) => sons[0] === chain
        );
        const chainActiveSonsDetails =
          chainActiveSons !== undefined ? chainActiveSons[1] : [];
        if (chainActiveSonsDetails.length === 0) {
          return result;
        }
        const { sons, sonIds } = await getSons(chainActiveSonsDetails);
        const sonsStatistics = await getSonsStatistics(sons);

        let i = 0;
        for (const son of sons) {
          if (son) {
            const sonStatisticsObject = sonsStatistics.find(
              (sonStatistics) => sonStatistics.owner === son.id
            ) as SonStatistics;
            const { status, isActive } = getSonStatus(
              chain,
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
          activeSons >= chainProperties.immutable_parameters.min_son_count
            ? true
            : false;
        return result;
      } catch (e) {
        console.log(e);
        return result;
      }
    },
    [getGlobalProperties, getSons, getSonsStatistics, getSonStatus]
  );

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
