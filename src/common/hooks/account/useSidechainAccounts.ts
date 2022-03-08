import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../components/PeerplaysApiProvider";
import { useUserContext } from "../../components/UserProvider";

import { UseSidechainAccounts } from "./useSidechainAccounts.types";

export function useSidechainAccounts(): UseSidechainAccounts {
  const [hasBTCDepositAddress, setHasBTCDepositAddress] =
    useState<boolean>(false);
  const { dbApi } = usePeerplaysApiContext();
  const { id, sidechainAcccounts, setSidechainAcccounts } = useUserContext();

  useEffect(() => {
    if (sidechainAcccounts && sidechainAcccounts.length > 0) {
      setHasBTCDepositAddress(true);
    } else if (id !== null && id !== "") {
      getSidechainAccounts(id);
    }
  }, [sidechainAcccounts, id]);

  const getSidechainAccounts = useCallback(async (accountId: string) => {
    const acccounts = await dbApi("get_sidechain_addresses_by_account", [
      accountId,
    ])
      .then((e: string | unknown[]) => (e.length ? e : undefined))
      .catch(() => false);
    if (acccounts) {
      setHasBTCDepositAddress(true);
    }
    return acccounts;
  }, []);

  return {
    hasBTCDepositAddress,
    getSidechainAccounts,
  };
}
