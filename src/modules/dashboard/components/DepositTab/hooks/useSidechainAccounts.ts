import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";

import { UseSidechainAccounts } from "./useSidechainAccounts.types";

export function useSidechainAccounts(): UseSidechainAccounts {
  const { dbApi } = usePeerplaysApiContext();

  // Fetching sidechain accounts by user's account id:

  const getSidechainAccounts = useCallback(async (accountID: string) => {
    const sidechainAcccounts = dbApi("get_sidechain_addresses_by_account", [
      accountID,
    ])
      .then((e: string | unknown[]) => (e.length ? e : undefined))
      .catch(() => false);
    return sidechainAcccounts;
  }, []);

  return {
    getSidechainAccounts,
  };
}
