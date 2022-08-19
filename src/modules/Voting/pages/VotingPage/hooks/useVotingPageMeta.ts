import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { VotingPageMeta } from "./useVotingPageMeta.types";

export function useVotingPageMeta(tab?: string): VotingPageMeta {
  const defaultPageMeta = {
    title: "PeerPlays (GPOS)",
    heading: "PeerPlays (GPOS)",
    description: "PeerPlays (GPOS)",
  } as PageMeta;

  const [pageMeta, setPageMeta] = useState<PageMeta>(defaultPageMeta);

  useEffect(() => {
    switch (tab) {
      case "witnesses":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: counterpart.translate(`pages.voting.peerplays_voting`),
          description: "PeerPlays Voting | Witness",
        });
        break;
      case "sons":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: counterpart.translate(`pages.voting.peerplays_voting`),
          description: "PeerPlays Voting | SONs",
        });
        break;
      case "committees":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: counterpart.translate(`pages.voting.peerplays_voting`),
          description: "PeerPlays Voting | Committee",
        });
        break;
      case "proxy":
        setPageMeta({
          title: "PeerPlays Voting",
          heading: counterpart.translate(`pages.voting.peerplays_voting`),
          description: "PeerPlays Voting | Proxy",
        });
        break;
      default:
        setPageMeta(defaultPageMeta);
        break;
    }
  }, [tab]);

  return { pageMeta };
}
