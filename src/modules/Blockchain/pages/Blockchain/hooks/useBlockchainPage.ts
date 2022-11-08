import counterpart from "counterpart";
import { capitalize } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(
  tab?: string | string[],
  block?: string | string[]
): BlockchainPage {
  const [pageMeta, _setPageMeta] = useState<PageMeta>({
    title: "PeerPlays Blockchain",
    heading: counterpart.translate(`pages.blocks.blockchain.heading`),
    description: "PeerPlays Blockchain",
  });
  const [blockNum, setBlockNum] = useState<number | undefined>(undefined);
  const [transactionId, setTransactionId] = useState<string | undefined>(
    undefined
  );

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
    setBlockchainMeta(tab as string);
  }, [tab]);

  useEffect(() => {
    if (block !== undefined) {
      if (block.length > 0) {
        setBlockNum(parseInt(block[0]));
        setTransactionId(block[1]);
      }
      setBlockNum(parseInt(block as string));
    }
  }, [block]);

  return { pageMeta, blockNum, transactionId };
}
