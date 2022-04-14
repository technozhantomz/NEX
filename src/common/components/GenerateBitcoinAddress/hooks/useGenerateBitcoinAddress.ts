import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import { useCallback, useState } from "react";
import * as ecc from "tiny-secp256k1";

import {
  useAccount,
  useSessionStorage,
  useSidechainTransactionBuilder,
  useSonNetwork,
  useTransactionBuilder,
} from "../../../hooks";
import { useUserContext } from "../../../providers";

import {
  AddressDetails,
  GenerateBitcoinAddressResult,
  PrivateKeyResult,
} from "./useGenerateBitcoinAddress.types";

export function useGenerateBitcoinAddress(
  getSidechainAccounts: (accountId: string) => Promise<void>
): GenerateBitcoinAddressResult {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [privateKeyResult, setPrivateKeyResult] = useSessionStorage(
    "privateKeyResult"
  ) as [PrivateKeyResult, (value: PrivateKeyResult) => void];
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
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

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const confirm = () => {
    setStatus("");
    setIsPasswordModalVisible(true);
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

  const generateNewAddress = (): AddressDetails => {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.makeRandom();
    const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    return {
      address: address.address as string,
      pubKey: toHex(address.pubkey),
      privateKey: keyPair.toWIF(),
    };
  };

  const generateBitcoinAddresses = useCallback(
    async (password: string) => {
      setSubmittingPassword(true);
      const sonNetworkStatus = await getSonNetworkStatus();

      if (!sonNetworkStatus.isSonNetworkOk) {
        setIsPasswordModalVisible(false);
        setStatus("SONs network is not available now. Please try again later!");
        return;
      }
      const deposit = generateNewAddress();
      const withdraw = generateNewAddress();

      setPrivateKeyResult({ deposit, withdraw });

      const activeKey = getPrivateKey(password, "active");
      const trx = buildAddingBitcoinSidechainTransaction(
        id,
        id,
        deposit.pubKey,
        withdraw.pubKey,
        withdraw.address
      );

      let trxResult;

      try {
        trxResult = await trxBuilder([trx], [activeKey]);
      } catch (error) {
        console.log(error);
        setIsPasswordModalVisible(false);
        setSubmittingPassword(false);
      }
      if (trxResult) {
        setTimeout(async () => {
          await getSidechainAccounts(id);
        }, 3000);
        setIsPasswordModalVisible(false);
        setSubmittingPassword(false);
      }
    },
    [
      getPrivateKey,
      buildAddingBitcoinSidechainTransaction,
      trxBuilder,
      setIsPasswordModalVisible,
      getSidechainAccounts,
    ]
  );

  return {
    isPasswordModalVisible,
    privateKeyResult,
    status,
    submittingPassword,
    setPrivateKeyResult,
    handlePasswordModalCancel,
    onFormFinish,
    confirm,
  };
}
