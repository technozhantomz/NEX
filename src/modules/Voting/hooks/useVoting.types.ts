import { FullAccount, Proxy, Vote } from "../../../common/types";

export type UseVotingResult = {
  loading: boolean;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  totalGpos: number;
  proxy: Proxy;
};
