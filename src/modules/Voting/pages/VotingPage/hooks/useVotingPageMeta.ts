import { useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { VotingPageMeta } from "./useVotingPageMeta.types";

export function useVotingPageMeta(tab?: string): VotingPageMeta {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "PeerPlays (GPOS)",
    heading: "PeerPlays (GPOS)",
    description: "PeerPlays (GPOS) | ",
  });

  useEffect(() => {
    switch (tab) {
      case "gpos":
        setPageMeta({
          title: "PeerPlays (GPOS)",
          heading: "PeerPlays (GPOS)",
          description: "PeerPlays (GPOS)",
        });
        break;
      case "witness":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: "PeerPlays Voting",
          description: "PeerPlays Voting | Witness",
        });
        break;
      case "sons":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: "PeerPlays Voting",
          description: "PeerPlays Voting | SONs",
        });
        break;
      case "committee":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: "PeerPlays Voting",
          description: "PeerPlays Voting | Committee",
        });
        break;
      case "proxy":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: "PeerPlays Voting",
          description: "PeerPlays Voting | Proxy",
        });
        break;
      default:
        setPageMeta({
          title: "PeerPlays (GPOS)",
          heading: "PeerPlays (GPOS)",
          description: "PeerPlays (GPOS)",
        });
        break;
    }
  }, [tab]);

  return { pageMeta };
}
