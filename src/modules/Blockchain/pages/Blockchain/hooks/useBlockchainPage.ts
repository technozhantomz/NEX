import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BlockchainPage, PageMeta } from "./useBlockchainPage.types";

export function useBlockchainPage(tab?: string): BlockchainPage {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "PeerPlays Blockchain",
    heading: "PeerPlays Blockchain",
    description: "Blockchain | ",
  });
  const router = useRouter();

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
      case "committe":
        setPageMeta({
          title: "PeerPlays Committe",
          heading: "PeerPlays Committe",
          description: "PeerPlays Committe",
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

  const onTabClick = (key: string) => {
    router.push(`/blockchain?tab=${key}`);
  };

  return { pageMeta, onTabClick };
}
