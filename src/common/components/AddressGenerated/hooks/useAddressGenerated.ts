import { useEffect, useState } from "react";

import { useGenerateBitcoinAddress } from "../../GenerateBitcoinAddress/hooks";

import { UseAddressGeneratedResult } from "./useAddressGenerated.types";

export function useAddressGenerated(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseAddressGeneratedResult {
  const [downloaded, setDownloaded] = useState<boolean>(true);
  const { bitcoinSidechainAccounts, setBitcoinSidechainAccounts } =
    useGenerateBitcoinAddress(getSidechainAccounts);

  useEffect(() => {
    if (bitcoinSidechainAccounts) setDownloaded(false);
  }, [bitcoinSidechainAccounts]);

  const downloadPrivateKeys = (sidechainDepositAddress: string): void => {
    const element = document.createElement("a");
    const fileContents = `
          \n  ###### Deposit Addresses ######
          \nAddress: ${bitcoinSidechainAccounts?.deposit.address}
          \nPublic Key: ${bitcoinSidechainAccounts?.deposit.pubKey}
          \nPrivate Key: ${bitcoinSidechainAccounts?.deposit.privateKey}
          \n
          \n  ###### Withdraw Addresses ######
          \nAddress: ${bitcoinSidechainAccounts?.withdraw.address}
          \nPublic Key: ${bitcoinSidechainAccounts?.withdraw.pubKey}
          \nPrivate Key: ${bitcoinSidechainAccounts?.withdraw.privateKey}
          \n
          \n ##### PeerPlays Deposit Address #####
          \nPeerPlays Deposit Address: ${sidechainDepositAddress}
        `;
    const file = new Blob([fileContents], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Keys.txt";
    element.id = "download-keys";
    document.body.appendChild(element);
    element.click();
    element.remove();
    setDownloaded(true);
    setBitcoinSidechainAccounts(undefined);
  };

  return { downloaded, downloadPrivateKeys };
}
