import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import { useCallback, useState } from "react";
import * as ecc from "tiny-secp256k1";

import {
  useAccount,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
} from "../../../hooks";
import { useUserContext } from "../../UserProvider";

import { GenerateBitcoinAddressResult } from "./useGenerateBitcoinAddress.types";

export function useGenerateBitcoinAddress(
  getSidechainAccounts: (accountId: string) => Promise<void>
): GenerateBitcoinAddressResult {
  const [status, setStatus] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const { id } = useUserContext();
  const { getSonNetworkStatus } = useSonNetwork();
  const { buildAddingBitcoinSidechainTransaction } =
    useSidechainTransactionBuilder();

  const toHex = useCallback((buffer: any) => {
    return Array.from(buffer)
      .map((byte: any) => byte.toString(16).padStart(2, "0"))
      .join("");
  }, []);

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setStatus("");
    setVisible(true);
  };

  const onFormFinish = (name: string, info: { values: any; forms: any }) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        generateBitcoinAddresses(values.password);
      });
    }
  };

  const generateBitcoinAddresses = useCallback(
    async (password: string) => {
      const sonNetworkStatus = await getSonNetworkStatus();

      if (!sonNetworkStatus.isSonNetworkOk) {
        setVisible(false);
        setStatus("SONs network is not available now. Please try again later!");
        return;
      }

      const ECPair = ECPairFactory(ecc);
      const generatedAddress = [];

      for (let i = 0; i <= 1; i++) {
        const keyPair = ECPair.makeRandom();

        const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
        generatedAddress.push(address);
      }

      const activeKey = getPrivateKey(password, "active");
      const trx = buildAddingBitcoinSidechainTransaction(
        id,
        id,
        toHex(generatedAddress[0].pubkey),
        toHex(generatedAddress[1].pubkey),
        generatedAddress[1].address as string
      );

      let trxResult;

      try {
        trxResult = await trxBuilder([trx], [activeKey]);
      } catch (error) {
        console.log(error);
        setVisible(false);
      }
      if (trxResult) {
        setTimeout(async () => {
          await getSidechainAccounts(id);
        }, 1000);
        setVisible(false);
      }
    },
    [
      getPrivateKey,
      buildAddingBitcoinSidechainTransaction,
      trxBuilder,
      setVisible,
      getSidechainAccounts,
    ]
  );

  return { visible, onCancel, onFormFinish, confirm, status };
}
