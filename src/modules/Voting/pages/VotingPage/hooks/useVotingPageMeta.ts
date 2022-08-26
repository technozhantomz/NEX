import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { VotingPageMeta } from "./useVotingPageMeta.types";

export function useVotingPageMeta(tab?: string): VotingPageMeta {
  const defaultPageMeta = {
    title: counterpart.translate("pages.voting.gpos.heading"),
    heading: counterpart.translate("pages.voting.gpos.heading"),
    description: counterpart.translate("pages.voting.gpos.heading"),
  } as PageMeta;

  const [pageMeta, _setPageMeta] = useState<PageMeta>(defaultPageMeta);

  const setPageMeta = useCallback(
    (tab?: string) => {
      tab = tab ? tab.toLowerCase() : "gpos";
      const title = counterpart.translate("pages.voting." + tab + ".heading");
      _setPageMeta({
        title: title,
        heading: title,
        description: title,
      });
    },
    [_setPageMeta]
  );

  useEffect(() => {
    setPageMeta(tab);
  }, [tab]);

  return { pageMeta };
}
