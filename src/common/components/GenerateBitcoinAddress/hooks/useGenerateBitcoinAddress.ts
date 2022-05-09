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
  BitcoinAccount,
  BitcoinSidechainAccounts,
  UseGenerateBitcoinAddressResult,
} from "./useGenerateBitcoinAddress.types";

export function useGenerateBitcoinAddress(
  getSidechainAccounts: (accountId: string) => Promise<void>
): UseGenerateBitcoinAddressResult {
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [bitcoinSidechainAccounts, setBitcoinSidechainAccounts] =
    useSessionStorage("bitcoinSidechainAccounts") as [
      BitcoinSidechainAccounts,
      (value: BitcoinSidechainAccounts) => void
    ];
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const { buildTrx } = useTransactionBuilder();
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

  const generateNewAddress = (): BitcoinAccount => {
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

      setBitcoinSidechainAccounts({ deposit, withdraw });

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
        trxResult = await buildTrx([trx], [activeKey]);
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
      buildTrx,
      setIsPasswordModalVisible,
      getSidechainAccounts,
      setBitcoinSidechainAccounts,
      setSubmittingPassword,
    ]
  );

  return {
    isPasswordModalVisible,
    bitcoinSidechainAccounts,
    status,
    submittingPassword,
    setBitcoinSidechainAccounts,
    handlePasswordModalCancel,
    onFormFinish,
    confirm,
  };
}
