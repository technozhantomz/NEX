import { useEffect, useState } from "react";

import { useGenerateBitcoinAddress } from "../../GenerateBitcoinAddress/hooks";

import { UseAddressGenerated } from "./useAddressGenerated.types";

export function useAddressGenerated(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseAddressGenerated {
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const { privateKeyResult, setPrivateKeyResult } =
    useGenerateBitcoinAddress(getSidechainAccounts);

  useEffect(() => {
    if (!privateKeyResult) setDownloaded(true);
  }, [privateKeyResult, downloaded]);

  const downloadPrivateKeys = (sidechainDepositAddress: string): void => {
    const element = document.createElement("a");
    const fileContents = `
          \n  ###### Deposit Address ######
          \nAddress: ${privateKeyResult?.deposit.address}
          \nPeerPlays Deposit Address: ${sidechainDepositAddress}
          \nPublic Key: ${privateKeyResult?.deposit.pubKey}
          \nPrivate Key: ${privateKeyResult?.deposit.privateKey}
          \n
          \n  ###### Withdraw Address ######
          \nAddress: ${privateKeyResult?.withdraw.address}
          \nPublic Key: ${privateKeyResult?.withdraw.pubKey}
          \nPrivate Key: ${privateKeyResult?.withdraw.privateKey}
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
    setPrivateKeyResult(undefined);
  };

  return { downloaded, downloadPrivateKeys };
}
