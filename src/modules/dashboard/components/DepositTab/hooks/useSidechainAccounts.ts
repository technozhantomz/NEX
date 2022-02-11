import { useCallback } from "react";

import { usePeerplaysApi } from "../../../../peerplaysApi";

import { UseSidechainAccounts } from "./useSidechainAccounts.types";

export function useSidechainAccounts(): UseSidechainAccounts {
  const { dbApi } = usePeerplaysApi();

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
