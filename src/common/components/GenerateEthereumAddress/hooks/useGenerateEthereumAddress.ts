import * as crypto from "crypto";

import counterpart from "counterpart";
import * as ethers from "ethers";
import { useCallback } from "react";

import {
  TransactionMessageActionType,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
  useTransactionMessage,
} from "../../../hooks";
import { useUserContext } from "../../../providers";
import { EthereumAccount, Sidechain, SignerKey } from "../../../types";

import { UseGenerateEthereumAddressResult } from "./useGenerateEthereumAddress.types";

export function useGenerateEthereumAddress(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseGenerateEthereumAddressResult {
  const { transactionMessageState, dispatchTransactionMessage } =
    useTransactionMessage();
  const { buildTrx } = useTransactionBuilder();
  const { id } = useUserContext();
  const { isSidechainSonNetworkOk } = useSonNetwork();
  const { buildAddingEthereumSidechainTransaction } =
    useSidechainTransactionBuilder();
  const {
    sessionEthereumSidechainAccounts,
    setSessionEthereumSidechainAccounts,
  } = useUserContext();

  const generateNewAddress = (): EthereumAccount => {
    const id = crypto.randomBytes(32).toString("hex");
    const privateKey = "0x" + id;
    const wallet = new ethers.Wallet(privateKey);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  };

  const generateEthereumAddresses = useCallback(
    async (signerKey: SignerKey) => {
      dispatchTransactionMessage({
        type: TransactionMessageActionType.CLEAR,
      });
      dispatchTransactionMessage({
        type: TransactionMessageActionType.LOADING,
      });

      try {
        const isSonNetworkOk = await isSidechainSonNetworkOk(
          Sidechain.ETHEREUM
        );

        if (!isSonNetworkOk) {
          dispatchTransactionMessage({
            type: TransactionMessageActionType.LOADED_ERROR,
            message: counterpart.translate(
              `field.errors.sons_not_available_try_again`
            ),
          });
          return;
        }
      } catch (e) {
        console.log(e);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(
            `field.errors.sons_not_available_try_again`
          ),
        });
        return;
      }
      const deposit = generateNewAddress();
      const withdraw = generateNewAddress();

      setSessionEthereumSidechainAccounts({ deposit, withdraw });

      const trx = buildAddingEthereumSidechainTransaction(
        id,
        id,
        deposit.address,
        withdraw.address
      );

      let trxResult;

      try {
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (error) {
        console.log(error);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
      if (trxResult) {
        setTimeout(async () => {
          await getSidechainAccounts(id);
        }, 3000);
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_SUCCESS,
          message: counterpart.translate(
            `field.success.successfully_generate_eth_addresses`
          ),
        });
      } else {
        dispatchTransactionMessage({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
    },
    [
      buildAddingEthereumSidechainTransaction,
      buildTrx,
      getSidechainAccounts,
      setSessionEthereumSidechainAccounts,
      dispatchTransactionMessage,
      id,
      isSidechainSonNetworkOk,
    ]
  );

  return {
    sessionEthereumSidechainAccounts,
    setSessionEthereumSidechainAccounts,
    transactionMessageState,
    dispatchTransactionMessage,
    generateEthereumAddresses,
  };
}
