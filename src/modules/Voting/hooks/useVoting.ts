import { useCallback, useEffect, useState } from "react";

import { DEFAULT_PROXY_ID } from "../../../api/params";
import {
  GPOSInfo,
  useAccount,
  useGpos,
  useMembers,
} from "../../../common/hooks";
import { useUserContext } from "../../../common/providers";
import { FullAccount, Proxy, Vote } from "../../../common/types";

import { UseVotingResult } from "./useVoting.types";

export function useVoting(): UseVotingResult {
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverApprovedVotesIds, setServerApprovedVotesIds] = useState<
    string[]
  >([]);
  const [loadingUserVotes, setLoadingUserVotes] = useState<boolean>(true);
  const [allMembers, setAllMembers] = useState<Vote[]>([]);
  const [allMembersIds, setAllMembersIds] = useState<[string, string][]>([]);
  const [loadingMembers, setLoadingMembers] = useState<boolean>(true);
  const [gposInfo, setGposInfo] = useState<GPOSInfo>({
    gposBalance: 0,
    performance: "",
    qualifiedReward: 0,
    rakeReward: 0,
    availableBalance: 0,
    symbol: "",
  });
  const [proxy, setProxy] = useState<Proxy>({
    name: "",
    id: DEFAULT_PROXY_ID,
  });

  const { localStorageAccount } = useUserContext();
  const { getFullAccount } = useAccount();
  const { getCommittees, getSons, getWitnesses } = useMembers();
  const { getGposInfo } = useGpos();

  const [voteTabLoaded, setVoteTabLoaded] = useState<boolean>(false);
  if (!voteTabLoaded && !loadingUserVotes && !loadingMembers) {
    setVoteTabLoaded(true);
  }

  const getProxyAccount = useCallback(
    async (proxyId: string) => {
      try {
        const proxy = await getFullAccount(proxyId, false);
        return proxy;
      } catch (e) {
        console.log(e);
      }
    },
    [getFullAccount]
  );

  const getAllMembers = useCallback(async () => {
    try {
      setLoadingMembers(true);
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
      setLoadingMembers(false);
    } catch (e) {
      console.log(e);
      setLoadingMembers(false);
    }
  }, [
    setLoadingMembers,
    getCommittees,
    getSons,
    getWitnesses,
    setAllMembers,
    setAllMembersIds,
  ]);

  const getUserVotes = useCallback(async () => {
    try {
      setLoadingUserVotes(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      if (fullAccount !== undefined) {
        const proxyId = fullAccount.account.options.voting_account;
        const [proxy, gposInfo] = await Promise.all([
          getProxyAccount(proxyId),
          getGposInfo(fullAccount.account.id),
        ]);

        const votesIds = fullAccount.votes.map((vote) => vote.vote_id);
        if (gposInfo) {
          setGposInfo(gposInfo);
        }
        setProxy({
          name: proxyId !== DEFAULT_PROXY_ID ? proxy?.account.name : "",
          id: proxyId,
        } as Proxy);
        setServerApprovedVotesIds(votesIds);
        setFullAccount(fullAccount);
      }

      setLoadingUserVotes(false);
    } catch (e) {
      console.log(e);
      setLoadingUserVotes(false);
    }
  }, [
    setLoadingUserVotes,
    getFullAccount,
    localStorageAccount,
    getProxyAccount,
    getGposInfo,
    setGposInfo,
    setProxy,
    DEFAULT_PROXY_ID,
    setServerApprovedVotesIds,
    setFullAccount,
  ]);

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  useEffect(() => {
    getUserVotes();
  }, [getUserVotes]);

  return {
    loadingUserVotes,
    serverApprovedVotesIds,
    allMembers,
    fullAccount,
    allMembersIds,
    gposInfo,
    proxy,
    getUserVotes,
    loadingMembers,
    voteTabLoaded,
  };
}
