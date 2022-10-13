import { useEffect, useState } from "react";

import { useGenerateBitcoinAddress } from "../../GenerateBitcoinAddress/hooks";

import { UseDownloadBitcoinKeysResult } from "./useDownloadBitcoinKeys.types";

export function useDownloadBitcoinKeys(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseDownloadBitcoinKeysResult {
  const [downloaded, setDownloaded] = useState<boolean>(true);
  const { bitcoinSidechainAccounts, setBitcoinSidechainAccounts } =
    useGenerateBitcoinAddress(getSidechainAccounts);

  useEffect(() => {
    if (bitcoinSidechainAccounts) setDownloaded(false);
  }, [bitcoinSidechainAccounts]);

  const downloadPrivateKeys = (sidechainDepositAddress: string): void => {
    const element = document.createElement("a");
    const fileContents = `
          \n##### PeerPlays Deposit Address #####
          \nPeerPlays Deposit Address: ${sidechainDepositAddress}
          \n
          \n###### Bitcoin Deposit Account (Used to create above PeerPlays multi-signature deposit address) ######
          \nAddress: ${bitcoinSidechainAccounts?.deposit.address}
          \nPublic Key: ${bitcoinSidechainAccounts?.deposit.pubKey}
          \nPrivate Key: ${bitcoinSidechainAccounts?.deposit.privateKey}
          \n
          \n###### Bitcoin Withdraw Account ######
          \nAddress: ${bitcoinSidechainAccounts?.withdraw.address}
          \nPublic Key: ${bitcoinSidechainAccounts?.withdraw.pubKey}
          \nPrivate Key: ${bitcoinSidechainAccounts?.withdraw.privateKey}
          \n
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
