import { FullAccount, Proxy, Vote } from "../../../common/types";

export type UseVotingResult = {
  loadingUserVotes: boolean;
  serverApprovedVotesIds: string[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  allMembersIds: [string, string][];
  totalGpos: number;
  proxy: Proxy;
  getUserVotes: () => Promise<void>;
  loadingMembers: boolean;
  voteTabLoaded: boolean;
};
