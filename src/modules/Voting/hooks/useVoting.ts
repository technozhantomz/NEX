import { useCallback, useEffect, useState } from "react";

import { DEFAULT_PROXY_ID } from "../../../api/params";
import { useAccount, useAsset, useMembers } from "../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../common/providers";
import { FullAccount, Proxy, Vote } from "../../../common/types";
import { GposInfo } from "../types";

import { UseVotingResult } from "./useVoting.types";

export function useVoting(): UseVotingResult {
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverApprovedVotes, setServerApprovedVotes] = useState<Vote[]>([]);
  const [allMembers, setAllMembers] = useState<Vote[]>([]);
  const [allMembersIds, setAllMembersIds] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalGpos, setTotalGpos] = useState<number>(0);
  const [proxy, setProxy] = useState<Proxy>({
    name: "",
    id: DEFAULT_PROXY_ID,
  });

  const { localStorageAccount, id } = useUserContext();
  const { getFullAccount } = useAccount();
  const { getCommittees, getSons, getWitnesses } = useMembers();
  const { dbApi } = usePeerplaysApiContext();
  const { getAssetById, setPrecision } = useAsset();

  const getProxyAccount = useCallback(
    async (proxyId: string) => {
      const proxy = (await getFullAccount(proxyId, false)) as FullAccount;

      setProxy({
        name: proxyId !== DEFAULT_PROXY_ID ? proxy.account.name : "",
        id: proxyId,
      } as Proxy);
    },
    [getFullAccount, setProxy]
  );

  const getUserTotalGpos = useCallback(async () => {
    if (id) {
      try {
        const gposInfo: GposInfo = await dbApi("get_gpos_info", [id]);
        if (gposInfo !== undefined) {
          const asset = await getAssetById(gposInfo.award.asset_id);
          if (asset !== undefined) {
            setTotalGpos(
              setPrecision(
                true,
                gposInfo.account_vested_balance,
                asset.precision
              )
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [dbApi, id, getAssetById, setTotalGpos, setPrecision]);

  const getVotes = useCallback(async () => {
    try {
      setLoading(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      setFullAccount(fullAccount);
      if (fullAccount !== undefined) {
        await getProxyAccount(fullAccount.account.options.voting_account);
      }
      let allMembers: Vote[] = [];
      let allMembersIds: [string, string][] = [];
      const [
        { committees, committeesIds },
        { sons, sonsIds },
        { witnesses, witnessesIds },
      ] = await Promise.all([getCommittees(), getSons(), getWitnesses()]);
      allMembers = [...committees, ...sons, ...witnesses];
      allMembersIds = [...committeesIds, ...sonsIds, ...witnessesIds];

      setAllMembers(allMembers);
      setAllMembersIds(allMembersIds);

      if (fullAccount !== undefined) {
        const votes = fullAccount.votes;
        setServerApprovedVotes(votes);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    setLoading,
    localStorageAccount,
    setFullAccount,
    getCommittees,
    getSons,
    getWitnesses,
    setAllMembers,
    setAllMembersIds,
    setServerApprovedVotes,
  ]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

  useEffect(() => {
    getUserTotalGpos();
  }, [getUserTotalGpos]);

  return {
    loading,
    serverApprovedVotes,
    allMembers,
    fullAccount,
    allMembersIds,
    totalGpos,
    proxy,
    getVotes,
    getProxyAccount,
  };
}
