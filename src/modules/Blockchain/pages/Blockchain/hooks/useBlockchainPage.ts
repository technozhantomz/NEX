import counterpart from "counterpart";
import { capitalize } from "lodash";
import { useMemo } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(
  tab?: string | string[],
  block?: string | string[]
): BlockchainPage {
  const pageMeta: PageMeta = useMemo(() => {
    tab = tab ? (tab as string).toLowerCase() : "blockchain";
    const title = "AcloudBANK " + capitalize(tab);
    return {
      title: title,
      heading: counterpart.translate("pages.blocks" + "." + tab + ".heading"),
      description: title,
    };
  }, [tab]);

  const blockNum = useMemo(() => {
    if (block) {
      if (block.length > 0) {
        return parseInt(block[0]);
      } else {
        return parseInt(block as string);
      }
    }
  }, [block]);

  const transactionId = useMemo(() => {
    if (block && block.length > 1) {
      return block[1];
    }
  }, [block]);

  return { pageMeta, blockNum, transactionId };
}
