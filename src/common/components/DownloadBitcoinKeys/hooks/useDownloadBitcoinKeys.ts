import counterpart from "counterpart";
import { useState } from "react";

import { useGenerateBitcoinAddress } from "../../GenerateBitcoinAddress/hooks";

import { UseDownloadBitcoinKeysResult } from "./useDownloadBitcoinKeys.types";

export function useDownloadBitcoinKeys(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseDownloadBitcoinKeysResult {
  const [downloaded, setDownloaded] = useState<boolean>(true);
  const { bitcoinSidechainAccounts, setBitcoinSidechainAccounts } =
    useGenerateBitcoinAddress(getSidechainAccounts);

  if (bitcoinSidechainAccounts && downloaded) {
    setDownloaded(false);
  }

  const downloadPrivateKeys = (sidechainDepositAddress: string): void => {
    const element = document.createElement("a");
    const fileContents = `
      \n##### ${counterpart.translate(
        "file_content.peerplays_btc_deposit_address"
      )} #####
      \nAddress: ${sidechainDepositAddress}
      \n
      \n###### ${counterpart.translate(
        "file_content.btc_deposit_account"
      )} (${counterpart.translate(
      "file_content.btc_deposit_account_description"
    )}) ######
      \nAddress: ${bitcoinSidechainAccounts?.deposit.address}
      \nPublic Key: ${bitcoinSidechainAccounts?.deposit.pubKey}
      \nPrivate Key: ${bitcoinSidechainAccounts?.deposit.privateKey}
      \n
      \n###### ${counterpart.translate(
        `file_content.btc_withdraw_account`
      )} ######
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
