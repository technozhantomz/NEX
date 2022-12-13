import counterpart from "counterpart";
import { useCallback, useState } from "react";

import { SignerKey } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import { PeerLinkConnectForm, UsePeerLinkResult } from "./usePeerLink.types";

export function usePeerLink(): UsePeerLinkResult {
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [peerLinkConnectForm] = Form.useForm<PeerLinkConnectForm>();

  const handleConnect = useCallback(
    async (signerKey: SignerKey) => {
      console.log(signerKey); //DELETE ME FROM
      setTransactionErrorMessage("");
      let trxResult;
      try {
        setLoadingTransaction(true);
        // const trx = await createUpdateAccountTrx(localApprovedVotesIds);
        //trxResult = await buildTrx([trx], [signerKey]);
      } catch (error) {
        console.log(error);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.published_votes`)
        );
        setLoadingTransaction(false);
        // afterCloseTransactionModal.current = () => {
        //   formAccountBalancesByName(localStorageAccount);
        //   getUserVotes();
        //   setIsVotesChanged(false);
        //   setConfirmed(true);
        // };
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
    },
    [setTransactionErrorMessage, setLoadingTransaction]
  );

  return {
    peerLinkConnectForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handleConnect,
  };
}
