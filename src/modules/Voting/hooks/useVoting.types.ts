import { FullAccount, Proxy, Vote } from "../../../common/types";

export type UseVotingResult = {
  loadingUserVotes: boolean;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  allMembersIds: [string, string][];
  totalGpos: number;
  proxy: Proxy;
  getUserVotes: () => Promise<void>;
  loadingMembers: boolean;
};
