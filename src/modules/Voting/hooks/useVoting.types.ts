import { FullAccount, Proxy, Vote } from "../../../common/types";

export type UseVotingResult = {
  loading: boolean;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  allMembersIds: [string, string][];
  totalGpos: number;
  proxy: Proxy;
  getVotes: () => Promise<void>;
  getProxyAccount: (proxyId: string) => Promise<void>;
};
