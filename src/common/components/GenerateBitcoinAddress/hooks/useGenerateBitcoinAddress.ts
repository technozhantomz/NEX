import * as bitcoin from "bitcoinjs-lib";
import counterpart from "counterpart";
import ECPairFactory from "ecpair";
import { useCallback } from "react";
import * as ecc from "tiny-secp256k1";

import { testnetCheck } from "../../../../api/params";
import {
  TransactionMessageActionType,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
  useTransactionMessage,
} from "../../../hooks";
import { useUserContext } from "../../../providers";
import { BitcoinAccount, SignerKey } from "../../../types";

import { UseGenerateBitcoinAddressResult } from "./useGenerateBitcoinAddress.types";

const NETWORK = testnetCheck ? bitcoin.networks.regtest : undefined;

export function useGenerateBitcoinAddress(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseGenerateBitcoinAddressResult {
  const { transactionMessageState, transactionMessageDispatch } =
    useTransactionMessage();
  const { buildTrx } = useTransactionBuilder();
  const { id } = useUserContext();
  const { getSonNetworkStatus } = useSonNetwork();
  const { buildAddingBitcoinSidechainTransaction } =
    useSidechainTransactionBuilder();
  const { bitcoinSidechainAccounts, setBitcoinSidechainAccounts } =
    useUserContext();

  const toHex = useCallback((buffer: any) => {
    return Array.from(buffer)
      .map((byte: any) => byte.toString(16).padStart(2, "0"))
      .join("");
  }, []);

  const generateNewAddress = (): BitcoinAccount => {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom({ network: NETWORK });
    const address = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: NETWORK,
    });
    return {
      address: address.address as string,
      pubKey: toHex(address.pubkey),
      privateKey: keyPair.toWIF(),
    };
  };

  const generateBitcoinAddresses = useCallback(
    async (signerKey: SignerKey) => {
      transactionMessageDispatch({
        type: TransactionMessageActionType.CLEAR,
      });
      transactionMessageDispatch({
        type: TransactionMessageActionType.LOADING,
      });

      try {
        const sonNetworkStatus = await getSonNetworkStatus();

        if (!sonNetworkStatus.isSonNetworkOk) {
          transactionMessageDispatch({
            type: TransactionMessageActionType.LOADED_ERROR,
            message: counterpart.translate(
              `field.errors.sons_not_available_try_again`
            ),
          });
          return;
        }
      } catch (e) {
        console.log(e);
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(
            `field.errors.sons_not_available_try_again`
          ),
        });
        return;
      }
      const deposit = generateNewAddress();
      const withdraw = generateNewAddress();

      setBitcoinSidechainAccounts({ deposit, withdraw });

      const trx = buildAddingBitcoinSidechainTransaction(
        id,
        id,
        deposit.pubKey,
        withdraw.pubKey,
        withdraw.address
      );

      let trxResult;

      try {
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (error) {
        console.log(error);
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
      if (trxResult) {
        setTimeout(async () => {
          await getSidechainAccounts(id);
        }, 3000);
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_SUCCESS,
          message: counterpart.translate(
            `field.success.successfully_generate_btc_addresses`
          ),
        });
      } else {
        transactionMessageDispatch({
          type: TransactionMessageActionType.LOADED_ERROR,
          message: counterpart.translate(`field.errors.transaction_unable`),
        });
      }
    },
    [
      buildAddingBitcoinSidechainTransaction,
      buildTrx,
      getSidechainAccounts,
      setBitcoinSidechainAccounts,
      transactionMessageDispatch,
      id,
      getSonNetworkStatus,
    ]
  );

  return {
    bitcoinSidechainAccounts,
    setBitcoinSidechainAccounts,
    transactionMessageState,
    transactionMessageDispatch,
    generateBitcoinAddresses,
  };
}
