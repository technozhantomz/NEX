import counterpart from "counterpart";
import { useEffect, useState } from "react";

import { ProxyRow, UseProxyTableResult } from "./useProxyTable.types";

type Args = {
  proxyVotes: ProxyRow[];
};

export function useProxyTable({ proxyVotes }: Args): UseProxyTableResult {
  const [searchDataSource, setSearchDataSource] = useState<ProxyRow[]>([]);

  const getActionString = (action: string): string => {
    switch (action) {
      case "add":
        return counterpart.translate(`pages.voting.actions.add`);
      case "remove":
        return counterpart.translate(`pages.voting.actions.remove`);
      case "cancel":
        return counterpart.translate(`pages.voting.actions.cancel`);
      default:
        return counterpart.translate(`pages.voting.actions.add`);
    }
  };

  useEffect(() => {
    if (proxyVotes.length > 0) {
      setSearchDataSource(proxyVotes);
    }
  }, [proxyVotes]);

  return {
    searchDataSource,
    setSearchDataSource,
    getActionString,
  };
}
