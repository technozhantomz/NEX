import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(tab?: string): BlockchainPage {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "PeerPlays Blockchain",
    heading: counterpart.translate(`pages.blocks.blockchain.heading`),
    description: "PeerPlays Blockchain",
  });

  useEffect(() => {
    switch (tab) {
      case "blockchain":
        setPageMeta({
          title: "PeerPlays Blockchain",
          heading: counterpart.translate(`pages.blocks.blockchain.heading`),
          description: "PeerPlays Blockchain",
        });
        break;
      case "assets":
        setPageMeta({
          title: "PeerPlays Assets",
          heading: counterpart.translate(`pages.blocks.assets.heading`),
          description: "PeerPlays Assets",
        });
        break;
      case "witnesses":
        setPageMeta({
          title: "PeerPlays Witnesses",
          heading: counterpart.translate(`pages.blocks.witnesses.heading`),
          description: "PeerPlays Witnesses",
        });
        break;
      case "committees":
        setPageMeta({
          title: "PeerPlays Committees",
          heading: counterpart.translate(`pages.blocks.committees.heading`),
          description: "PeerPlays Committees",
        });
        break;
      case "fees":
        setPageMeta({
          title: "PeerPlays Fees",
          heading: counterpart.translate(`pages.blocks.fees.heading`),
          description: "PeerPlays Fees",
        });
        break;
      default:
        setPageMeta({
          title: "Blockchain",
          heading: counterpart.translate(`pages.blocks.blockchain.heading`),
          description: "PeerPlays Blockchain",
        });
        break;
    }
  }, [tab]);

  return { pageMeta };
}
