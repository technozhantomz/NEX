import counterpart from "counterpart";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";

import { ETHEREUM_NETWORK, HIVE_NETWORK } from "../../../../../api/params";
import {
  useSidechainTransactionBuilder,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import {
  usePeerLinkContext,
  useSideChainContext,
  useUserContext,
} from "../../../../../common/providers";
import { SignerKey, Transaction } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import { PeerLinkConnectForm, UsePeerLinkResult } from "./usePeerLink.types";

export function usePeerLink(): UsePeerLinkResult {
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [shouldUpdateSons, setShouldUpdateSons] = useState<boolean>(false);
  const [sidechainsUpdating, setSidechainsUpdating] = useState<string[]>([]);
  const [ethTrx, setEthTrx] = useState<Transaction | undefined>(undefined);
  const [hiveTrx, setHiveTrx] = useState<Transaction | undefined>(undefined);
  const [peerLinkConnectForm] = Form.useForm<PeerLinkConnectForm>();
  const { metaMask, hiveKeyChain, connectToMetaMask, connectToHiveKeyChain } =
    usePeerLinkContext();
  const {
    hiveSidechainAccount,
    ethereumSidechainAccount,
    hasHiveAddress,
    hasEthereumAddress,
  } = useSideChainContext();
  const { localStorageAccount, id } = useUserContext();
  const { buildTrx } = useTransactionBuilder();
  const { buildAddingSidechainTransaction } = useSidechainTransactionBuilder();

  const handleConnect = useCallback(
    async (signerKey: SignerKey) => {
      setTransactionErrorMessage("");
      let trxResult;
      try {
        setLoadingTransaction(true);
        if (ethTrx && hiveTrx)
          trxResult = await buildTrx([ethTrx], [signerKey]);
        if (ethTrx && hiveTrx === undefined)
          trxResult = await buildTrx([ethTrx], [signerKey]);
        if (hiveTrx && ethTrx === undefined)
          trxResult = await buildTrx([hiveTrx], [signerKey]);
      } catch (error) {
        console.log(error);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setShouldUpdateSons(false);
        setLoadingTransaction(false);
      }
      if (trxResult) {
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.update_sidechain`)
        );
        setShouldUpdateSons(false);
        setLoadingTransaction(false);
        if (ethTrx && hiveTrx) {
          setEthTrx(undefined);
          trxResult = await buildTrx([hiveTrx], [signerKey]);
        }
        if (ethTrx && hiveTrx === undefined) setEthTrx(undefined);
        if (hiveTrx && ethTrx === undefined) setHiveTrx(undefined);
        router.push("/peerlink/transfer");
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setShouldUpdateSons(false);
        setLoadingTransaction(false);
      }
    },
    [id, ethTrx, hiveTrx, setTransactionErrorMessage, setLoadingTransaction]
  );

  useEffect(() => {
    const sidechains: string[] = [];
    setEthTrx(undefined);
    setHiveTrx(undefined);
    if (
      localStorageAccount &&
      hiveKeyChain.isConnected &&
      metaMask.isConnected
    ) {
      if (
        !hasEthereumAddress ||
        ethereumSidechainAccount?.deposit_address !== metaMask.selectedAddress
      ) {
        sidechains.push(ETHEREUM_NETWORK);
        setEthTrx(
          buildAddingSidechainTransaction(
            id,
            metaMask.selectedAddress,
            metaMask.selectedAddress,
            metaMask.selectedAddress,
            metaMask.selectedAddress,
            "ethereum"
          )
        );
      }
      if (
        !hasHiveAddress ||
        hiveSidechainAccount?.deposit_address !== hiveKeyChain.userName
      ) {
        sidechains.push(HIVE_NETWORK);
        setHiveTrx(
          buildAddingSidechainTransaction(
            id,
            hiveKeyChain.activePubkey,
            hiveKeyChain.userName,
            hiveKeyChain.activePubkey,
            hiveKeyChain.userName,
            "hive"
          )
        );
      }
      setShouldUpdateSons(true);
      setSidechainsUpdating(sidechains);
      peerLinkConnectForm.submit();
    }
  }, [
    id,
    localStorageAccount,
    metaMask,
    hiveKeyChain,
    hasEthereumAddress,
    hasHiveAddress,
    ethereumSidechainAccount,
    hiveSidechainAccount,
  ]);

  return {
    metaMask,
    hiveKeyChain,
    localStorageAccount,
    peerLinkConnectForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    shouldUpdateSons,
    sidechainsUpdating,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handleConnect,
    connectToMetaMask,
    connectToHiveKeyChain,
  };
}
