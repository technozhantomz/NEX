import { useCallback, useEffect, useState } from "react";

import { useAccount } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { FullAccount } from "../../../../../common/types";

import { UseVotingResult, VoteRow } from "./useVoting.types";

export function useVoting(tab: string): UseVotingResult {
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverVotes, setServerVotes] = useState<VoteRow[]>([]);
  const [localVotes, setLocalVotes] = useState<VoteRow[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { localStorageAccount } = useUserContext();
  const { getFullAccount } = useAccount();

  const getServerVotes = useCallback(async () => {
    try {
      setLoading(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      setFullAccount(fullAccount);
      if (fullAccount !== undefined) {
        const votes = fullAccount.votes;
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [localStorageAccount, getFullAccount, setFullAccount, setLoading]);

  useEffect(() => {}, []);

  return {
    isModalVisible,
    isPassModalVisible,
    loading,
  };
}
