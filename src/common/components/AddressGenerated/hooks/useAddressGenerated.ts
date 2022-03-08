import { useEffect, useState } from "react";

import { useUserContext } from "../../UserProvider";

import { AddressGenerated } from "./useAddressGenerated.types";

export function useAddressGenerated(): AddressGenerated {
  const [depositAddress, setDepositAddress] = useState<string>("");
  const { sidechainAcccounts } = useUserContext();

  useEffect(() => {
    if (sidechainAcccounts && sidechainAcccounts.length > 0) {
      const bitcoinAccount = sidechainAcccounts.find(
        (act) => act.sidechain === "bitcoin"
      );
      setDepositAddress(bitcoinAccount ? bitcoinAccount.deposit_address : "");
    }
  }, [sidechainAcccounts]);

  const useCopyAddress = (value: string): void => {
    navigator.clipboard.writeText(value);
  };

  return { depositAddress, useCopyAddress };
}
