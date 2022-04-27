import { useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(tab?: string): BlockchainPage {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "PeerPlays Blockchain",
    heading: "PeerPlays Blockchain",
    description: "Blockchain | ",
  });

  useEffect(() => {
    switch (tab) {
      case "blockchain":
        setPageMeta({
          title: "PeerPlays Blockchain",
          heading: "PeerPlays Blockchain",
          description: "Blockchain | ",
        });
        break;
      case "assets":
        setPageMeta({
          title: "PeerPlays Assets",
          heading: "PeerPlays Assets",
          description: "PeerPlays Assets",
        });
        break;
      case "witnesses":
        setPageMeta({
          title: "PeerPlays Witnesses",
          heading: "PeerPlays Witnesses",
          description: "PeerPlays Witnesses",
        });
        break;
      case "committee":
        setPageMeta({
          title: "PeerPlays Committee",
          heading: "PeerPlays Committee",
          description: "PeerPlays Committee",
        });
        break;
      case "fees":
        setPageMeta({
          title: "PeerPlays Fees",
          heading: "PeerPlays Fees",
          description: "PeerPlays Fees",
        });
        break;
      default:
        setPageMeta({
          title: "Blockchain",
          heading: "PeerPlays Blockchain",
          description: "Blockchain | ",
        });
        break;
    }
  }, [tab]);

  return { pageMeta };
}
