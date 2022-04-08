import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext, useUserContext } from "../../providers";
import { SidechainAcccount } from "../../types";

import { UseSidechainAccountsResult } from "./useSidechainAccounts.types";

export function useSidechainAccounts(): UseSidechainAccountsResult {
  const [sidechainAccounts, setSidechainAccounts] = useState<
    SidechainAcccount[]
  >([]);
  const [bitcoinSidechainAccount, setBitcoinSidechainAccount] =
    useState<SidechainAcccount>();
  const [loadingSidechainAccounts, setLoadingSidechainAccounts] =
    useState<boolean>(true);
  const [hasBTCDepositAddress, setHasBTCDepositAddress] =
    useState<boolean>(false);
  const [hasBTCWithdrawPublicKey, setHasBTCWithdrawPublicKey] =
    useState<boolean>(false);
  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();

  const getSidechainAccounts = useCallback(
    async (accountId: string) => {
      try {
        setLoadingSidechainAccounts(true);
        const accounts = (await dbApi("get_sidechain_addresses_by_account", [
          accountId,
        ])) as SidechainAcccount[];
        setSidechainAccounts(accounts);
        if (accounts && accounts.length) {
          const bitcoinSidechain = accounts.find(
            (account) => account.sidechain === "bitcoin"
          );
          if (bitcoinSidechain) {
            setBitcoinSidechainAccount(bitcoinSidechain);
            if (
              bitcoinSidechain.deposit_address &&
              bitcoinSidechain.deposit_address !== ""
            ) {
              setHasBTCDepositAddress(true);
            }
            if (
              bitcoinSidechain.withdraw_public_key &&
              bitcoinSidechain.withdraw_public_key !== ""
            ) {
              setHasBTCWithdrawPublicKey(true);
            }
          }
        }
        setLoadingSidechainAccounts(false);
      } catch (e) {
        console.log(e);
        setLoadingSidechainAccounts(false);
      }
    },
    [
      dbApi,
      setSidechainAccounts,
      setHasBTCDepositAddress,
      setLoadingSidechainAccounts,
      setHasBTCWithdrawPublicKey,
      setBitcoinSidechainAccount,
    ]
  );

  useEffect(() => {
    if (id !== null && id !== "") {
      getSidechainAccounts(id);
    }
  }, [id, getSidechainAccounts]);

  return {
    hasBTCDepositAddress,
    hasBTCWithdrawPublicKey,
    getSidechainAccounts,
    loadingSidechainAccounts,
    sidechainAccounts,
    bitcoinSidechainAccount,
  };
}
