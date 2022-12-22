import counterpart from "counterpart";
import { useCallback, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { VotingPageMeta } from "./useVotingPageMeta.types";

export function useVotingPageMeta(tab?: string): VotingPageMeta {
  const defaultPageMeta = {
    title: counterpart.translate("pages.voting.gpos.heading"),
    heading: counterpart.translate("pages.voting.gpos.heading"),
    description: counterpart.translate("pages.voting.gpos.heading"),
  } as PageMeta;

  const [prevTab, setPrevTab] = useState<string | undefined>(tab);
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

  if (tab !== prevTab) {
    setPrevTab(tab);
    setPageMeta(tab);
  }

  return { pageMeta };
}
