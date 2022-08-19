import { useEffect, useState } from "react";

import { PageMeta } from "../../../../common/types";

import { VotingPage } from "./useVotingPage.types";

export function useVotingPage(tab?: string): VotingPage {
  const defaulPageMeta = {
    title: "PeerPlays (GPOS)",
    heading: "PeerPlays (GPOS)",
    description: "PeerPlays (GPOS)",
  } as PageMeta;
  const [pageMeta, setPageMeta] = useState<PageMeta>(defaulPageMeta);

  useEffect(() => {
    switch (tab) {
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
      case "advisors":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: "PeerPlays Voting",
          description: "PeerPlays Voting | Advisors",
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
        setPageMeta(defaulPageMeta);
        break;
    }
  }, [tab]);

  return { pageMeta };
}
