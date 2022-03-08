import { useEffect, useState } from "react";

import { useUserContext } from "../../UserProvider";

import { KeyIsGenerated } from "./useKeyIsGenerated.types";

export function useKeyIsGenerated(): KeyIsGenerated {
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
  return { depositAddress };
}
