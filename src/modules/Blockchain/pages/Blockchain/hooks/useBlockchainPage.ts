import counterpart from "counterpart";
import { capitalize } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(tab?: string): BlockchainPage {
  const [pageMeta, _setPageMeta] = useState<PageMeta>({
    title: "PeerPlays Blockchain",
    heading: counterpart.translate(`pages.blocks.blockchain.heading`),
    description: "PeerPlays Blockchain",
  });

  const setBlockchainMeta = useCallback(
    (tab?: string) => {
      tab = tab ? tab.toLowerCase() : "blockchain";
      const title = "Peerplays " + capitalize(tab);
      _setPageMeta({
        title: title,
        heading: counterpart.translate("pages.blocks" + "." + tab + ".heading"),
        description: title,
      });
    },
    [_setPageMeta]
  );

  useEffect(() => {
    setBlockchainMeta(tab);
  }, [tab]);

  return { pageMeta };
}
