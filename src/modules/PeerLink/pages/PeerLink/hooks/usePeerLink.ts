import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

// import {
//   useSidechainTransactionBuilder,
//   useTransactionBuilder,
// } from "../../../../../common/hooks";
import {
  usePeerLinkContext,
  useSideChainContext,
  useUserContext,
} from "../../../../../common/providers";
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
  const { metaMask, hiveKeyChain, connectToMetaMask, connectToHiveKeyChain } =
    usePeerLinkContext();
  const { hiveSidechainAccount, ethereumSidechainAccount } =
    useSideChainContext();
  const { localStorageAccount } = useUserContext();
  // const { localStorageAccount, id } = useUserContext();
  // const { buildTrx } = useTransactionBuilder();
  // const { buildAddingSidechainTransaction } = useSidechainTransactionBuilder();

  const handleConnect = useCallback(
    async (signerKey: SignerKey) => {
      console.log(signerKey); //DELETE ME FROM
      setTransactionErrorMessage("");
      let trxResult;
      try {
        setLoadingTransaction(true);
        // const trx = buildAddingSidechainTransaction(
        //   id,
        //   metaMask.selectedAddress,
        //   metaMask.selectedAddress,
        //   metaMask.selectedAddress,
        //   metaMask.selectedAddress,
        //   "ethereum"
        // );

        // trxResult = await buildTrx([trx], [signerKey]);
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

  useEffect(() => {
    if (
      localStorageAccount &&
      hiveKeyChain.isConnected &&
      metaMask.isConnected
    ) {
      //TODO: fix this logic?
      if (ethereumSidechainAccount?.deposit_address !== hiveKeyChain.userName) {
        //TODO: get signing_key then update sons
      }
      if (hiveSidechainAccount?.deposit_address !== metaMask.selectedAddress) {
        //TODO: get signing_key then update sons
      }
    }
  }, [localStorageAccount, metaMask, hiveKeyChain]);

  return {
    metaMask,
    hiveKeyChain,
    localStorageAccount,
    peerLinkConnectForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handleConnect,
    connectToMetaMask,
    connectToHiveKeyChain,
  };
}
